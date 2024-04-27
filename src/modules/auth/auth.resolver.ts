import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthResponseEntity } from './entities/auth.entity';
import { AuthService } from './auth.service';
import { RegisterInput } from './dtos/register.input';
import { LoginInput } from './dtos/login.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponseEntity)
  async login(
    @Args('data')
    data: LoginInput,
  ) {
    return this.authService.login(data.email, data.password);
  }

  @Mutation(() => AuthResponseEntity)
  async register(
    @Args('data')
    data: RegisterInput,
  ) {
    return this.authService.register(data);
  }
}
