interface SelectProps {
    options: number[];
    value: number;
    onChange: (value: number) => void;
}

export default function DropdownPageSize(props: SelectProps) {
    const { options, value, onChange } = props;

    return (
        <div>
            <select
                value={value}
                onChange={(e) => onChange(Number(e.target.value))}
                className="pl-2 pr-3.5 py-2 text-base outline-none font-bold rounded-3xl"
            >
                {options.map(option => (
                    <option className="font-bold" key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}