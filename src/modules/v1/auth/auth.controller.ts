import { AuthService } from './auth.service';

import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { GetCurrentUserId } from '@root/common/decorators/get-current-user-id.decorator';
import { Public } from '@root/common/decorators/public.decorator';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ResponseLoginDto,
  ResponseRegisterDto,
} from '@root/common/res/res-auth.dto';
import { GetRefreshToken } from '@root/common/decorators/get-refresh-token.decorator';
import { Logout } from '@root/common/decorators/logout.decorator';

@ApiTags('Authentication')
@Controller({
  version: '1',
  path: 'auth',
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: ResponseLoginDto })
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }

  @Public()
  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({ type: ResponseRegisterDto })
  async register(@Body() createUserDto: CreateUserDto): Promise<any> {
    return await this.authService.register(createUserDto);
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Logout() userId: any) {
    return await this.authService.logout(userId);
  }

  @Public()
  @Post('/refresh')
  @HttpCode(HttpStatus.OK)
  async refreshTokens(
    @GetRefreshToken() refreshToken: string,
    @GetCurrentUserId() userId: number | string,
  ) {
    return await this.authService.refreshTokens(userId, refreshToken);
  }
}
