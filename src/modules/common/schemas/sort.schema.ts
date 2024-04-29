import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SortSchema {
  @Field()
  field: string;

  @Field()
  type: string;
}
