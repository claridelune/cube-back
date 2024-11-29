import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class TransformRequestInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const transformConfig = this.reflector.get(
      'transformRequestConfig',
      context.getHandler(),
    );
    if (transformConfig && request.body) {
      request.body = new transformConfig(request.body);
    }
    return next.handle();
  }
}
