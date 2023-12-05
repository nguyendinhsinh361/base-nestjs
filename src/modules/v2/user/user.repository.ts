import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { hashSync, genSalt } from 'bcrypt';
import { BaseAbstractRepository } from '@root/base/mysql/base.abstract.repository';
import { UserRepositoryInterface } from './interfaces/user.repository.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
const saltRounds = 10;

@Injectable()
export class UserRepository
  extends BaseAbstractRepository<User>
  implements UserRepositoryInterface
{
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {
    super(usersRepository);
  }

  async hashPassword(password: string) {
    return hashSync(password, await genSalt(saltRounds));
  }

  public async createUser(userDto: CreateUserDto) {
    let user = new User();
    userDto.password = await this.hashPassword(userDto.password);
    user = { ...user, ...userDto };
    user = await this.create(user);
    const { password, ...data } = user;
    password;
    return data;
  }

  public async changePassword(
    changePasswordDto: ChangePasswordDto,
    findUser: User,
    id: string,
  ) {
    findUser.password = await this.hashPassword(changePasswordDto.newPassword);
    await this.update(id, findUser);
    const { password, ...data } = findUser;
    password;
    return data;
  }
}
