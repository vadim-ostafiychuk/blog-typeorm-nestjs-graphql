import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class FindPostOptionsInput {
  @Field(() => Int, {
    nullable: true,
  })
  skip: number;

  @Field(() => Int, {
    nullable: true,
  })
  take: number;

  @Field(() => Int, {
    nullable: true,
  })
  authorId: number;
}
