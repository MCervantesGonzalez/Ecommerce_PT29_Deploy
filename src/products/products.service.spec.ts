import { Test, TestingModule } from '@nestjs/testing';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';
import { Products } from './entities/products.entity';

describe('ProductsService', () => {
  // Variables Globales del Test:
  let productsService: ProductsService;
  let productsRepositoryMock: Partial<ProductsRepository>;

  // Creacion del Módulo de Pruebas que incluye providers:
  beforeEach(async () => {
    // Métodos que utilizaremos: Mock
    productsRepositoryMock = {
      getAllProducts: jest.fn(),
      addProduct: jest.fn(),
      getProductById: jest.fn(),
      updateProduct: jest.fn(),
      deleteProduct: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService, // ProductsService Real => A Testear
        // Inyección de Mocks en lugar del repositorio real:
        { provide: ProductsRepository, useValue: productsRepositoryMock },
      ],
    }).compile();

    // Instancias reales o mockeadas desde el módulo de pruebas:
    productsService = module.get<ProductsService>(ProductsService);
  });

  // Tests:

  // Smoke test
  it('Debe estar definido', () => {
    expect(productsService).toBeDefined();
  });

  // Debe devolver todos los productos con paginación
  it('Debe devolver todos los productos con paginación', async () => {
    const products = [
      {
        id: 'd165761b-1eb6-403f-a8d7-f1b064685a58',
        name: 'Test_Laptop',
        description: 'Testing_Gaming_Laptop',
        price: 30000,
        stock: 10,
        imgUrl: 'https://test_url_Laptop.com',
      },
      {
        id: '9ebaeb43-a12a-4769-a16a-79886e3cf4va',
        name: 'Test_Smartphone',
        description: 'Testing_Gaming_Smartphone',
        price: 10000,
        stock: 10,
        imgUrl: 'https://test_url_Smartphone.com',
      },
    ];
    (productsRepositoryMock.getAllProducts as jest.Mock).mockResolvedValue(
      products,
    );

    const result = await productsService.getAllProducts(1, 10);

    expect(productsRepositoryMock.getAllProducts).toHaveBeenCalledWith(1, 10);
    expect(result).toEqual(products);
  });

  // Debe agregar un producto
  it('Debe agregar un producto', async () => {
    const newProduct = {
      id: '9ebaeb43-a12a-4769-a16a-79756e3cf4va',
      name: 'Test_Tablet',
      description: 'Testing_Gaming_Smartphone',
      price: 8000,
      stock: 10,
      imgUrl: 'https://test_url_Tablet.com',
    };
    (productsRepositoryMock.addProduct as jest.Mock).mockResolvedValue(
      newProduct,
    );

    const result = await productsService.addProducts();

    expect(productsRepositoryMock.addProduct).toHaveBeenCalled();
    expect(result).toEqual(newProduct);
  });

  // Debe devolver un producto por id
  it('Debe devolver un producto por ID', async () => {
    const product = {
      id: 'd165761b-1eb6-403f-a8d7-f1b064685a58',
      name: 'Test_Laptop',
      description: 'Testing_Gaming_Laptop',
      price: 30000,
      stock: 10,
      imgUrl: 'https://test_url_Laptop.com',
    };
    (productsRepositoryMock.getProductById as jest.Mock).mockResolvedValue(
      product,
    );

    const result = await productsService.getProductById(
      'd165761b-1eb6-403f-a8d7-f1b064685a58',
    );

    expect(productsRepositoryMock.getProductById).toHaveBeenCalledWith(
      'd165761b-1eb6-403f-a8d7-f1b064685a58',
    );
    expect(result).toEqual(product);
  });

  // Debe actualizar un producto
  it('Debe actualizar un producto', async () => {
    const updatedProduct: Products = {
      id: '9ebaeb43-a12a-4769-a16a-79886e3cf4va',
      name: 'Test_Smartphone',
      description: 'Testing_Gaming_Smartphone',
      price: 15000,
      stock: 15,
      imgUrl: 'https://test_url_Smartphone.com',
    } as Products;
    (productsRepositoryMock.updateProduct as jest.Mock).mockResolvedValue(
      updatedProduct,
    );

    const result = await productsService.updateProduct(
      '9ebaeb43-a12a-4769-a16a-79886e3cf4va',
      updatedProduct,
    );

    expect(productsRepositoryMock.updateProduct).toHaveBeenCalledWith(
      '9ebaeb43-a12a-4769-a16a-79886e3cf4va',
      updatedProduct,
    );
    expect(result).toEqual(updatedProduct);
  });

  // Debe eliminar un producto
  it('Debe eliminar un producto', async () => {
    (productsRepositoryMock.deleteProduct as jest.Mock).mockResolvedValue(true);

    const result = await productsService.deleteProduct(
      '9ebaeb43-a12a-4769-a16a-79886e3cf4va',
    );

    expect(productsRepositoryMock.deleteProduct).toHaveBeenCalledWith(
      '9ebaeb43-a12a-4769-a16a-79886e3cf4va',
    );
    expect(result).toBe(true);
  });
});
