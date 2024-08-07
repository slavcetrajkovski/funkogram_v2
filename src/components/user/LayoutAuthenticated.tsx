import {ReactNode, useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import { getProfile } from "@/service/UserService";

type LayoutAuthenticatedProps = {
    children: ReactNode;
};

export default function LayoutAuthenticated({ children }: LayoutAuthenticatedProps) {
    const [profile, setProfile] = useState(null)
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const fetchProfile = await getProfile();
                setProfile(fetchProfile);
            } catch (error) {
                console.error("Error fetching profile:", error);
                router.push("/signin");
            }
        };

        fetchProfile();
    }, [router]);

    const logout = () => {
        localStorage.removeItem("token");
        router.push("/");
    };

    return (
        <div>
            <div>
                <p>Signed in as: {profile}</p>
                <div><button onClick={logout}>Log out</button></div>
            </div>
            {children}
        </div>
    );
}
