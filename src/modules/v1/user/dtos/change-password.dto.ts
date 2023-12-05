import { IsString, MinLength, NotContains } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  oldPassword: string;

  @ApiProperty()
  @IsString()
  @MinLength(5)
  @NotContains(' ', {
    message: 'newPassword should not contain character space',
  })
  newPassword: string;
}
