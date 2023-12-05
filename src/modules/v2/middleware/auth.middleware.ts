import {
  Inject,
  Injectable,
  NestMiddleware,
  NotAcceptableException,
  UnauthorizedException,
  forwardRef,
} from '@nestjs/common';
import { MessageEnum } from '@root/common/enums/message.enum';
import { StatusEnum } from '@root/common/enums/status.enum';
import { JwtService } from '@root/common/helpers/jwt.helper';
import { UsersService } from '../user/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async use(req: any, res: any, next: (error?: any) => void) {
    const token = req.headers.authorization;

    if (!token) throw new UnauthorizedException(MessageEnum.NOT_AUTHORIZED);
    const check = this.jwtService.verifyAt(token);
    if (!check) throw new UnauthorizedException(MessageEnum.NOT_AUTHORIZED);

    const user = await this.userService.findOne(check.sub);
    if (!user) throw new UnauthorizedException(MessageEnum.NOT_AUTHORIZED);

    if (user.status && user.status === StatusEnum.LOCKED)
      throw new NotAcceptableException(
        MessageEnum.YOUR_ACCOUNT_HAS_BEEN_LOCKED,
      );
    if (user.token !== token)
      throw new UnauthorizedException(MessageEnum.NOT_AUTHORIZED);

    req.currentUser = user;
    next();
  }
}
