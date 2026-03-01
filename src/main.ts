import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // ? Pipes for validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // ? Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('Project Chaos API')
    .setDescription(
      'API pública de materias de la carrera de Informática - Comunidad ctrl dev',
    )
    .setVersion('1.0')
    .addTag('subjects')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(3000);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap().catch((err) => {
  const logger = new Logger('Bootstrap');
  logger.error('Error starting application', err);
  process.exit(1);
});
