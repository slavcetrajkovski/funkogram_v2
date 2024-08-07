import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilterCircleXmark} from "@fortawesome/free-solid-svg-icons";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export default function ClearFilter({ onClear }: {onClear: () => void}) {
    return (
        <>
            <FontAwesomeIcon onClick={onClear} className="text-funkogram_red h-6 cursor-pointer" icon={faFilterCircleXmark as IconProp}/>
        </>
    )
}