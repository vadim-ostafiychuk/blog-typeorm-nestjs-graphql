import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { CreatePostInput } from './create-post.input';
import { UpdatePostInput } from './update-post.input';
import { PostEntity } from './entities/post.entity';
import { CommentEntity } from '../comments/entities/comment.entity';
import { PostCommentsService } from '../post-comments/post-comments.service';
import { PostsAndCountSchema } from './posts-with-meta.schema';
import { FindPostOptionsInput } from './find-post-options.input';
import { UserEntity } from '../users/entities/user.entity';
import { PostAuthorsService } from '../post-authors/post-authors.service';
import { FindCommentOptionsInput } from '../comments/find-comment-options.input';

@Resolver(() => PostEntity)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly postCommentsService: PostCommentsService,
    private readonly postAuthorsService: PostAuthorsService,
  ) {}

  @Query(() => PostEntity, { name: 'post' })
  async findOne(
    @Args({
      name: 'id',
      type: () => Int,
    })
    id: number,
  ) {
    return this.postsService.findPost(id);
  }

  @Query(() => PostsAndCountSchema, {
    name: 'postsAndCount',
  })
  async findAndCount(
    @Args('options')
    options: FindPostOptionsInput,
  ) {
    return this.postsService.findAndCount(options);
  }

  @Mutation(() => PostEntity)
  async createPost(
    @Args('data')
    data: CreatePostInput,
  ) {
    return this.postsService.createPost(data);
  }

  @Mutation(() => PostEntity)
  async updatePost(
    @Args({
      name: 'id',
      type: () => Int,
    })
    id: number,

    @Args('data')
    data: UpdatePostInput,
  ) {
    return this.postsService.updatePost(id, data);
  }

  @Mutation(() => Boolean)
  async deletePost(
    @Args({
      name: 'id',
      type: () => Int,
    })
    id: number,
  ) {
    return this.postsService.deletePost(id);
  }

  @ResolveField(() => [CommentEntity], { name: 'comments' })
  async getPostComments(
    @Parent() post: PostEntity,
    @Args('options', {
      nullable: true,
    })
    options: FindCommentOptionsInput,
  ) {
    return (
      post.comments ||
      (await this.postCommentsService.getPostComments(post, options))
    );
  }

  @ResolveField(() => UserEntity, { name: 'author' })
  async getPostAuthor(@Parent() post: PostEntity) {
    return this.postAuthorsService.getPostAuthor(post);
  }

  @Query(() => PostsAndCountSchema, {
    name: 'postsAndCountWithComments',
  })
  async findAndCountWithComments(
    @Args('options')
    options: FindPostOptionsInput,
  ) {
    return this.postsService.findAndCountWithComments(options);
  }
}
