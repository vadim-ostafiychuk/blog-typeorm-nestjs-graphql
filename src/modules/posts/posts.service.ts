import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostEntity } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async findPost(id) {
    return this.postRepository.findOneByOrFail({
      id,
    });
  }

  async findAndCount(options) {
    const query: any = {
      where: {},
    };

    query.skip ??= options.skip && options.skip;
    query.take ??= options.take && options.take;
    query.where.authorId ??= options.authorId && options.authorId;

    const [posts, count] = await this.postRepository.findAndCount(query);

    return {
      posts,
      count,
    };
  }

  async createPost(data) {
    const post = await this.postRepository.create({
      ...data,
    });

    return this.postRepository.save(post);
  }

  async updatePost(id, data) {
    let post = await this.postRepository.findOneByOrFail({
      id,
    });

    post = {
      ...post,
      ...data,
    };

    return this.postRepository.save(post);
  }

  async deletePost(id) {
    const post = await this.postRepository.findOneByOrFail({
      id,
    });

    await this.postRepository.remove(post);

    return true;
  }
}
