import { useEffect, useState } from "react";
import { getUserDetails } from "@/service/UserService";
import { UserDto } from "@/model/user/UserDto";
import Spinner from "@/components/shared/Spinner";

export default function AccountInformation() {
    const [user, setUser] = useState<UserDto>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserDetails = async () => {
            setLoading(true);
            try {
                const userResponse = await getUserDetails();
                setUser(userResponse);
            } catch (error) {
                console.error("Error fetching user details");
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-black">Ваши информации</h1>
            <div className="space-y-4">
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <div>
                            <span className="text-lg font-semibold text-black">Име:</span>
                            <span className="ml-2 text-black">{user?.firstName}</span>
                        </div>
                        <div>
                            <span className="text-lg font-semibold text-black">Презиме:</span>
                            <span className="ml-2 text-black">{user?.lastName}</span>
                        </div>
                        <div>
                            <span className="text-lg font-semibold text-black">Е-меил:</span>
                            <span className="ml-2 text-black">{user?.email}</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
