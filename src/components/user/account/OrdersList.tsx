import React, {useEffect, useState} from 'react';
import {OrderDto} from '@/model/order/OrderDto';
import {getUserOrderList} from '@/service/UserService';
import Spinner from '@/components/shared/Spinner';
import {formatDate} from '@/data/Mapper';
import Tile from '@/components/shared/Tile';
import Pagination from '@/components/shared/Pagination';
import {Page} from "@/model/Page";

const PAGE_SIZE = 7;

export default function OrdersList() {
    const [orders, setOrders] = useState<OrderDto[]>([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchUserOrderList = async (page: number) => {
        setLoading(true);
        try {
            const data: Page<OrderDto> = await getUserOrderList(page, PAGE_SIZE);
            setOrders(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching user orders", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserOrderList(currentPage);
    }, [currentPage]);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6 text-black">Нарачки ({orders.length})</h1>
            {loading ? (
                <Spinner/>
            ) : (
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    {orders.length === 0 ? (
                        <div className="p-6 text-center text-black font-bold">
                            <p>Сеуште немате направено нарачка.</p>
                        </div>
                    ) : (
                        <div>
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-white uppercase bg-funkogram_red">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Број</th>
                                    <th scope="col" className="px-6 py-3">Датум</th>
                                    <th scope="col" className="px-6 py-3">Статус</th>
                                    <th scope="col" className="px-6 py-3">Вкупно</th>
                                    <th scope="col" className="px-6 py-3">Акција</th>
                                </tr>
                                </thead>
                                <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="odd:bg-white even:bg-gray-50 border-b text-black">
                                        <td className="px-6 py-4">#{order.id}</td>
                                        <td className="px-6 py-4">{formatDate(order.orderDate)}</td>
                                        <td className="px-6 py-4">
                                            <Tile status={order.orderStatus} text={order.orderStatus}/>
                                        </td>
                                        <td className="px-6 py-4">{order.totalPrice} ден</td>
                                        <td className="px-6 py-4">
                                            <a href="#" className="font-medium text-funkogram_red hover:underline">Види</a>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div className="flex justify-center mt-4">
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={setCurrentPage}
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
