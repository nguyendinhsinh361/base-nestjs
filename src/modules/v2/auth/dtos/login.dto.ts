import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDefined,
  IsOptional,
  IsString,
  MinLength,
  NotEquals,
} from 'class-validator';

export class LoginDto {
  @IsDefined()
  @NotEquals(null)
  @Transform((data) => data.value?.trim())
  @ApiPropertyOptional()
  email: string = 'test@gmail.com';

  @IsString()
  @MinLength(6)
  @IsDefined()
  @NotEquals(null)
  @ApiProperty()
  password: string = 'abc123';
}
