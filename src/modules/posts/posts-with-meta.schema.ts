import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PostEntity } from './entities/post.entity';

@ObjectType()
export class PostsAndCountSchema {
  @Field(() => [PostEntity])
  posts: PostEntity[];

  @Field(() => Int)
  count: number;
}
