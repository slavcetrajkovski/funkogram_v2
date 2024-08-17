// components/shared/Tile.tsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {getStatusIcon, getStatusStyles, mapOrderStatus} from "@/data/Mapper";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

interface TileProps {
    status: string;
    text: string;
}

export default function Tile({ status, text }: TileProps) {
    const statusClass = getStatusStyles(status);
    const statusIcon = getStatusIcon(status);

    return (
        <div className={`p-2 w-32 rounded-lg font-semibold flex items-center ${statusClass}`}>
            {statusIcon && (
                <FontAwesomeIcon icon={statusIcon as IconProp} className="mr-2" />
            )}
            <p>{mapOrderStatus(text)}</p>
        </div>
    );
}
