import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { UsersRepository } from '../users/users.repository';

describe('AuthService', () => {
  // Variables Globales del Test:
  let authService: AuthService; // Instancia Real => Importada
  // Versiones Mock => Solo utilizaremos algunos métodos:
  let jwtServiceMock: Partial<JwtService>;
  let usersRepositoryMock: Partial<UsersRepository>;

  // Creacion del Módulo de Pruebas que incluye providers:
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService, // AuthService Real => A Testear
        // Inyección de Mocks en lugar de los servicios reales:
        {
          provide: JwtService,
          // Métodos que utilizaremos: Mocks
          useValue: {
            // jest.fn() => controla su comportamiento:
            sign: jest.fn(),
          },
        },
        {
          provide: UsersRepository,
          useValue: {
            // Métodos que utilizaremos: Mocks
            getUserByEmail: jest.fn(),
            addUser: jest.fn(),
          },
        },
      ],
    }).compile();

    // Instancias reales o mockeadas desde el módulo de pruebas:
    authService = module.get<AuthService>(AuthService);
    jwtServiceMock = module.get<JwtService>(JwtService);
    usersRepositoryMock = module.get<UsersRepository>(UsersRepository);
  });

  // Tests:

  //Verificar que AuthService se haya creado correctamente:
  it('Debe estar definido', () => {
    expect(authService).toBeDefined();
  });

  //Verficar login y devolver token
  it('Debe hacer login y devolver token', async () => {
    const testUser = {
      id: 'ba50faa4-1bb7-465a-8bb0-061a7ab5baib',
      email: 'testing@mail.com',
      password: await bcrypt.hash('1234', 10),
      isAdmin: true,
      isTester: false,
    };
    (usersRepositoryMock.getUserByEmail as jest.Mock).mockResolvedValue(
      testUser,
    );
    (jwtServiceMock.sign as jest.Mock).mockReturnValue('token123');

    const result = await authService.signIn('testing@mail.com', '1234');

    expect(usersRepositoryMock.getUserByEmail).toHaveBeenLastCalledWith(
      'testing@mail.com',
    );
    expect(jwtServiceMock.sign).toHaveBeenCalledWith({
      id: testUser.id,
      email: testUser.email,
      isAdmin: true,
      isTester: false,
    });
    expect(result).toEqual({
      message: 'Login Correcto',
      token: 'token123',
    });
  });

  //Lanzar exepcion al no encontrar usuario
  it('Lanzar error si el usuario no existe', async () => {
    (usersRepositoryMock.getUserByEmail as jest.Mock).mockReturnValue(null);

    await expect(authService.signIn('no@mail.com', '1234')).rejects.toThrow(
      'Credenciales Incorrectas',
    );
  });

  //Lanzar exepcion al ingresar contraseña incorrecta
  it('Lanzar exepcion al ingresar contraseña incorrecta', async () => {
    const testUser = {
      id: 'ba50faa4-1bb7-465a-8bb0-061a7ab5baib',
      email: 'testing@mail.com',
      password: await bcrypt.hash('correcta', 10),
      isAdmin: true,
      isTester: false,
    };
    (usersRepositoryMock.getUserByEmail as jest.Mock).mockResolvedValue(
      testUser,
    );
    await expect(
      authService.signIn('testing@mail.com', 'incorrecta'),
    ).rejects.toThrow('Credenciales Incorrectas');
  });

  //Registrar exitosamente usuario nuevo
  it('Registrar exitosamente usuario nuevo', async () => {
    (usersRepositoryMock.getUserByEmail as jest.Mock).mockResolvedValue(null);
    (usersRepositoryMock.addUser as jest.Mock).mockResolvedValue('new-id');

    const newUser = {
      name: 'Tester',
      email: 'nuevousuario@mail.com',
      password: '1234',
      confirmPassword: '1234',
      address: 'test_address',
      phone: 12345,
      country: 'test_country',
      city: 'test_city',
      isAdmin: false,
      isTester: true,
    };
    const result = await authService.singUp(newUser);

    expect(usersRepositoryMock.getUserByEmail).toHaveBeenCalledWith(
      'nuevousuario@mail.com',
    );
    expect(usersRepositoryMock.addUser).toHaveBeenCalled();
    expect(result).toBe('new-id');
  });

  //Lanzar error si el email ya existe
  it('Lanzar error si el email ya existe', async () => {
    (usersRepositoryMock.getUserByEmail as jest.Mock).mockResolvedValue({
      id: '123',
      email: 'testing@mail.com',
    });

    const newUser = {
      name: 'Tester',
      email: 'testing@mail.com',
      password: '1234',
      confirmPassword: '1234',
      address: 'test_address',
      phone: 12345,
      country: 'test_country',
      city: 'test_city',
      isAdmin: false,
      isTester: true,
    };

    await expect(authService.singUp(newUser)).rejects.toThrow(
      'El email: testing@mail.com ya está registrado',
    );
  });
});
