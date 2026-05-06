'use server'

import { materialesService } from '@/services/materiales.service';
import { revalidatePath } from 'next/cache'

export async function toggleStock(id: number, estadoActual: boolean) {
   
    await materialesService.toggleStock(id, !estadoActual)
    try{
        revalidatePath('/admin/materiales')
    } catch (error) {
        console.error("Error al intentar cambiar el stock:", error)
        
    }
}