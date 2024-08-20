import React from 'react';

export default function LoggedInMenu({ firstName }: { firstName: string }) {

    const handleLogout = () => {
        localStorage.removeItem("token");
        
        window.location.reload();
    };

    return (
        <div className="relative">
            <div className="absolute -right-24 mt-4 py-2 px-4 w-48 bg-white rounded-lg shadow-xl z-20">
                <p className="px-4 py-2 text-gray-700 font-bold">Добредојдовте, <span className="text-funkogram_red">{firstName}</span></p>
                <a href="/user/account" className="block py-2 text-white bg-funkogram_red rounded-full text-center font-bold hover:bg-red-700 transition">
                    Види профил
                </a>
                <button onClick={handleLogout} className="block mt-2 py-2 w-full text-white bg-funkogram_red rounded-full text-center font-bold hover:bg-red-700 transition">
                    Одјави се
                </button>
            </div>
        </div>
    );
}
