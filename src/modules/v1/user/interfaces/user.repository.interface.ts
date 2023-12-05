import { BaseInterfaceRepository } from '@root/base/mysql/base.interface.repository';
import { User } from '../entities/user.entity';

export type UserRepositoryInterface = BaseInterfaceRepository<User>;
