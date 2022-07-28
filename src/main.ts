import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConsoleLoggingStrategy } from './common/helpers/console-logging-strategy';
import { Logger } from './common/helpers/logger';
import { loggerMiddleware } from './common/middlewares/root-logger.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // global middleware
  const logger = new Logger(new ConsoleLoggingStrategy(), "app/common");
  app.use(loggerMiddleware(logger));

  await app.listen(3000);
}
bootstrap();
