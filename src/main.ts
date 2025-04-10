import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from './common/pipes/validation.pipes';
import cors from 'cors';

async function bootstrap() {
  const port = process.env.PORT || 7000;
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    allowedHeaders: ['content-type', '*'],
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Игра "Путь к Победе"')
    .setDescription('Документация API')
    .setVersion('3.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(port, () => console.log(`Server started on port = ${port}`));
}
bootstrap();
