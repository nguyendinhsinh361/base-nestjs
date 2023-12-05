import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '@root/config/enum/role.enum';
export class ResponseCommonDto {
  @ApiProperty()
  message: string;
}

export class RoleDto {
  @ApiProperty()
  role: RoleEnum;
}

export class CommonParamsDto {
  @ApiProperty()
  id: string;
}
