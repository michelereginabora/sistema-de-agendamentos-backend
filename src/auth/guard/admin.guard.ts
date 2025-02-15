import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common'
import { Request } from 'express'
import { JwtPayload } from '../interfaces/auth.interface'

interface RequestWithUser extends Request {
  user: JwtPayload
}

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>()
    const user = request.user

    if (!user?.isAdmin) {
      throw new UnauthorizedException(
        'Apenas administradores podem acessar este recurso'
      )
    }

    return true
  }
}
