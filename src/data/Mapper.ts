export const getStatusText = (status: string | undefined) => {
    switch (status) {
        case "NEW_ARRIVAL":
            return "НОВО";
        case "IN_STOCK":
            return "ДОСТАПНО";
        case "PREORDER":
            return "НАСКОРО";
        case "AVAILABLE_RIGHT_AWAY":
            return "ВЕДНАШ ДОСТАПНО"
        default:
            return status;
    }
};

export const getStatusColor = (status: string | undefined) => {
    switch (status) {
        case "NEW_ARRIVAL":
            return "bg-blue-500";
        case "IN_STOCK":
            return "bg-green-500";
        case "PREORDER":
            return "bg-purple-500";
        case "AVAILABLE_RIGHT_AWAY":
            return "bg-green-500";
        default:
            return "";
    }
};