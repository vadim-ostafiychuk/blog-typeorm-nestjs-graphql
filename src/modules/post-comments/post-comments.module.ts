import { Module } from '@nestjs/common';
import { PostCommentsService } from './post-comments.service';
import { CommentsModule } from '../comments/comments.module';

@Module({
  imports: [CommentsModule],
  providers: [PostCommentsService],
  exports: [PostCommentsService],
})
export class PostCommentsModule {}
