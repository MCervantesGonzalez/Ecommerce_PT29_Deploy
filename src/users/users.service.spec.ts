import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dtos/users.dto';
import { Users } from './entities/users.entity';

describe('UsersService', () => {
  // Variables Globales del Test:
  let usersService: UsersService;
  // Version Mock:
  let usersRepositoryMock: jest.Mocked<UsersRepository>;
  // Creacion del Módulo de Pruebas que incluye providers:
  beforeEach(async () => {
    usersRepositoryMock = {
      getAllUsers: jest.fn(),
      getUserById: jest.fn(),
      addUser: jest.fn(),
      updateUser: jest.fn(),
      deleteUser: jest.fn(),
    } as unknown as jest.Mocked<UsersRepository>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService, // UsersService Real => A Testear
        { provide: UsersRepository, useValue: usersRepositoryMock },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  // Tests:

  // Smoke Test
  it('Debe estar definido', () => {
    expect(usersService).toBeDefined();
  });

  // Debe devolver todos los usuarios con paginación
  it('Debe devolver todos los usuarios con paginación', async () => {
    const users: Omit<Users, 'password'>[] = [
      {
        id: 'ba50faa4-1bb7-465a-8bb0-061a7ab5baab',
        name: 'Tester',
        email: 'Test_User@mail.com',
        address: 'test_address',
        phone: 12345,
        country: 'test_country',
        city: 'test_city',
        isAdmin: false,
        isTester: true,
      } as Users,
      {
        id: 'ba50faa4-1bb7-465a-8bb0-061a7ab5beeb',
        name: 'Miguel',
        email: 'Miguel_User@mail.com',
        address: 'Miguel_address',
        phone: 12345,
        country: 'Miguel_country',
        city: 'Miguel_city',
        isAdmin: false,
        isTester: true,
      } as Users,
    ];
    usersRepositoryMock.getAllUsers.mockResolvedValue(users);

    const result = await usersService.getAllUsers(1, 10);

    expect(usersRepositoryMock.getAllUsers).toHaveBeenCalledWith(1, 10);
    expect(result).toEqual(users);
  });

  // Debe devolver un usuario por ID
  it('Debe devolver un usuario por ID', async () => {
    const user = {
      id: 'ba50faa4-1bb7-465a-8bb0-061a7ab5baab',
      name: 'Tester',
      email: 'Test_User@mail.com',
      address: 'test_address',
      phone: 12345,
      country: 'test_country',
      city: 'test_city',
      isAdmin: false,
      isTester: true,
    } as Users;

    usersRepositoryMock.getUserById.mockResolvedValue(user);

    const result = await usersService.getUserById(
      'ba50faa4-1bb7-465a-8bb0-061a7ab5baab',
    );

    expect(usersRepositoryMock.getUserById).toHaveBeenCalledWith(
      'ba50faa4-1bb7-465a-8bb0-061a7ab5baab',
    );
    expect(result).toEqual(user);
  });

  // Debe agregar un usuario nuevo
  it('Debe agregar un usuario nuevo', async () => {
    const newUser: CreateUserDto = {
      name: 'NewUser',
      email: 'New_User@mail.com',
      password: '1234',
      confirmPassword: '1234',
      address: 'New_address',
      phone: 12345,
      country: 'New_country',
      city: 'New_city',
      isAdmin: false,
      isTester: true,
      isDeleted: false,
    };
    usersRepositoryMock.addUser.mockResolvedValue('new-id');

    const result = await usersService.addUser(newUser);

    expect(usersRepositoryMock.addUser).toHaveBeenCalledWith(newUser);
    expect(result).toBe('new-id');
  });

  // Debe actualizar un usuario
  it('Debe actualizar un usuario', async () => {
    const updatedUser = {
      id: 'ba50faa4-1bb7-465a-8bb0-061a7ab5baab',
      name: 'Tester',
      email: 'Test_User@mail.com',
      address: 'Updated_address',
      phone: 12345,
      country: 'Updated_country',
      city: 'Updated_city',
      isAdmin: false,
      isTester: true,
      isDeleted: false,
      orders: [],
    };
    usersRepositoryMock.updateUser.mockResolvedValue(updatedUser);

    const result = await usersService.updateUser(
      'ba50faa4-1bb7-465a-8bb0-061a7ab5baab',
      {
        name: '',
        email: '',
        password: '',
        address: 'Updated_address',
        phone: 12345,
        country: 'Updated_country',
        city: 'Updated_city',
      },
    );

    expect(usersRepositoryMock.updateUser).toHaveBeenCalledWith(
      'ba50faa4-1bb7-465a-8bb0-061a7ab5baab',
      {
        name: '',
        email: '',
        password: '',
        address: 'Updated_address',
        phone: 12345,
        country: 'Updated_country',
        city: 'Updated_city',
      },
    );

    expect(result).toEqual(updatedUser);
  });
});
