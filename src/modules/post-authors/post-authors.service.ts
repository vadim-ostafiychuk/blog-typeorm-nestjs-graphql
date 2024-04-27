import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { PostEntity } from '../posts/entities/post.entity';

@Injectable()
export class PostAuthorsService {
  constructor(private readonly usersService: UsersService) {}

  async getPostAuthor(post: PostEntity) {
    return this.usersService.findOneBy({
      id: post.authorId,
    });
  }
}
