import { forwardRef, useImperativeHandle, useRef, useEffect } from "react";
import ReactDOM from "react-dom";

const Dialog = forwardRef(({ isMapOpen, onClose, children }, ref) => {
    const dialogRef = useRef();

    // Allow parent to control the dialog (optional)
    useImperativeHandle(ref, () => ({
        open: () => dialogRef.current?.showModal(),
        close: () => dialogRef.current?.close(),
    }));

    useEffect(() => {
        const dialog = dialogRef.current;
        if (isMapOpen && dialog && !dialog.open) dialog.showModal();
        if (!isMapOpen && dialog?.open) dialog.close();
    }, [isMapOpen]);

    return ReactDOM.createPortal(
        <dialog
            ref={dialogRef}
            className="rounded-lg shadow-xl p-6 w-[300px]  backdrop:bg-black/40 md:w-[500px]"
            onClose={onClose}
        >
            {children}
        </dialog>,
        document.getElementById("modal-root")
    );
});

export default Dialog;
