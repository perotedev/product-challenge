import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // enable cors
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // all subdomains
  app.enableCors({
    origin: /^(https:\/\/([^\.]*\.)?example\.com)$/i,
  });

  // http or https
  app.enableCors({
    origin: /https?:\/\/(([^/]+\.)?example\.com)$/i,
  });

  await app.listen(4040);
}
bootstrap();
