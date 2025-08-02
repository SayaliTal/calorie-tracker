import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

export enum ActivityType {
  WALKING = 'walking',
  JOGGING = 'jogging',
  RUNNING = 'running',
  CYCLING = 'cycling',
  SWIMMING = 'swimming',
  WEIGHTLIFTING = 'weightlifting',
  YOGA = 'yoga',
  DANCING = 'dancing',
  GYM = 'gym',
  SPORTS = 'sports',
  OTHER = 'other',
}

@Entity()
export class UserActivity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.activities)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({
    type: 'enum',
    enum: ActivityType,
    default: ActivityType.OTHER,
  })
  activityType: ActivityType;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp' })
  endTime: Date;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  userWeightAtStart?: number; // in kg

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  userHeightAtStart?: number; // in cm

  @Column({ type: 'decimal', precision: 8, scale: 2, nullable: true })
  caloriesBurned?: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  distance?: number; // in km

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  duration?: number; // in minutes

  @Column({ default: false })
  deleted: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 