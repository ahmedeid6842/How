import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm"
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { JwtModule } from "@nestjs/jwt"
import { EmailModule } from './email/email.module';
import { FollowModule } from './follow/follow.module';
import { Follow } from './follow/follow.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'How',
    entities: [User, Follow],
    synchronize: process.env.NODE_ENV == 'development' ? true : false
  }),
  JwtModule.register({
    global: true,
    secret: "ThisIsMySecert",
    signOptions: { expiresIn: '60s' }
  }),
    AuthModule,
    EmailModule,
    FollowModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
