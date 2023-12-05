import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ResponseCommonDto } from './res-common.dto';

export class ResponseCreateUserDto extends ResponseCommonDto {
  @ApiProperty()
  result: any;
}

export class ResponseUpdateUserDto extends PartialType(ResponseCreateUserDto) {}
