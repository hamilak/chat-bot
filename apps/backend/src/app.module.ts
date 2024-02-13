import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

dotenvConfig({ path: '.env' });

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'frontend', 'dist'),
    }),
    ChatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
