export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    address: string;
    phone: number;
    country: string;
    city: string;
    isAdmin: boolean;
    isTester: boolean;
    isDeleted: boolean;
}
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<Omit<CreateUserDto, "password" | "name" | "email" | "confirmPassword">>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
declare const LoginUserDto_base: import("@nestjs/common").Type<Pick<CreateUserDto, "password" | "email">>;
export declare class LoginUserDto extends LoginUserDto_base {
    email: string;
    password: string;
}
export {};
