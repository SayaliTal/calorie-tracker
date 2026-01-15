import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Query,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { UserActivityService } from './user-activity.service';
import { CreateUserActivityDto } from './dto/create-user-activity.dto';
import { GetUserActivityDto } from './dto/get-user-activity.dto';
import { CurrentUser } from '../app/current-user.decorator';
import { User } from '../user/user.entity';

@Controller('user-activity')
export class UserActivityController {
  constructor(private readonly userActivityService: UserActivityService) {}

  @Post()
  createActivity(
    @Body() createUserActivityDto: CreateUserActivityDto,
    @CurrentUser() user: User,
  ) {
    return this.userActivityService.createActivity(createUserActivityDto, user);
  }

  @Get()
  getActivities(
    @Query() getUserActivityDto: GetUserActivityDto,
    @CurrentUser() user: User,
  ) {
    return this.userActivityService.getActivities(getUserActivityDto, user);
  }

  @Get('by-day')
  getActivitiesByDay(
    @Query() getUserActivityDto: GetUserActivityDto,
    @CurrentUser() user: User,
  ) {
    return this.userActivityService.getActivitiesByDay(getUserActivityDto, user);
  }

  @Get('by-week')
  getActivitiesByWeek(
    @Query() getUserActivityDto: GetUserActivityDto,
    @CurrentUser() user: User,
  ) {
    return this.userActivityService.getActivitiesByWeek(getUserActivityDto, user);
  }

  @Get('calories-burned/by-day')
  getCaloriesBurnedByDay(
    @Query() getUserActivityDto: GetUserActivityDto,
    @CurrentUser() user: User,
  ) {
    return this.userActivityService.getCaloriesBurnedByDay(getUserActivityDto, user);
  }

  @Get('calories-burned/by-week')
  getCaloriesBurnedByWeek(
    @Query() getUserActivityDto: GetUserActivityDto,
    @CurrentUser() user: User,
  ) {
    return this.userActivityService.getCaloriesBurnedByWeek(getUserActivityDto, user);
  }

  @Put(':id')
  updateActivity(
    @Param('id', ParseIntPipe) id: number,
    @Body() update: any,
    @CurrentUser() user: User,
  ) {
    return this.userActivityService.updateActivity(id, user, update);
  }

  @Delete(':id')
  deleteActivity(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    return this.userActivityService.softDeleteActivity(id, user);
  }
} 