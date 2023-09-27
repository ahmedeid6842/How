import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'How',
    entities: [User],
    synchronize: process.env.NODE_ENV == 'development' ? true : false
  }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
