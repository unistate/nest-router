import { NestFactory } from '@nestjs/core';
import { Metatype } from '@nestjs/common/interfaces';
import { ApplicationModule } from './app/app.module';
import { routes } from './app/app.routes';
import { RouterModule } from '../src/core/router.module';
async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  // RouterModule.forRoutes(routes);
  await app.listen(3000);
}
bootstrap();
