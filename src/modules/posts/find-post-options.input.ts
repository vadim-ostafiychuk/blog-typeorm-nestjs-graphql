import { Field, InputType, Int } from '@nestjs/graphql';
import { SortSchema } from '../common/schemas/sort.schema';

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

  @Field(() => SortSchema, {
    nullable: true,
  })
  sort: SortSchema;
}
