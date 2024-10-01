import {faCheckCircle, faClock, faXmarkCircle} from "@fortawesome/free-regular-svg-icons";

export const getStatusText = (status: string | undefined) => {
    switch (status) {
        case "NEW_ARRIVAL":
            return "НОВО";
        case "IN_STOCK":
            return "ДОСТАПНО";
        case "PREORDER":
            return "ПРЕДНАРАЧКА";
        case "AVAILABLE_RIGHT_AWAY":
            return "ВЕДНАШ ДОСТАПНО"
        case "SOLD_OUT":
            return "SOLD OUT";
        default:
            return status;
    }
};

export const getProductTypeText = (status: string | undefined) => {
    switch (status) {
        case "FUNKO_POP":
            return "Funko Pop";
        case "FUNKO_KEYCHAIN":
            return "Привезоци";
        case "BITTY_POP":
            return "Bitty Pop";
        case "COMIC":
            return "Стрипови"
        case "MANGA":
            return "Манга";
        case "SHIRT":
            return "Маици"
        default:
            return status;
    }
};

export const getStatusColor = (status: string | undefined) => {
    switch (status) {
        case "NEW_ARRIVAL":
            return "bg-teal-500";
        case "IN_STOCK":
            return "bg-indigo-500";
        case "PREORDER":
            return "bg-purple-500";
        case "AVAILABLE_RIGHT_AWAY":
            return "bg-green-500";
        case "SOLD_OUT":
            return "bg-red-500";
        default:
            return "bg-gray-500";
    }
};

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return "Invalid Date";
    }

    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    };

    return date.toLocaleDateString('mk-MK', options);
};

export const mapOrderStatus = (orderStatus: string) => {
    switch (orderStatus) {
        case "PENDING":
            return "ПРИМЕНА"
        case "CANCELED":
            return "ОТКАЖАНА"
        case "DELIVERED":
            return "ЗАВРШЕНА"
    }
}

export const getStatusStyles = (status: string) => {
    switch (status.toUpperCase()) {
        case 'CANCELED':
            return 'bg-red-500';
        case 'PENDING':
            return 'bg-orange-500';
        case 'DELIVERED':
            return 'bg-green-500';
        default:
            return 'bg-gray-300';
    }
};

export const getStatusIcon = (status: string) => {
    switch (status.toUpperCase()) {
        case 'CANCELED':
            return faXmarkCircle;
        case 'PENDING':
            return faClock;
        case 'DELIVERED':
            return faCheckCircle;
        default:
            return null;
    }
};

export const getCategoryStyle = (category: string) => {
    switch (category) {
        case "Marvel":
            return "bg-red-500";
        case "Exclusives":
            return "bg-yellow-500";
        case "Other":
            return "bg-gray-300";
        case "Television":
            return "bg-blue-500";
        case "Animation":
            return "bg-green-500";
        case "Movies":
            return "bg-purple-600";
        case "Disney":
            return "bg-pink-500";
        default:
            return "bg-gray-400";
    }
};

export const getProductStatusDesc = (status: string, isDeleted: boolean) => {
    switch(status) {
        case "NEW_ARRIVAL":
            return isDeleted ? "Фигурата е распродадена." : "Фигурата е нова и достапна за нарачка. Сите ново нарачани фигури ни пристигнуваат на почеток на секој следен месец.";
        case "IN_STOCK":
            return isDeleted ? "Фигурата е распродадена." : "Фигурата е достапна за нарачка. Сите ново нарачани фигури ни пристигнуваат на почеток на секој следен месец.";
        case "PREORDER":
            return isDeleted ? "Фигурата е распродадена." : "Фигурите со статус ПРЕДНАРАЧКА немаат точно определен датум на испорака, и датумот е подлежен на промени. За дополнителни информации, ве молиме контактирајте не на нашиот Инстаграм профил. Важно е да напоменеме дека овој тип на нарачка однапред се наплаќа.";
        case "AVAILABLE_RIGHT_AWAY":
            return isDeleted ? "Фигурата е распродадена." : "Фигурата е веднаш достапна.";
        default:
            return status;
    }
}