import { X } from "lucide-react"; // Importamos la 'X' para cerrar
import { Button } from "@/components/ui/button";

type Props = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    
}

export default function MensajeModal({ open, onClose, children }: Props) {
  
    if (!open) return null;

    return (
       
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all">
            
           
            <div className="relative w-full max-w-sm mx-4 bg-white rounded-xl shadow-2xl p-8 animate-in fade-in zoom-in-95 duration-200">
                
               
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-full"
                >
                    <X className="h-5 w-5" />
                    <span className="sr-only">Cerrar</span> 
                </Button>

             
                <div className="mt-2">
                    {children}
                </div>

                <div className="mt-8 flex justify-center">
                    <Button 
                        onClick={onClose}
                        className="w-full bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border border-zinc-200"
                    >
                        Seguir viendo piezas
                    </Button>
                </div>
                
            </div>
        </div>
    );
}