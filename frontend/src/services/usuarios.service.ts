// Se define la interfaz en base al schema de prisma
export interface Material {
  id: number;
  nombre: string;
  email: string;
  password: string;
  telefono?: string;
  rol: 'ADMIN' | 'CLIENTE';
}
 

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'; 

export const materialesService = {
    // 1. Obtener todos los materiales para mostrar en la tabla
  async obtenerTodos(): Promise<Material[]> {
    try {
      // Usamos cache: 'no-store' para que el admin siempre vea los datos más recientes
      const response = await fetch(`${API_URL}/api/materiales`, {
        cache: 'no-store',
      });
      
      if (!response.ok) throw new Error('Error al cargar materiales');
      return await response.json();
    } catch (error) {
      console.error('Error fetching materiales:', error);
      return []; // Devolvemos un arreglo vacío si falla para no romper la página
    }
  },

  // 2. Actualizar el stock (Para el Switch)
  async toggleStock(id: number, nuevoEstado: boolean): Promise<Material> {
    const response = await fetch(`${API_URL}/api/materiales/${id}/toggle`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ enStock: nuevoEstado }),
    });

    if (!response.ok) throw new Error('Error al actualizar el stock');
    return await response.json();
  }
};