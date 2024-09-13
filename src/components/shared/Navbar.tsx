"use client";

import React from 'react';
import MobileNav from "@/components/shared/mobile/MobileNav";
import { useRouter } from "next/navigation";

export default function Navbar({ isOpen }: { isOpen?: boolean }) {
    const router = useRouter();

    const handleNavigationStatus = (status: string) => {
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
                                        <a onClick={() => handleNavigationStatus("NEW_ARRIVAL")} className="hover:text-yellow-700 px-3 py-2 rounded-md font-bold cursor-pointer">
                                            Што е ново?
                                        </a>
                                        <a href="/catalog" className="hover:text-yellow-700 px-3 py-2 rounded-md font-bold cursor-pointer">
                                            Каталог
                                        </a>
                                        <a onClick={() => handleNavigationStatus("PREORDER")} className="hover:text-yellow-700 px-3 py-2 rounded-md font-bold cursor-pointer">
                                            Преднарачка
                                        </a>
                                        <a onClick={() => handleSearch("bitty pop")} className="hover:text-yellow-700 px-3 py-2 rounded-md font-bold cursor-pointer">
                                            Bitty POP!
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
