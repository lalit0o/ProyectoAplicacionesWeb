'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function toggleStock(id: number, estadoActual: boolean) {
   
    await prisma.material.update({
        where: { id: id },
        data: { enStock: !estadoActual }
    })

    
    revalidatePath('/admin/materiales')
}