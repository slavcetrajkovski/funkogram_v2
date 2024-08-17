import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ToastMessageProps {
    message: string;
    duration?: number;
    onClose: () => void;
    error: boolean;
}

export default function ToastMessage({ message, duration, onClose, error }: ToastMessageProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    if (!isVisible) return null;

    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-funkogram_red text-white py-4 px-6 rounded-xl shadow-xl flex items-center space-x-3">
                <span className="text-2xl">{message}</span>
                <FontAwesomeIcon
                    icon={error ? faTimesCircle as IconProp : faCheckCircle as IconProp}
                    className={`text-3xl ${error ? 'text-red-500' : 'text-green-500'}`}
                />
            </div>
        </div>,
        document.body
    );
}
