import { Module } from '@nestjs/common';
import { NinjaController } from './ninja.controller';
import { RouterModule } from '../../../src/core/router.module';

@Module({
    controllers: [NinjaController],
    modules: [RouterModule],
})
export class NinjaModule {}