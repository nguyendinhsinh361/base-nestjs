import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserRepository } from './user.repository';
import { UpdateTokenDto } from '../auth/dtos/update-token.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findByCondition({ email });
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(id: string | number) {
    return await this.userRepository.findOneById(id);
  }

  async updateToken(id: string | number, updateDto: UpdateTokenDto) {
    return await this.userRepository.update(id, updateDto);
  }

  async updateProfile(id: string | number, updateDto: UpdateUserDto) {
    const { password } = updateDto;
    updateDto.password = await this.hashPassword(password);
    await this.userRepository.update(id, updateDto);
    const updatedUser = await this.findOne(id);
    return updatedUser;
  }

  async delete(id: string | number) {
    return await this.userRepository.delete(id);
  }

  async hashPassword(password: string) {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);
    return hash;
  }
}
