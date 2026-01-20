import { ApiProperty, ApiHideProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional, //Refactorizamos el IsOptional por los Types de swagger para no repetir codigo.
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from '../../common/decorators/matchPassword.decorator';
import { PartialType, OmitType, PickType } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'Demo User 01', description: 'Nombre del usuario' })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  name: string;

  @ApiProperty({
    example: 'DemoUser01@mail.com',
    description: 'Correo electrónico válido',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'AAbb##11',
    description:
      'Contraseña segura (8-15 caracteres alfanumericos y especiales)',
  })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @MinLength(8)
  @MaxLength(15)
  password: string;

  @ApiProperty({
    example: 'AAbb##11',
    description: 'Confirmación de contraseña',
  })
  @IsNotEmpty()
  @Validate(MatchPassword, ['password'])
  confirmPassword: string;

  @ApiProperty({
    example: 'Demo Street 123',
    description: 'Dirección del usuario',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(80)
  address: string;

  @ApiProperty({ example: 1122334455, description: 'Teléfono válido' })
  @IsNotEmpty()
  @IsNumber()
  phone: number;

  @ApiProperty({ example: 'Demo Country', description: 'País del usuario' })
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  country: string;

  @ApiProperty({ example: 'Demo City', description: 'Ciudad del usuario' })
  @IsString()
  @MinLength(5)
  @MaxLength(20)
  city: string;

  @ApiHideProperty()
  @IsEmpty()
  isAdmin: boolean;

  @ApiHideProperty()
  @IsEmpty()
  isTester: boolean;

  @ApiHideProperty()
  @IsEmpty()
  isDeleted: boolean;
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, [
    'name',
    'email',
    'password',
    'confirmPassword',
  ] as const),
) {}
//(PartialType) Crea una copia del DTO con los campos opcionales y excluye los que no se modifican.

export class LoginUserDto extends PickType(CreateUserDto, [
  'email',
  'password',
] as const) {
  @ApiProperty({
    example: 'DemoUser01@mail.com',
    description: 'Correo electrónico para login',
  })
  email: string;

  @ApiProperty({ example: 'AAbb##11', description: 'Contraseña para login' })
  password: string;
}
//(PickType) Selecciona solo algunos campos del DTO en este caso solo los necesarios para el login.
