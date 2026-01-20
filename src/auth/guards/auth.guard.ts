import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Role } from '../../common/enums/roles.enum';
import { environment } from '../../config/environment'; //SE REFACTORIZO Y SE UTILIZO EL MODULO DE CONFIGURACION DE NESTJS
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwService: JwtService,
    private readonly configService: ConfigService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) throw new UnauthorizedException('No se encontro el token');

    const [type, token] = authHeader.split(' ');
    if (type !== 'Bearer' || !token)
      throw new UnauthorizedException('Metodo de validacion incorrecto');

    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      const payload = this.jwService.verify(token, {
        secret: secret,
      });

      payload.roles = [];
      if (payload.isAdmin) {
        payload.roles.push(Role.Admin);
      }
      if (payload.isTester) {
        payload.roles.push(Role.Tester);
      } else {
        payload.roles.push(Role.User);
      }
      request.user = payload;
      return true;
    } catch (error: any) {
      if (error.name === 'TokenExpiredError')
        throw new UnauthorizedException('El token expiro');
      throw new UnauthorizedException('Error al validar el token');
    }
  }
}
