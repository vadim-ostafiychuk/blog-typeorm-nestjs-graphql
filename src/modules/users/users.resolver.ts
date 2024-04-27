import { Context, Query, Resolver } from '@nestjs/graphql';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqlAuthGuard)
  @Query(() => UserEntity, { name: 'me' })
  me(@Context('user') user: UserEntity) {
    return user;
  }

  //   @Mutation(() => UserEntity)
  //   async createUser(
  //     @Args('data')
  //     data: CreateUserInput,
  //   ) {
  //     return this.usersService.createUser(data);
  //   }
}
