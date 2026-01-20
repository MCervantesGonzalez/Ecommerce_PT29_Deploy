import { Test, TestingModule } from '@nestjs/testing';
import { FileUploadService } from './file-upload.service';
import { FileUploadRepository } from './file-upload.repository';
import { Products } from '../products/entities/products.entity';
import { getRepositoryToken } from '@nestjs/typeorm'; //  importamos el helper para el token
import { UploadApiResponse } from 'cloudinary';

// Mock para Repository<Products>
type MockRepo<T = any> = {
  findOneBy: jest.Mock;
  update: jest.Mock;
};

describe('FileUploadService', () => {
  let fileUploadService: FileUploadService;
  let fileUploadRepositoryMock: jest.Mocked<FileUploadRepository>;
  let productsRepositoryMock: MockRepo<Products>;

  beforeEach(async () => {
    fileUploadRepositoryMock = {
      uploadImage: jest.fn(),
    } as any;

    productsRepositoryMock = {
      findOneBy: jest.fn(),
      update: jest.fn(),
    };

    // Token que pide Nest
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FileUploadService,
        { provide: FileUploadRepository, useValue: fileUploadRepositoryMock },
        {
          provide: getRepositoryToken(Products),
          useValue: productsRepositoryMock,
        },
      ],
    }).compile();

    fileUploadService = module.get<FileUploadService>(FileUploadService);
  });

  // Smoke Test
  it('Debe estar definido', () => {
    expect(fileUploadService).toBeDefined();
  });

  // Subir imagen y actualizar producto
  it('Debe subir imagen y actualizar producto', async () => {
    const file = { originalname: 'test.png' } as Express.Multer.File;
    const productId = 'd165761b-1eb6-403f-a8d7-f1b064685a05';

    const product = {
      id: productId,
      name: 'testProduct',
      description: 'testDescription',
      price: 100,
      stock: 10,
      imgUrl: 'https://testurl.com',
    } as Products;

    const updatedProduct = {
      id: productId,
      name: 'testProduct',
      description: 'testDescription',
      price: 100,
      stock: 10,
      imgUrl: 'http://cloudinary/test.png',
    } as Products;

    productsRepositoryMock.findOneBy
      .mockResolvedValueOnce(product) // primera búsqueda original
      .mockResolvedValueOnce(updatedProduct); // segunda búsqueda actualizado

    fileUploadRepositoryMock.uploadImage.mockResolvedValue({
      public_id: 'mock_id',
      version: 1,
      signature: 'mock_signature',
      width: 100,
      height: 100,
      format: 'png',
      resource_type: 'image',
      created_at: new Date().toISOString(),
      tags: [],
      pages: 10,
      bytes: 12345,
      type: 'upload',
      etag: 'mock_etag',
      placeholder: false,
      url: 'http://cloudinary/test.png',
      secure_url: 'http://cloudinary/test.png',
      access_mode: 'mock_access',
      original_filename: 'test.png',
      moderation: [],
      access_control: [],
      context: {},
      metadata: {},
      colors: [['#ffffff', 0.5]],
    } as UploadApiResponse);

    const result = await fileUploadService.uploadImage(file, productId);

    expect(productsRepositoryMock.findOneBy).toHaveBeenCalledWith({
      id: productId,
    });
    expect(fileUploadRepositoryMock.uploadImage).toHaveBeenCalledWith(file);
    expect(productsRepositoryMock.update).toHaveBeenCalledWith(productId, {
      imgUrl: 'http://cloudinary/test.png',
    });
    expect(result).toEqual(updatedProduct);
  });

  // Lanzar error si no existe el producto
  it('Debe lanzar error si el producto no existe', async () => {
    const file = { originalname: 'test.png' } as Express.Multer.File;
    const productId = 'no-existe';

    productsRepositoryMock.findOneBy.mockResolvedValue(null);

    await expect(
      fileUploadService.uploadImage(file, productId),
    ).rejects.toThrow(`No se encontró el producto con id: ${productId}`);
  });

  // Lanzar error si no devuelve el secure_url
  it('Debe lanzar error si Cloudinary no devuelve secure_url', async () => {
    const file = { originalname: 'test.png' } as Express.Multer.File;
    const productId = 'd165761b-1eb6-403f-a8d7-f1b064685a05';

    const product = {
      id: productId,
      name: 'testProduct',
      description: 'testDescription',
      price: 100,
      stock: 10,
      imgUrl: 'https://testurl.com',
    } as Products;

    productsRepositoryMock.findOneBy.mockResolvedValue(product);
    fileUploadRepositoryMock.uploadImage.mockResolvedValue(
      {} as unknown as UploadApiResponse,
    ); //no devuelve secure_url

    await expect(
      fileUploadService.uploadImage(file, productId),
    ).rejects.toThrow('Error al cargar imagen en Cloudinary');
  });

  // propagar el error si Cloudinary falla al subir imagen
  it('Debe propagar el error si Cloudinary falla al subir la imagen', async () => {
    const file = { originalname: 'test.png' } as Express.Multer.File;
    const productId = 'd165761b-1eb6-403f-a8d7-f1b064685a05';

    const product = {
      id: productId,
      name: 'testProduct',
      description: 'testDescription',
      price: 100,
      stock: 10,
      imgUrl: 'https://testurl.com',
    } as Products;

    // El producto existe
    productsRepositoryMock.findOneBy.mockResolvedValue(product);

    // CLoudinary falla
    fileUploadRepositoryMock.uploadImage.mockRejectedValue(
      new Error('Cloudinary down'),
    );

    await expect(
      fileUploadService.uploadImage(file, productId),
    ).rejects.toThrow('Cloudinary down');

    // Aseguramos que no se intentó actualizar el producto si Cloudinary falla
    expect(productsRepositoryMock.update).not.toHaveBeenCalled();
  });
});
