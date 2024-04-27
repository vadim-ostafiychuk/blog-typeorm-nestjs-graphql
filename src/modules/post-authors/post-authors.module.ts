import { Module } from '@nestjs/common';
import { PostAuthorsService } from './post-authors.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule],
  providers: [PostAuthorsService],
  exports: [PostAuthorsService],
})
export class PostAuthorsModule {}
