import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PostEntity } from 'src/modules/posts/entities/post.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('comments')
export class CommentEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    type: 'text',
  })
  content: string;

  @Field(() => Int)
  @Column()
  authorId: number;

  @Field(() => Int)
  @Column()
  postId: number;

  @ManyToOne(() => PostEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  post: PostEntity;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  author: UserEntity;
}
