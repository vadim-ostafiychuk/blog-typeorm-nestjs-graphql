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
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

function mapKeysToLowerCase(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      result[key.toLowerCase()] = obj[key];
    }
  }
  return result;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        port: +configService.getOrThrow('DATABASE_PORT'),
        host: configService.getOrThrow('DATABASE_HOST'),
        username: configService.getOrThrow('DATABASE_USERNAME'),
        password: configService.getOrThrow('DATABASE_PASSWORD'),
        database: configService.getOrThrow('DATABASE_NAME'),
        logger: 'advanced-console',
        logging: true,
        synchronize: false,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    PostsModule,
    UsersModule,
    CommentsModule,
    PostCommentsModule,
    PostAuthorsModule,
    AuthModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [AuthModule],
      useFactory: async (authService: AuthService) => ({
        autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
        cache: 'bounded',
        context: async (context) => {
          let newContext = context;

          if (context?.extra?.request) {
            const headers = mapKeysToLowerCase({
              ...context?.extra?.request?.headers,
              ...context?.connectionParams,
            });

            newContext = {
              ...context,
              req: {
                ...context?.req,
                ...context?.extra?.request,
                headers,
              },
            };
          }

          const bearerHeader = newContext?.req?.headers?.authorization;

          if (bearerHeader) {
            const token = bearerHeader.split(' ');
            if (token && token[1]) {
              newContext.user = await authService.getUserByToken(token[1]);
            }
          }

          return newContext;
        },
        introspection: true,
        plugins: [],
      }),
      inject: [AuthService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
