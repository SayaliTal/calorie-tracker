import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserActivityController } from './user-activity.controller';
import { UserActivityService } from './user-activity.service';
import { UserActivity } from './user-activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserActivity])],
  controllers: [UserActivityController],
  providers: [UserActivityService],
  exports: [UserActivityService],
})
export class UserActivityModule {} 