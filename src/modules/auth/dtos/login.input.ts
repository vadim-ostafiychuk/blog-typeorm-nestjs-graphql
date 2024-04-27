import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  public readonly email: string;

  @Field()
  public readonly password: string;
}
