import { Injectable } from '@nestjs/common';
import { ExamplesRepository } from './example.repository';
import { PaginateDto } from './dtos/paginate.dto';

@Injectable()
export class ExamplesService {
  constructor(private examplesRepository: ExamplesRepository) {}
  async getAllExamples(paginateDto: PaginateDto) {
    return this.examplesRepository.findAllExamples(paginateDto);
  }

  async findExampleById(exampleId: string) {
    return this.examplesRepository.findExampleById(exampleId);
  }
}
