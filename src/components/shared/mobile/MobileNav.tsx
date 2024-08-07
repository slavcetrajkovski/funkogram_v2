"use client"

import React, {Suspense} from "react";
import {useRouter} from "next/navigation";

export default function MobileNav() {
    const router = useRouter();

    const handleNavigation = (path: string) => {
        router.push(path);
    }

    return (
        <nav className="bg-funkogram_red lg:hidden">
            <div className="mx-auto px-4">
                <div className="flex flex-col my-4 h-full uppercase">
                    <a onClick={() => handleNavigation("/catalog?productStatus=NEW_ARRIVAL")}
                       className="hover:text-yellow-700 px-3 py-4 rounded-md font-bold">
                        Што е ново?
                    </a>
                    <a onClick={() => handleNavigation("/catalog")}
                       className="hover:text-yellow-700 px-3 py-4 rounded-md font-bold">
                        Каталог
                    </a>
                    <a onClick={() => handleNavigation("/catalog?productStatus=AVAILABLE_RIGHT_AWAY")}
                       className="hover:text-yellow-700 px-3 py-2 rounded-md font-bold">
                        Веднаш достапни
                    </a>
                    <a onClick={() => handleNavigation("/catalog?productStatus=PREORDER")}
                       className="hover:text-yellow-700 px-3 py-4 rounded-md font-bold">
                        Наскоро
                    </a>
                </div>
            </div>
        </nav>
    )
}