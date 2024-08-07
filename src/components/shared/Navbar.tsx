"use client"

import React from 'react';
import MobileNav from "@/components/shared/mobile/MobileNav";
import {useRouter} from "next/navigation";

export default function Navbar({ isOpen }: { isOpen?: boolean }) {
    const router = useRouter();

    const handleNavigation = (path: string) => {
        router.push(path);
    }

    return (
        <>
            {isOpen ? (
                <MobileNav />
            ) : (
                <nav className="bg-funkogram_red hidden lg:block">
                    <div>
                        <div className="flex items-center justify-between h-16">
                            <div className="flex items-center">
                                <div>
                                    <div className="ml-10 flex items-baseline space-x-6 uppercase">
                                        <a onClick={() => handleNavigation("/catalog?productStatus=NEW_ARRIVAL")} className="hover:text-yellow-700 px-3 py-2 rounded-md font-bold cursor-pointer">
                                            Што е ново?
                                        </a>
                                        <a onClick={() => handleNavigation("/catalog")} className="hover:text-yellow-700 px-3 py-2 rounded-md font-bold cursor-pointer">
                                            Каталог
                                        </a>
                                        <a onClick={() => handleNavigation("/catalog?productStatus=AVAILABLE_RIGHT_AWAY")} className="hover:text-yellow-700 px-3 py-2 rounded-md font-bold cursor-pointer">
                                            Веднаш достапни
                                        </a>
                                        <a onClick={() => handleNavigation("/catalog?productStatus=PREORDER")} className="hover:text-yellow-700 px-3 py-2 rounded-md font-bold cursor-pointer">
                                            Наскоро
                                        </a>
                                        <a className="hover:text-yellow-700 px-3 py-2 rounded-md font-bold cursor-pointer">
                                            Маици
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
}
