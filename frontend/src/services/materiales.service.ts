export interface Material {
  id: number;
  nombre: string;
  categoria: string;
  enStock: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'; 

export const materialesService = {
  async obtenerTodos(): Promise<Material[]> {
    try {
      const response = await fetch(`${API_URL}/api/materiales`, {
        cache: 'no-store',
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status} al cargar materiales`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching materiales:', error);
      return []; 
    }
  },

  async toggleStock(id: number, nuevoEstado: boolean): Promise<Material> {
    const response = await fetch(`${API_URL}/api/materiales/${id}/toggle`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ enStock: nuevoEstado }),
    });

    if (!response.ok) {
      throw new Error('Error al actualizar el stock');
    }
    
    return await response.json();
  }
};