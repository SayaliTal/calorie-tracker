import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuantumController } from './quantum.controller';
import { QuantumCalorieService } from './quantum-calorie.service';
import { Calorie } from '../calorie/calorie.entity';
import { User } from '../user/user.entity';
import { UserActivity } from '../user-activity/user-activity.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Calorie, User, UserActivity]),
  ],
  controllers: [QuantumController],
  providers: [QuantumCalorieService],
  exports: [QuantumCalorieService],
})
export class QuantumModule {} 