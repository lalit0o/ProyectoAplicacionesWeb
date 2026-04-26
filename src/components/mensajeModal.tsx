import { useCartStore } from "../store/useProductStore"


type Props = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

export default function MensajeModal({ open, onClose, children }: Props) {
    if (!open) return null;

    return (
        <div>
            {children}
            <button onClick={onClose}></button>

        </div>)

}