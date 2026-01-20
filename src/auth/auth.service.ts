import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import { CreateUserDto } from '../users/dtos/users.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  getAuth(): string {
    return 'Auth service is running';
  }

  async signIn(email: string, password: string) {
    if (!email || !password)
      throw new BadRequestException('Email y password requeridos');

    const foundUser = await this.usersRepository.getUserByEmail(email);

    if (!foundUser) throw new BadRequestException('Credenciales Incorrectas');

    const validPassword = await bcrypt.compare(password, foundUser.password);
    if (!validPassword)
      throw new BadRequestException('Credenciales Incorrectas');

    const payload = {
      id: foundUser.id,
      email: foundUser.email,
      isAdmin: foundUser.isAdmin,
      isTester: foundUser.isTester,
    };

    const token = this.jwtService.sign(payload);
    return {
      message: 'Login Correcto',
      token: token,
    };
  }

  async singUp(newUserData: CreateUserDto) {
    const { email, password } = newUserData;
    if (!email || !password)
      throw new BadRequestException('Credenciales requeridas');

    const foundUser = await this.usersRepository.getUserByEmail(email);
    if (foundUser)
      throw new BadRequestException(`El email: ${email} ya está registrado`);

    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.usersRepository.addUser({
      ...newUserData,
      password: hashedPassword,
    });
  }
}
