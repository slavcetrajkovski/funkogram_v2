"use client";

import React, {useState} from 'react';
import OrdersList from "@/components/user/account/OrdersList";
import AccountInformation from "@/components/user/account/AccountInformation";
import AccountSidebar from "@/components/user/account/AccountSidebar";

export default function AccountPage() {
    const [view, setView] = useState<'info' | 'orders'>('info');

    return (
        <>
            <div className="container mx-auto mt-8 p-4 flex">
                <div className="w-1/4 mr-4">
                    <AccountSidebar setView={setView} />
                </div>

                <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
                    {view === 'info' && <AccountInformation/>}
                    {view === 'orders' && <OrdersList/>}
                </div>
            </div>
        </>
    );
}