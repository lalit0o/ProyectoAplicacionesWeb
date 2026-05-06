import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MaterialesService {
  constructor(private prisma: PrismaService) {}

  async obtenerTodos() {
 
    return this.prisma.material.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async toggleStock(id: number, enStock: boolean) {
 
    return this.prisma.material.update({
      where: { id },
      data: { enStock },
    });
  }
}