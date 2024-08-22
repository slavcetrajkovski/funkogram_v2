import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface ToastMessageProps {
    message: string;
    duration?: number;
    onClose: () => void;
    error: boolean;
}

export default function ToastMessage({ message, duration = 3000, onClose, error }: ToastMessageProps) {
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
            <div className="bg-funkogram_red text-white py-3 px-5 rounded-xl shadow-xl flex items-center space-x-3 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-sm sm:text-base md:text-lg lg:text-xl">
                <span className="flex-grow">{message}</span>
                <FontAwesomeIcon
                    icon={error ? faTimesCircle as IconProp : faCheckCircle as IconProp}
                    className={`text-lg sm:text-xl md:text-2xl lg:text-3xl ${error ? 'text-red-500' : 'text-green-500'}`}
                />
            </div>
        </div>,
        document.body
    );
}
