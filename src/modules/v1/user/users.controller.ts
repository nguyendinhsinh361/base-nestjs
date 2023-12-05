import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Put,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MessageEnum } from '@root/common/enums/message.enum';
import { ResponseUpdateUserDto } from '@root/common/res/res-user.dto';

@ApiTags('Users')
@Controller({
  version: '1',
  path: 'users',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() req: any) {
    const user = req.currentUser;
    delete user.password;
    delete user.refreshToken;
    delete user.token;
    const res = {
      message: MessageEnum.GET_PROFILE_SUCCESSFULLY,
      result: user,
    };
    return res;
  }

  @Put(':userId')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ type: ResponseUpdateUserDto })
  async updateProfile(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const res = {
      message: MessageEnum.UPDATE_USER_SUCCESSFULLY,
      result: await this.usersService.updateProfile(userId, updateUserDto),
    };
    return res;
  }

  @Delete('/delete')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Req() req: any) {
    const user = req.userBeingQueried;
    const deleted = this.usersService.delete(user.id);
    if (deleted) return { message: 'Success' };
    else return null;
  }
}
