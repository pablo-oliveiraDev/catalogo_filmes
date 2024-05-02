import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT || 5080;
    //Pipes
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );
    const config = new DocumentBuilder().setTitle('Catálogo de Filmes').setDescription('API para gerenciar um catálogo de filmes').setVersion('1.0').addBearerAuth().build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
    await app.listen(port, () => console.log(`Iniciada aplicação na porta ${port}!`));
}
bootstrap();
