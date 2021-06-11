import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ErrorHandlingInterceptor } from './core/interceptor/error-handler.interceptor';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalInterceptors(new ErrorHandlingInterceptor());
  await app.listen(3000);
}
bootstrap();
