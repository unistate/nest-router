import { Controller, Get, Param } from '@nestjs/common';

@Controller('ninja')
export class NinjaController {
  constructor() {}

  @Get()
  async fight() {
    return 'haaaaaa3';
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return { ninjaId: id }
  }
}