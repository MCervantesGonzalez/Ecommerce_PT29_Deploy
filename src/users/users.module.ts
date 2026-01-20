import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UsersController } from '../users/users.controller';
import { UsersService } from '../users/users.service';
import { UsersRepository } from '../users/users.repository';
import { Users } from '../users/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersRepository],
})
export class UsersModule {}
