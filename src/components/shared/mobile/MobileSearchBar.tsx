"use client"

import React, {ChangeEvent, KeyboardEvent, Suspense, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {useRouter} from "next/navigation";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

export default function MobileSearchBar() {
    const [searchValue, setSearchValue] = useState('');
    const router = useRouter();

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    const handleSearch = () => {
        router.replace(`/catalog?searchFilter=${searchValue}&page=0`);
        setSearchValue('');
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
            <div className="md:hidden flex justify-center mt-4">
                <input
                    type="text"
                    placeholder="Пребарај"
                    className="w-96 h-10 px-4 py-2 rounded-tl-3xl rounded-bl-3xl bg-white text-black"
                    value={searchValue}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                />
                <FontAwesomeIcon
                    icon={faSearch as IconProp}
                    className="h-6 bg-yellow-700 px-4 py-2 rounded-tr-3xl rounded-br-3xl cursor-pointer"
                    onClick={handleSearch}
                />
            </div>
    );
}
