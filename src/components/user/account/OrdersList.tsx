import {useEffect, useState} from "react";
import {OrderDto} from "@/model/order/OrderDto";
import {getUserOrderList} from "@/service/UserService";
import Spinner from "@/components/shared/Spinner";
import {formatDate} from "@/data/Mapper";
import Tile from "@/components/shared/Tile";

export default function OrdersList() {
    const [orders, setOrders] = useState<OrderDto[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserOrderList = async () => {
            setLoading(true);
            try {
                const userOrders = await getUserOrderList();
                setOrders(userOrders);
            } catch (error) {
                console.error("Error fetching user orders", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserOrderList();
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-black">Нарачки ({orders.length})</h1>
            {loading ? (
                <Spinner/>
            ) : (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-white uppercase bg-funkogram_red">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Број
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Датум
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Статус
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Вкупно
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Акција
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="odd:bg-white even:bg-gray-50 border-b text-black">
                                <td className="px-6 py-4">#{order.id}</td>
                                <td className="px-6 py-4">{formatDate(order.orderDate)}</td>
                                <td className="px-6 py-4">
                                    <Tile status={order.orderStatus}
                                          text={order.orderStatus}/>
                                </td>

                                <td className="px-6 py-4">{order.totalPrice} ден</td>

                                <td className="px-6 py-4">
                                        <a href="#" className="font-medium text-funkogram_red hover:underline">Види</a>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

            )}
        </div>
    );
}
