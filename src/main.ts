import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: [process.env.COOKIE_SESSION_SECRET]
  }))

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true // set the white list to true to execlude the unspecified properties
  }))
  await app.listen(process.env.PORT);
}
bootstrap();
