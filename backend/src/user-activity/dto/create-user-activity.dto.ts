import { IsEnum, IsDateString, IsOptional, IsNumber, IsString, Min, Max } from 'class-validator';
import { ActivityType } from '../user-activity.entity';

export class CreateUserActivityDto {
  @IsEnum(ActivityType)
  activityType: ActivityType;

  @IsOptional()
  @IsString()
  description?: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;

  @IsOptional()
  @IsNumber()
  @Min(20)
  @Max(300)
  userWeightAtStart?: number; // in kg

  @IsOptional()
  @IsNumber()
  @Min(100)
  @Max(250)
  userHeightAtStart?: number; // in cm

  @IsOptional()
  @IsNumber()
  @Min(0)
  distance?: number; // in km

  @IsOptional()
  @IsNumber()
  @Min(0)
  duration?: number; // in minutes
} 