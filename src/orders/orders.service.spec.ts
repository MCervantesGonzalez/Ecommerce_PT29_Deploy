import { Test, TestingModule } from '@nestjs/testing';
import { OrdersRepository } from './orders.repository';
import { OrdersService } from './orders.service';
import { Orders } from './entities/orders.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dtos/orders.dto';
import { OrderDetails } from './entities/orderdetails.entity';
import { Users } from 'src/users/entities/users.entity';

describe('OrdersService', () => {
  let ordersService: OrdersService;
  let ordersRepositoryMock: jest.Mocked<OrdersRepository>;

  beforeEach(async () => {
    ordersRepositoryMock = {
      getOrderById: jest.fn(),
      addOrder: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: OrdersRepository, useValue: ordersRepositoryMock },
      ],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);
  });

  //Tests:

  // Smoke Test
  it('Debe estar definido', () => {
    expect(ordersService).toBeDefined();
  });

  // Obtener orden existente
  it('Obtener orden por id', async () => {
    const order = {
      id: 'o1',
      productId: 'p1',
      quantity: 2,
    } as unknown as Orders;
    ordersRepositoryMock.getOrderById.mockResolvedValue(order);

    const result = await ordersService.getOrderById('o1');

    expect(ordersRepositoryMock.getOrderById).toHaveBeenCalledWith('o1');
    expect(result).toEqual(order);
  });

  //Lanzar error si la orden no existe
  it('Lanzar excepcion si la orden no existe', async () => {
    ordersRepositoryMock.getOrderById.mockRejectedValue(
      new NotFoundException('La orden no fue encontrada'),
    );

    await expect(ordersService.getOrderById('no-existe')).rejects.toThrow(
      'La orden no fue encontrada',
    );
  });

  //Crear orden correctamente
  it('Debe crear una orden', async () => {
    const createOrderDto: CreateOrderDto = {
      userId: 'ba50faa4-1bb7-465a-8bb0-061a7ab5beeb ',
      products: [],
    };

    const newOrder = {
      id: 'd165761b-1eb6-403f-a8d7-f1b064685a05',
      date: new Date(),
      orderDetails: {} as OrderDetails,
      user: {} as Users,
    };

    ordersRepositoryMock.addOrder.mockResolvedValue([newOrder]);

    const result = await ordersService.addOrder(createOrderDto);
    expect(ordersRepositoryMock.addOrder).toHaveBeenCalledWith(createOrderDto);
    expect(result).toEqual([newOrder]);
  });

  //Manejar error al crear orden
  it('Debe lanzar error si ocurre un fallo al crear orden', async () => {
    const createOrderDto: CreateOrderDto = {
      userId: 'ba50faa4-1bb7-465a-8bb0-061a7ab5beeb ',
      products: [],
    };
    ordersRepositoryMock.addOrder.mockRejectedValue(
      new NotFoundException('Error en DB'),
    );
    await expect(ordersService.addOrder(createOrderDto)).rejects.toThrow(
      'Error en DB',
    );
  });
});
