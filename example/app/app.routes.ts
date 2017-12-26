import { Routes } from '../../src/common/interfaces/routes.interface';
import { NinjaController } from './ninja/ninja.controller';
import { CatsController } from './cats/cats.controller';
import { DogsController } from './dogs/dogs.controller';

export const routes: Routes = [{
    path: '/ninja',
    controller: NinjaController,
    children: [
        {
            path: '/cats',
            controller: CatsController,
        },
        {
            path: '/dogs',
            controller: DogsController,
        },
    ],
}];