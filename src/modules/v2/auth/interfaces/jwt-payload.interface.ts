import { RoleEnum } from '@root/config/enum/role.enum';

export interface IJwtPayload {
  id?: number;
  sub?: string;
  email?: string;
  role?: RoleEnum;
}
