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