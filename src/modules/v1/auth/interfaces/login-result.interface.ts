import { RoleEnum } from '@root/config/enum/role.enum';

export interface ILoginResult {
  success: string;
  message: string;
  result: IResult;
}

export interface IResult {
  user: {
    id: number;
    email: string;
    phone: string;
    role: RoleEnum;
  };
  accessToken: string;
  expiredAt: string;
  refresh_token: string;
}
