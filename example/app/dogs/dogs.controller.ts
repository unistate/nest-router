import { Controller, Get, Param } from '@nestjs/common';

@Controller('dogs')
export class DogsController {
  constructor() {}

  @Get('/')
  async woff() {
    return 'wooooffff';
  }

  @Get(':id')
  findOne(@Param('id') id) {
    return { dogId : id }
  }
}