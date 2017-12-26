import { Module, NestModule, MiddlewaresConsumer } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.module';
import { NinjaModule } from './ninja/ninja.module';
import { RouterModule } from '../../src/core/router.module';
import { routes } from './app.routes';

@Module({
    modules: [
        CatsModule,
        DogsModule,
        NinjaModule,
        RouterModule.forRoutes(routes),
    ],
})
export class ApplicationModule { }