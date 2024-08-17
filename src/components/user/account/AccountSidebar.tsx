"use client";

import React from 'react';

export default function AccountSidebar({ setView }: { setView: (view: 'orders' | 'info') => void }) {
    return (
            <div className="bg-white p-4 rounded-lg">
                <ul className="space-y-4">
                    <li>
                        <button
                            onClick={() => setView('info')}
                            className="text-black font-semibold text-lg w-full text-left cursor-pointer"
                        >
                            Детали
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setView('orders')}
                            className="text-black font-semibold text-lg w-full text-left cursor-pointer"
                        >
                            Мои нарачки
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => {
                                localStorage.removeItem('token');
                                window.location.href = '/signin';
                            }}
                            className="text-red-500 font-semibold text-lg w-full text-left cursor-pointer"
                        >
                            Одјава
                        </button>
                    </li>
                </ul>
            </div>
    );
}
