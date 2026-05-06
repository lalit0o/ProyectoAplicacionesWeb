import { Module } from '@nestjs/common';
import { MaterialesController } from './materiales.controller';
import { MaterialesService } from './materiales.service';
import { PrismaModule } from '../prisma/prisma.module'; // Si tienes Prisma en su propio módulo

@Module({
  imports: [PrismaModule], // Borra esto si PrismaService es global
  controllers: [MaterialesController],
  providers: [MaterialesService],
})
export class MaterialesModule {}