import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Image from "next/image";

// Definimos la interfaz con términos del taller
interface Product {
  id: number;
  name: string;
  variants: string; 
  category: string; 
  price: string; 
  status: "Entregado" | "Pendiente" | "Cancelado"; 
  image: string; 
}

// Mock data adaptado a Kyanite
const tableData: Product[] = [
  {
    id: 1,
    name: "Cadena Amatista",
    variants: "Alambre Dorado 22",
    category: "Collar",
    price: "$850.00",
    status: "Entregado",
    image: "/images/product/amatista.jpg", // Asegúrate de tener estas imágenes
  },
  {
    id: 2,
    name: "Anillo Luna y Estrella",
    variants: "Plata 925",
    category: "Anillo",
    price: "$450.00",
    status: "Pendiente",
    image: "/images/product/anillo-luna.jpg",
  },
  {
    id: 3,
    name: "Pulsera Cuarzo Rosa",
    variants: "Ajustable",
    category: "Pulsera",
    price: "$320.00",
    status: "Entregado",
    image: "/images/product/cuarzo.jpg",
  },
  {
    id: 4,
    name: "Set Ojo de Tigre",
    variants: "Collar + Aretes",
    category: "Set",
    price: "$1,200.00",
    status: "Cancelado",
    image: "/images/product/set-tigre.jpg",
  },
];

export default function RecentOrders() {
  return (
    <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white px-4 pb-3 pt-4 sm:px-6 shadow-sm">
      <div className="flex flex-col gap-2 mb-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-serif font-semibold text-zinc-900">
            Pedidos Recientes
          </h3>
          <p className="text-sm text-zinc-500 mt-1">Últimas órdenes ingresadas a la tienda.</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 shadow-sm hover:bg-zinc-50 hover:text-zinc-900 transition-colors">
            <svg
              className="stroke-current fill-transparent"
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2.29004 5.90393H17.7067" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17.7075 14.0961H2.29085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z" strokeWidth="1.5" />
              <path d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z" strokeWidth="1.5" />
            </svg>
            Filtrar
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-zinc-800 transition-colors">
            Ver todos
          </button>
        </div>
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-zinc-200 border-y bg-zinc-50/50">
            <TableRow>
              <TableCell isHeader className="py-3 font-medium text-zinc-500 text-start text-xs uppercase tracking-wider">
                Joya
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-zinc-500 text-start text-xs uppercase tracking-wider">
                Categoría
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-zinc-500 text-start text-xs uppercase tracking-wider">
                Total
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-zinc-500 text-start text-xs uppercase tracking-wider">
                Estado
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-zinc-100">
            {tableData.map((product) => (
              <TableRow key={product.id} className="hover:bg-zinc-50/50 transition-colors">
                <TableCell className="py-4">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 overflow-hidden rounded-md border border-zinc-200 bg-zinc-100 flex-shrink-0">
                      {/* Nota: si no tienes las imágenes reales aún, Image fallará. Puedes usar un div gris temporal si es necesario */}
                      <Image
                        width={48}
                        height={48}
                        src={product.image}
                        className="h-full w-full object-cover"
                        alt={product.name}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-zinc-900 text-sm">
                        {product.name}
                      </p>
                      <span className="text-zinc-500 text-xs">
                        {product.variants}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-4 text-zinc-600 text-sm">
                  {product.category}
                </TableCell>
                <TableCell className="py-4 font-medium text-zinc-900 text-sm">
                  {product.price}
                </TableCell>
                <TableCell className="py-4 text-sm">
                  <Badge
                    size="sm"
                    color={
                      product.status === "Entregado"
                        ? "success"
                        : product.status === "Pendiente"
                        ? "warning"
                        : "error"
                    }
                  >
                    {product.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}