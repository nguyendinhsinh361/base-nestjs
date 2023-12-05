import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ExamplesService } from './example.service';
import { PaginateDto } from './dtos/paginate.dto';

@ApiTags('Examples')
@Controller({
  version: '2',
  path: 'examples',
})
export class ExamplesController {
  constructor(private examplesService: ExamplesService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllExamples(@Query() paginateDto: PaginateDto) {
    return this.examplesService.getAllExamples(paginateDto);
  }

  @Get('/:exampleId')
  @HttpCode(HttpStatus.OK)
  async getExampleById(@Param('exampleId') exampleId: string) {
    return this.examplesService.findExampleById(exampleId);
  }
}
