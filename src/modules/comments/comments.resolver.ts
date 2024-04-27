import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CommentEntity } from './entities/comment.entity';
import { CreateCommentInput } from './create-comment.input';
import { CommentsService } from './comments.service';

@Resolver()
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => CommentEntity)
  async createComment(
    @Args('data')
    data: CreateCommentInput,
  ) {
    return this.commentsService.createComment(data);
  }
}
