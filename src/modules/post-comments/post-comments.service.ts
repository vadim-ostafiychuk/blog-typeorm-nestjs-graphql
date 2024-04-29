import { Injectable } from '@nestjs/common';
import { PostEntity } from '../posts/entities/post.entity';
import { CommentsService } from '../comments/comments.service';
import { CommentEntity } from '../comments/entities/comment.entity';

@Injectable()
export class PostCommentsService {
  constructor(private readonly commentsService: CommentsService) {}

  async getPostComments(
    post: PostEntity,
    options = {},
  ): Promise<CommentEntity[]> {
    return this.commentsService.find({ ...options, postId: post.id });
  }
}
