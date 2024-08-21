import {getStatusText} from "@/data/Mapper";

interface SelectProps {
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

export default function ProductStatusFilter(props: SelectProps) {
    const { options, value, onChange } = props;

    return (
        <div>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="pl-2 pr-3.5 py-2 text-base outline-none font-bold rounded-3xl"
            >
                <option className="font-bold" value="" disabled>
                    Достапност
                </option>
                {options.map(option => (
                    <option className="font-bold" key={option} value={option}>
                        {getStatusText(option)}
                    </option>
                ))}
            </select>
        </div>
    );
}