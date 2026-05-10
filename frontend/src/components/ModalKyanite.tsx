import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    variant?: "anuncio" | "formulario";
    titulo?: string;
}

export default function ModalKyanite({ open, onClose, children, variant = "anuncio", titulo }: Props) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
           
            <div 
                className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
                onClick={onClose} 
            />
            
            <div className={`
                relative w-full bg-white rounded-2xl shadow-2xl p-8 z-10
                animate-in fade-in zoom-in-95 duration-200 w-full max-w-[450px]
                ${variant === "anuncio" ? "max-w-sm text-left" : "max-w-sm text-left"}
            `}>
                
                
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 rounded-full"
                >
                    <X className="h-5 w-5" />
                </Button>

             
                {titulo && (
                    <h2 className={`mb-4 ${
                        variant === "anuncio" 
                        ? "font-serif text-2xl text-zinc-900" 
                        : "font-sans text-xl font-bold text-zinc-800"
                    }`}>
                        {titulo}
                    </h2>
                )}

        
                <div className="mt-2">
                    {children}
                </div>

                
                {variant === "anuncio" && (
                    <div className="mt-8">
                        <Button 
                            onClick={onClose}
                            className="w-full bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border border-zinc-200 rounded-xl py-6"
                        >
                            Seguir viendo piezas
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}