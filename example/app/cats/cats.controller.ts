import { Controller, Get, Param } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  constructor() {}

  @Get()
  async meaw() {
    return 'meaaaawoo';
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return { catId: id }
  }
}