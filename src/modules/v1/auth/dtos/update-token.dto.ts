import { ApiProperty } from '@nestjs/swagger';

export class UpdateTokenDto {
  @ApiProperty({})
  token?: string;

  @ApiProperty({})
  refreshToken?: string;
}
