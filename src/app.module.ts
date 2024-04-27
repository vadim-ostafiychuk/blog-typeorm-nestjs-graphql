import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './modules/posts/posts.module';
import { UsersModule } from './modules/users/users.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { CommentsModule } from './modules/comments/comments.module';
import { PostCommentsModule } from './modules/post-comments/post-comments.module';
import { PostAuthorsModule } from './modules/post-authors/post-authors.module';
import * as path from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'blog',
      logger: 'advanced-console',
      logging: true,
      synchronize: true,
      autoLoadEntities: true,
    }),
    PostsModule,
    UsersModule,
    CommentsModule,
    PostCommentsModule,
    PostAuthorsModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [],
      useFactory: async () => ({
        autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
        cache: 'bounded',
        introspection: true,
        plugins: [],
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
