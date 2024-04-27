import { Injectable } from '@nestjs/common';
import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async createComment(data) {
    const comment = await this.commentRepository.create(data);

    return this.commentRepository.save(comment);
  }

  async find(options) {
    return this.commentRepository.findBy({
      postId: options.postId,
    });
  }
}
