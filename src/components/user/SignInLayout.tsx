"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { signin } from "@/service/UserService";
import Image from "next/image";
import Spinner from "../shared/Spinner";

export default function SignInLayout() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingScreen, setLoadingScreen] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingScreen(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(async () => {
      try {
        setError(null);
        const response = await signin(state);
        localStorage.setItem("token", response.token);
        window.location.href = '/catalog'
      } catch (error) {
        console.error("Error during signin", error);
        setError("Е-меилот и лозинката не се совпаѓаат");
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  if(loadingScreen) {
    return <Spinner  position={`mt-10`} />
  }

  return (
    <div className="min-h-screen overflow-hidden bg-yellow-700 mt-10">
      <div className="max-w-sm sm:max-w-md mx-auto p-4 sm:p-6 rounded-lg shadow-lg text-black bg-white">
      <div className="flex justify-center mb-4 sm:mb-4">
        <Image src="/funkogram-logo.png" alt="Logo" width={150} height={150} />
      </div>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Е-меил
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={state.email}
            onChange={handleChange}
            placeholder="Е-меил"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-funkogram_red focus:border-funkogram_red sm:text-sm"
            disabled={loading}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Лозинка
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={state.password}
            onChange={handleChange}
            placeholder="Лозинка"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-funkogram_red focus:border-funkogram_red sm:text-sm"
            disabled={loading}
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 bg-funkogram_red text-white font-semibold rounded-md shadow-sm hover:bg-yellow-700 hover:text-funkogram_red focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={loading}
        >
          {loading ? <Spinner /> : "Логирај се"}
        </button>
        <p className="text-sm text-gray-500">
          Немате кориснички профил? <a href="/signup" className="font-medium text-funkogram_red hover:underline">Креирај профил</a>
        </p>
      </form>
    </div>
    </div>
  );
}
