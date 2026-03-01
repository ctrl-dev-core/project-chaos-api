import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ResponseInterceptor } from './core/global/interceptor';
import { AllExceptionsFilter } from './core/global/filter';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT || 3000;
  const host = process.env.HOST || '0.0.0.0';
  const originFront = process.env.FRONTEND_URL || 'http://localhost:3030';

  // ? Cors configuration
  app.enableCors({
    origin: [originFront],
    credentials: true,
  });

  // ? Pipes for validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      stopAtFirstError: true,
      transform: true,
    }),
  );

  // ? Interceptor
  app.useGlobalInterceptors(new ResponseInterceptor());

  // ? Filter
  app.useGlobalFilters(new AllExceptionsFilter());

  // ? Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Project Chaos API')
    .setDescription(
      'API pública de materias de la carrera de Informática - Comunidad ctrl dev',
    )
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, host);
  console.info(`Application is running on http://${host}:${port}`);
  console.info(`Swagger documentation on http://${host}:${port}/docs`);
}
bootstrap().catch((err) => {
  const logger = new Logger('Bootstrap');
  logger.error('Error starting application', err);
  process.exit(1);
});
