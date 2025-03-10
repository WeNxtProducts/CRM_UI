// components/ui/custom-toast.tsx
import { toast as sonnerToast } from "sonner";

type ToastPosition =
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";

// Default export for easier imports
const toast = {
    /**
     * Display a success toast notification
     * @param message The message to display
     * @param duration Duration in milliseconds
     * @param position Position of the toast
     */
    success: (message: string, duration = 3000, position: ToastPosition = "top-right") => {
        return sonnerToast.success(message, {
            duration,
            position,
        });
    },

    /**
     * Display an error toast notification
     * @param message The message to display
     * @param duration Duration in milliseconds
     * @param position Position of the toast
     */
    error: (message: string, duration = 3000, position: ToastPosition = "top-right") => {
        return sonnerToast.error(message, {
            duration,
            position,
        });
    },

    /**
     * Display a warning toast notification
     * @param message The message to display
     * @param duration Duration in milliseconds
     * @param position Position of the toast
     */
    warning: (message: string, duration = 3000, position: ToastPosition = "top-right") => {
        return sonnerToast.warning(message, {
            duration,
            position,
        });
    },

    /**
     * Display an info toast notification
     * @param message The message to display
     * @param duration Duration in milliseconds
     * @param position Position of the toast
     */
    info: (message: string, duration = 3000, position: ToastPosition = "top-right") => {
        return sonnerToast.info(message, {
            duration,
            position,
        });
    },

    /**
     * Display a custom toast notification for delete operations
     * @param message The message to display
     * @param duration Duration in milliseconds
     * @param position Position of the toast
     */
    delete: (message: string, duration = 3000, position: ToastPosition = "top-right") => {
        return sonnerToast.error(message, {
            duration,
            position,
            className: "delete-toast",
        });
    }
};

export default toast;