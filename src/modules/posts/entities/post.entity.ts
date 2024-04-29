import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CommentEntity } from 'src/modules/comments/entities/comment.entity';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity('posts')
export class PostEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column({
    type: 'text',
  })
  description: string;

  @Field()
  @Column()
  authorId: number;

  @ManyToOne(() => UserEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    nullable: false,
  })
  author: UserEntity;

  @OneToMany(() => CommentEntity, (commentEntity) => commentEntity.post)
  comments: CommentEntity[];
}
