import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Apply global exception filter
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Enable CORS for production
  app.enableCors({
    origin:
      process.env.NODE_ENV === 'production'
        ? [process.env.FRONTEND_URL || 'http://localhost:3000']
        : true,
    credentials: true,
  });

  // API prefix for all backend routes
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`🚀 Application is running on: http://localhost:${port}`);
  console.log(
    `📊 Database URL: ${process.env.DATABASE_URL ? 'Connected' : 'Not configured'}`,
  );
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
}
bootstrap().catch((error) => {
  console.error('Application failed to start:', error);
  process.exit(1);
});
