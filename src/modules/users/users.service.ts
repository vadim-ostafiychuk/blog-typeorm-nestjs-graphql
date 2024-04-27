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
      id: options.id,
    });
  }

  async createUser(data) {
    const user = await this.userRepository.create(data);

    return this.userRepository.save(user);
  }
}
