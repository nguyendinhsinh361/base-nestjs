import { Injectable } from '@nestjs/common';
import { BaseAbstractRepository } from '@root/base/mongo/base.abstract.repository';
import { ExamplesRepositoryInterface } from './interfaces/example.repository.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Example } from './schema/example.schema';

@Injectable()
export class ExamplesRepository
  extends BaseAbstractRepository<Example>
  implements ExamplesRepositoryInterface
{
  constructor(
    @InjectModel(Example.name)
    private readonly examplesRepository: Model<Example>,
  ) {
    super(examplesRepository);
  }

  async findAllExamples(paginateDto) {
    const { page, limit, search } = paginateDto;
    const skip = (page - 1) * limit;

    const examples = await this.examplesRepository.aggregate([
      {
        $match: {
          // units: { $exists: true, $not: { $size: 0 } },
          // desc: search?.trim(),
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    return examples;
  }

  async findExampleById(exampleId) {
    const example = await this.examplesRepository.aggregate([
      {
        $match: {
          _id: exampleId,
        },
      },
    ]);

    return example;
  }
}
