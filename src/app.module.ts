import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { TeamsModule } from './teams/teams.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database/database.sqlite',
      entities: [User],
      synchronize: true,
    }),
    UsersModule,
    TeamsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
