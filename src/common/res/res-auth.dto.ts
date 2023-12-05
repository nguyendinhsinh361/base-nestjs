import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '@root/config/enum/role.enum';

export class ResponseLoginDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  result: {
    id: number;
    username: string;
    email: string;
    phone: string;
    role: RoleEnum;
    status: number;
    token: string;
    refreshToken: string;
  };
}

export class ResponseRegisterDto {
  @ApiProperty()
  message: string;

  @ApiProperty()
  result: {
    token: string;
    refreshToken: string;
  };
}
