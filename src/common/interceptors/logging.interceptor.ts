import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  LoggerService,
  NestInterceptor,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { v4 } from 'uuid';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const processUuid = v4();
    const handler = context.getArgByIndex(0);
    const api = handler.url;
    const method = handler.method;

    this.logger.log(
      `Start process '${processUuid}' » type: '${method}' » handler: '${api}' at '${now}' input: ${JSON.stringify(
        context.getArgByIndex(0).body,
      )}`,
    );
    return next
      .handle()
      .pipe(
        tap(() =>
          this.logger.log(
            `Finished process '${processUuid}' » type: '${method}' » handler: '${api}' after: '${Date.now() -
              now}ms'`,
          ),
        ),
      );
  }
}
