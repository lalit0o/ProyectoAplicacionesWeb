import { Controller, Get, Patch, Param, Body, ParseIntPipe } from '@nestjs/common';
import { MaterialesService } from './materiales.service';

@Controller('materiales') 
export class MaterialesController {
  constructor(private readonly materialesService: MaterialesService) {}

  @Get()
  async obtenerTodos() {
    return this.materialesService.obtenerTodos();
  }

 
  @Patch(':id/toggle')
  async toggleStock(
   
    @Param('id', ParseIntPipe) id: number, 
    @Body('enStock') enStock: boolean,
  ) {
    return this.materialesService.toggleStock(id, enStock);
  }
}