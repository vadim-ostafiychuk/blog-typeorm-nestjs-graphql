import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field()
  content: string;

  @Field(() => Int)
  postId: number;

  @Field(() => Int)
  authorId: number;
}
