import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilterCircleXmark} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export default function ClearFilter({ onClear, position }: {onClear: () => void, position?: string}) {
    return (
        <>
            <FontAwesomeIcon onClick={onClear} className={`text-black ${position} h-6 cursor-pointer`} icon={faFilterCircleXmark as IconProp}/>
        </>
    )
}