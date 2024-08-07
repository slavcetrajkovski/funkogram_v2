"use client"

import {useRouter} from "next/navigation";
import {ChangeEvent, FormEvent, useState} from "react";
import {signin} from "@/service/UserService";
import Layout from "@/components/user/Layout";
import Image from "next/image";

export default function SignInLayout() {
    const router = useRouter();

    const [state, setState] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            setError(null);
            const response = await signin(state);
            localStorage.setItem("token", response.token);
            router.push("/user");
        } catch (error) {
            console.error("Error during signin", error);
            setError("Bad credentials");
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg text-black">
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
                <button
                    type="submit"
                    className="w-full py-2 px-4 bg-funkogram_red text-white font-semibold rounded-md shadow-sm hover:bg-yellow-700 hover:text-funkogram_red focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    Логирај се
                </button>
            </form>
        </div>
    );
}
