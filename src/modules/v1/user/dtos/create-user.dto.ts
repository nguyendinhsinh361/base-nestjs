import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '@root/config/enum/role.enum';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    example: 'test@gmail.com',
  })
  @IsString()
  email: string;

  @ApiProperty({
    required: true,
    example: 'abc123',
  })
  @IsString()
  password: string;

  @ApiProperty({
    required: true,
    example: 'user',
  })
  @IsString()
  @IsOptional()
  role?: RoleEnum;
}
