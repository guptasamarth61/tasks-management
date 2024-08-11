import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task/task.entity';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.DATABASE_URL || 'mongodb://localhost:27017/tasks',
      entities: [Task],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Task]),
    AuthModule,
  ],
  controllers: [TaskController, AuthController],
  providers: [TaskService, JwtStrategy],
})
export class AppModule {}