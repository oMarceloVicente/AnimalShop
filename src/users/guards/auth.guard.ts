import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { ConfigService } from '@nestjs/config';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  
  export interface AuthRequest extends Request {
    user: { id: string };
  }
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      private jwtService: JwtService,
      private configService: ConfigService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<AuthRequest>();
      const token = this.extractToken(request);
      if (!token) {
        throw new UnauthorizedException();
      }
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: this.configService.get('AUTH_SECRET'),
        });
  
        request.user = payload;
      } catch (e) {
        console.log(e);
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractToken(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      if (token) {
        return type === 'Bearer' ? token : undefined;
      } else {
        return request.cookies['next-auth.session-token'];
      }
    }
  }
  