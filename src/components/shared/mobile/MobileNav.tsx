"use client"

import React from "react";
import {useRouter} from "next/navigation";

export default function MobileNav() {
    const router = useRouter();

    const handleNavigation = (status: string) => {
        const newParams = new URLSearchParams();
        newParams.set('productStatusFilter', status);
        router.push(`/catalog?${newParams.toString()}`);
    }

    const handleSearch = (value: string) => {
        const newParams = new URLSearchParams();
        newParams.set('searchFilter', value);
        router.push(`/catalog?${newParams.toString()}`);
    }

    return (
        <nav className="bg-funkogram_red lg:hidden">
            <div className="mx-auto px-4">
                <div className="flex flex-col my-4 h-full uppercase">
                    <a onClick={() => handleNavigation("NEW_ARRIVAL")}
                       className="hover:text-yellow-700 px-3 py-4 rounded-md font-bold">
                        Што е ново?
                    </a>
                    <a href="/catalog"
                       className="hover:text-yellow-700 px-3 py-4 rounded-md font-bold">
                        Каталог
                    </a>
                    {/*<a onClick={() => handleNavigation("AVAILABLE_RIGHT_AWAY")}*/}
                    {/*   className="hover:text-yellow-700 px-3 py-2 rounded-md font-bold">*/}
                    {/*    Веднаш достапни*/}
                    {/*</a>*/}
                    <a onClick={() => handleNavigation("PREORDER")}
                       className="hover:text-yellow-700 px-3 py-4 rounded-md font-bold">
                        Преднарачка
                    </a>
                    {/*<a className="hover:text-yellow-700 px-3 py-2 rounded-md font-bold cursor-pointer">*/}
                    {/*    Маици*/}
                    {/*</a>*/}
                    <a onClick={() => handleSearch("bitty pop")} className="hover:text-yellow-700 px-3 py-2 rounded-md font-bold cursor-pointer">
                        Bitty POP!
                    </a>
                </div>
            </div>
        </nav>
    )
}