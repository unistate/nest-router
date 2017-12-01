import { NestFactory } from '@nestjs/core';
import { Metatype } from '@nestjs/common/interfaces';
import { ApplicationModule } from './app/app.module';
import { RouterModule, Routes } from '../'
import { CatsController } from './app/cats/cats.controller';
import { DogsController } from './app/dogs/dogs.controller';
import { NinjaController } from './app/ninja/ninja.controller';
async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  const routes: Routes = [{
    path: '/ninja',
    controller: NinjaController,
    children: [{
      path: '/dogs',
      controller: DogsController
    }, {
      path: '/cats',
      controller: CatsController
    }]
  }]
  new RouterModule(NestFactory).forRoutes(routes);
  await app.listen(3000);
}
bootstrap();
