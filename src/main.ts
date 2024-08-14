import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DATA_DIR } from './constants';



async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    await app.listen(process.env.PORT || 8050);

    console.log(`Application is running on: ${await app.getUrl()}`);
    console.log(`Data is stored in: ${DATA_DIR}`);
}
bootstrap();
