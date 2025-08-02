import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '../auth/auth.module';
import { CalorieModule } from '../calorie/calorie.module';
import { UserModule } from '../user/user.module';
import { UserActivityModule } from '../user-activity/user-activity.module';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Calorie } from 'src/calorie/calorie.entity';
import { UserActivity } from '../user-activity/user-activity.entity';
import { SessionMiddleware } from './session.middleware';
import { CalorieController } from 'src/calorie/calorie.controller';
import { UserActivityController } from '../user-activity/user-activity.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: process.env.DB_NAME,
      entities: [User, Calorie, UserActivity],
      synchronize: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRATION,
      },
    }),
    TypeOrmModule.forFeature([User]),
    AuthModule,
    CalorieModule,
    UserModule,
    UserActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes(CalorieController, UserActivityController);
  }
}

