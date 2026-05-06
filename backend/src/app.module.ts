import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { MaterialesModule } from './materiales/materiales.module';

@Module({
  imports: [PrismaModule, AuthModule, MaterialesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
