import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
export declare class AuthGuard implements CanActivate {
    private readonly jwService;
    private readonly configService;
    constructor(jwService: JwtService, configService: ConfigService);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean>;
}
