import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from '../../common/enums/roles.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  // 1. Acceder a la Metadata:
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 2. Acceder al rol de la ruta Metadata:
    const routeRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // 3. Acceder al Request => request.users.roles: 'admin' | 'user'
    const request = context.switchToHttp().getRequest();
    const user = request.user; // payload: { id, email, roles: 'admin' | 'users' }
    if (!user || !user.roles)
      throw new ForbiddenException('Usuario no autenticado o sin roles');
    const userRoles = user.roles; // Se guarda 'admin' | 'user'

    console.log(userRoles);
    console.log(routeRoles);

    // 4. Se comparan los Roles:
    const hasRole = () => routeRoles.some((role) => userRoles.includes(role)); // Devuelve true | false
    const valid = hasRole();
    console.log(valid);
    if (!valid)
      throw new ForbiddenException(
        'No tiene permisos para acceder a esta ruta',
      );
    return true;
  }
}
