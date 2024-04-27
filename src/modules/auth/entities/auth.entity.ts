import { Field, ObjectType } from '@nestjs/graphql';
import { UserEntity } from '../../users/entities/user.entity';

@ObjectType()
export class AuthResponseEntity {
  @Field(() => String)
  jwt: string;

  @Field(() => UserEntity)
  user: UserEntity;
}
