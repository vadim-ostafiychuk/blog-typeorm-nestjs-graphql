import { Field, InputType } from '@nestjs/graphql';
import { SortSchema } from '../common/schemas/sort.schema';

@InputType()
export class FindCommentOptionsInput {
  @Field(() => SortSchema, {
    nullable: true,
  })
  sort: SortSchema;
}
