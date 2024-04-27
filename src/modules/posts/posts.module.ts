import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from './entities/post.entity';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';
import { PostCommentsModule } from '../post-comments/post-comments.module';
import { PostAuthorsModule } from '../post-authors/post-authors.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    PostCommentsModule,
    PostAuthorsModule,
  ],
  providers: [PostsResolver, PostsService],
})
export class PostsModule {}
