import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { UsersRepository } from '../users/users.repository';
import { Users } from '../users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository],
})
export class AuthModule {}
