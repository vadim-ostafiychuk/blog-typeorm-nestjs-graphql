import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findOneBy(options) {
    return this.userRepository.findOneBy({
      ...(options.id ? { id: options.id } : null),
      ...(options.email ? { email: options.email } : null),
    });
  }

  async createUser(data): Promise<UserEntity> {
    const user = await this.userRepository.create({
      ...data,
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return this.userRepository.save(user);
  }
}
