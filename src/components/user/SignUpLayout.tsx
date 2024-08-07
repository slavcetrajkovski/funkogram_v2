"use client"

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { signup } from "@/service/UserService";
import Image from "next/image"; 

export default function SignUpLayout() {
    const router = useRouter();

    const [state, setState] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (state.password !== state.confirmPassword) {
            setError("Лозинките не се совпаѓаат!");
            return;
        }

        try {
            setError(null);
            const response = await signup({
                username: state.username,
                email: state.email,
                password: state.password
            });
            setState({
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            });
            alert("User registered successfully");
            router.push("/signin");
        } catch (error) {
            console.error("Error during signup", error);
            alert("Failed to register user");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 rounded-lg shadow-lg text-black">
            <div className="flex justify-center mb-6">
                <Image
                    src="/funkogram-logo.png"
                    alt="Logo"
                    width={150}
                    height={150}
                />
            </div>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Корисничко име</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={state.username}
                        onChange={handleChange}
                        placeholder="Корисничко име"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-funkogram_red focus:border-funkogram_red sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Е-меил</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={state.email}
                        onChange={handleChange}
                        placeholder="Е-меил"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-funkogram_red focus:border-funkogram_red sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Лозинка</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={state.password}
                        onChange={handleChange}
                        placeholder="Лозинка"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-funkogram_red focus:border-funkogram_red sm:text-sm"
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Потврди лозинка</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={state.confirmPassword}
                        onChange={handleChange}
                        placeholder="Потврди лозинка"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-funkogram_red focus:border-funkogram_red sm:text-sm"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-funkogram_red text-white font-semibold rounded-md shadow-sm hover:bg-yellow-700 hover:text-funkogram_red focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Креирај профил
                </button>
            </form>
        </div>
    );
}
