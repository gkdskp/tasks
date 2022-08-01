import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GraphQLLoggerMiddleware } from './common/middlewares/graphql-logger.middleware';
import { UserModule } from './user/user.module';
import { createUserLoader } from './user/user.loader';
import { UserService } from './user/user.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "myapp",
      entities: [__dirname + '../../dist/**/*.entity.js']
    }),

    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      inject: [UserService],
      imports: [UserModule],
      useFactory: (userService: UserService) => ({
        debug: true,
        playground: true,
        typePaths: ['./**/*.graphql'],
        definitions: {
          path: join(process.cwd(), 'src/graphql.ts'),
        },
        context: () => ({
          userLoader: createUserLoader(userService)
        })
      })
    }),

    TaskModule, UserModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(GraphQLLoggerMiddleware)
      .forRoutes({
        path: 'graphql',
        method: RequestMethod.POST
      });
  }
}
