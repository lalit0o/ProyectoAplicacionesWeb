import Articulo from '@/components/Articulo';
import { createWriteStream } from 'node:fs';
import { create } from 'zustand'


interface Articulo {
    id: number;
    titulo: string;
    descripcion: string;
    precio: number;
    imagenUrl?: string;
    enStock: boolean;
    categoria?: string;
    categoriaId?: number;
}

interface Carrito extends Articulo {
    cantidad: number;
}


type Store = {
    carrito: Carrito[];
    modalOpen: boolean;
    modalError: boolean;
    setModalOpen: (value: boolean) => void;
    setModalError: (value: boolean) => void;
    agregarAlCarrito: (producto: Articulo) => void;
    eliminarDelCarrito: (id: number) => void;
    disminuirDelCarrito: (id: number) => void;
    aumentarDelCarrito: (id: number) => void;
    vaciarCarrito: () => void;
    actualizarCantidad: (id: number, cantidad: number) => void;

}


export const useCartStore = create<Store>()((set, get) => ({

    actualizarCantidad: (id, cantidad) => {
        set((state) => ({ carrito: state.carrito.map((articulo) => articulo.id === id ? { ...articulo, cantidad } : articulo) }))
    },

    vaciarCarrito: () => set({ carrito: [] }),
    carrito: [],
    modalOpen: false,
    modalError: false,
    modalInicio: false,

    setModalOpen: (value) => {
        set({ modalOpen: value })
    },

    setModalError: (value) => {
        set({ modalError: value })
    },


    agregarAlCarrito: (producto) => {
        const carrito = get().carrito;

        const existe = carrito.find(art => art.id === producto.id);
        if (existe) {
            set({
                carrito: carrito.map(item =>
                    item.id === producto.id
                        ? { ...item, cantidad: item.cantidad + 1 }
                        : item
                )
            });
        }
        else {
            set({
                carrito: [...carrito, { ...producto, cantidad: 1 }]
            })
        }



    },

    eliminarDelCarrito: (id) => {
        set((state) => ({
            carrito: state.carrito.filter((item) => item.id !== id)
        }));
    },

    disminuirDelCarrito: (id) => {


        const carrito = get().carrito;

        const articulo = carrito.find(item => item.id === id);

        if (!articulo) {
            return;

        }

        if (articulo.cantidad === 1) {
            get().eliminarDelCarrito(id);
        }
        else {
            set({
                carrito: carrito.map(item =>
                    item.id === id
                        ? { ...item, cantidad: item.cantidad - 1 }
                        : item
                )
            })
        }
    },

    aumentarDelCarrito: (id) => {
        const carrito = get().carrito;

        const articulo = carrito.find(item => item.id === id);

        if (!articulo) return;

        set({
            carrito: carrito.map(item =>
                item.id === id
                    ? { ...item, cantidad: item.cantidad - 1 }
                    : item
            )
        })
    }

}))