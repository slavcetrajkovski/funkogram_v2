"use client"

import {useEffect, useState} from "react";
import {getUser} from "@/service/UserService";
import LayoutAuthenticated from "@/components/user/LayoutAuthenticated";

export default function UserDetails() {
    const [content, setContent] = useState(null);

    useEffect(() => {
        const fetchContent = async () => {
            const user = await getUser();
             setContent(user);
        }

        fetchContent();
    }, []);



    return (
        <LayoutAuthenticated>
            <div>
                <h1>User</h1>
                {content && (
                    <p>{content}</p>
                )}
            </div>
        </LayoutAuthenticated>
    )
}

