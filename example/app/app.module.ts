import { Module, NestModule, MiddlewaresConsumer } from '@nestjs/common';
import { CatsModule } from './cats/cats.module';
import { DogsModule } from './dogs/dogs.module'
import { NinjaModule } from './ninja/ninja.module';

@Module({
    modules: [CatsModule, DogsModule, NinjaModule],
})
export class ApplicationModule { }