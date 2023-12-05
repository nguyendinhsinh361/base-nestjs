import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dtos/login.dto';
import { UsersService } from '../user/users.service';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { MessageEnum } from '@root/common/enums/message.enum';
import { ErrorEnum } from '@root/common/enums/error.enum';
import { StatusEnum } from '@root/common/enums/status.enum';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<any> {
    const findUser = await this.userService.findOneByEmail(createUserDto.email);
    if (findUser) {
      throw new ForbiddenException(ErrorEnum.USER_HAS_EXIST);
    }
    createUserDto.password = await this.hashPassword(createUserDto.password);

    const userCreated = await this.userService.create(createUserDto);
    if (userCreated) {
      const tokens = await this.getTokens(userCreated.id, userCreated.email);

      const refreshToken = await this.hashPassword(tokens.refreshToken);

      await this.userService.updateToken(userCreated.id, {
        token: tokens.accessToken,
        refreshToken,
      });
      const res = {
        message: MessageEnum.ACCOUNT_SUCCESSFULLY_CREATED,
        result: tokens,
      };
      return res;
    }
  }

  async login(loginDto: LoginDto): Promise<any> {
    const findUser = await this.userService.findOneByEmail(loginDto.email);
    if (!findUser || !findUser.password) {
      throw new ForbiddenException(MessageEnum.INCORRECT_ACCOUNT_OR_PASSWORD);
    }

    const passwordMatches = await bcrypt.compare(
      loginDto.password,
      findUser.password,
    );

    if (!passwordMatches)
      throw new ForbiddenException(MessageEnum.INCORRECT_PASSWORD);

    if (findUser.status === StatusEnum.LOCKED) {
      throw new NotAcceptableException(
        MessageEnum.YOUR_ACCOUNT_HAS_BEEN_LOCKED,
      );
    }

    const tokens = await this.getTokens(findUser.id, findUser.email);

    const refreshToken = await this.hashPassword(tokens.refreshToken);

    await this.userService.updateToken(findUser.id, {
      token: tokens.accessToken,
      refreshToken,
    });
    delete findUser.password;

    const res = {
      message: MessageEnum.LOGGED_IN_SUCCESSFULLY,
      result: {
        ...findUser,
        token: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    };
    return res;
  }

  async logout(userId: number) {
    await this.userService.updateToken(userId, { token: null });
    const res = {
      message: MessageEnum.LOG_OUT_SUCCESSFULLY,
      result: null,
    };
    return res;
  }

  async refreshTokens(userId: number | string, rt: string) {
    const user = await this.userService.findOne(userId);
    if (!user || !user.refreshToken)
      throw new ForbiddenException(MessageEnum.ACCESS_DENIED);

    const refreshTokenMatches = await bcrypt.compare(rt, user.refreshToken);

    if (!refreshTokenMatches)
      throw new ForbiddenException(MessageEnum.ACCESS_DENIED);

    const tokens = await this.getTokens(user.id, user.email);

    const refreshToken = await this.hashPassword(tokens.refreshToken);

    await this.userService.updateToken(user.id, {
      token: tokens.accessToken,
      refreshToken: refreshToken,
    });
    const res = {
      message: MessageEnum.REFRESH_TOKEN_SUCCESSFULLY,
      result: tokens,
    };
    return res;
  }

  async getTokens(userId: number, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('jwt.access_token_secret'),
          expiresIn: this.configService.get<string>('jwt.access_token_ttl'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: this.configService.get<string>('jwt.refresh_token_secret'),
          expiresIn: this.configService.get<string>('jwt.refresh_token_ttl'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async hashPassword(data: string) {
    const SALT = 10;
    return bcrypt.hash(data, SALT);
  }
}
