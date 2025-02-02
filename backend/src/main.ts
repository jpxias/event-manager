import { NestFactory } from '@nestjs/core';
import * as passport from 'passport';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(passport.initialize());

  app.enableCors({
    origin: true
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
