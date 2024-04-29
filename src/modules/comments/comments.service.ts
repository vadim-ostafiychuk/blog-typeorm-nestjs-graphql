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
    const query = {
      where: {
        postId: options.postId,
      },
      order: {},
    };

    if (options.sort) {
      query.order[options.sort.field] = options.sort.type;
    }

    return this.commentRepository.find(query);
  }
}
