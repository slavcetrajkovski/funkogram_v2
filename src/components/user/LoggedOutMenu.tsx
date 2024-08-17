import React from "react";

export default function LoggedOutMenu() {
  return (
    <div className="relative">
      <div className="absolute -right-24 mt-4 py-2 px-4 w-48 bg-white rounded-lg shadow-xl z-20">
        <p className="px-4 py-2 text-gray-700 font-bold">Добредојдовте</p>
        <a
          href="/signin"
          className="block py-2 text-white bg-funkogram_red rounded-full text-center font-bold hover:bg-red-700 transition"
        >
          Логирај се
        </a>
        <a
          href="/signup"
          className="block mt-2 py-2 text-white bg-funkogram_red rounded-full text-center font-bold hover:bg-red-700 transition"
        >
          Креирај профил
        </a>
      </div>
    </div>
  );
}
