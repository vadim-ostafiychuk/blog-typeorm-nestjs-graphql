import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { CreateUserInput } from './create-user.input';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => UserEntity, { name: 'me' })
  async getCurrentUser(
    @Args('id')
    id: number,
  ) {
    return this.usersService.findOneBy({ id });
  }

  @Mutation(() => UserEntity)
  async createUser(
    @Args('data')
    data: CreateUserInput,
  ) {
    return this.usersService.createUser(data);
  }
}
