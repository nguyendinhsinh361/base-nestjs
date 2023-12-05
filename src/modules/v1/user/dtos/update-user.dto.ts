import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { StatusEnum } from '@root/common/enums/status.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({})
  status?: StatusEnum;

  @ApiProperty({})
  username: string;
}
