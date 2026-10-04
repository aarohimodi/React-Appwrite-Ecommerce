import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import orderService from "../appwrite/orderService";

function Orders() {
  const userData = useSelector((state) => state.auth.userData);
  const [order, setOrder] = useState([]);
  useEffect(() => {
    if (userData) {
      orderService.getOrders(userData.$id).then((res) => {
        if (res) {
          setOrder(res.rows);
        }
      });
    }
  }, [userData]);
  if (order.length === 0) {
    return <p className="p-6 text-center">No orders yet 😢</p>;
  }
  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      {order.map((orders) => {
        const items = JSON.parse(orders.items);
        return (
          <div
            key={orders.$id}
            className="border p-5 rounded-xl mb-5 shadow-md bg-white"
          >
            <p className="text-xs text-gray-400 mb-2">Order Id: {orders.$id}</p>
            <div className="mt-3 space-y-2">
              {items.map((item) => (
                <div key={item.$id} className="flex justify-between">
                  <p>
                    {item.title} x {item.quantity}
                  </p>
                  <p>₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>
            <hr className="my-3 border-gray-200" />

            <div className="flex justify-between items-center">
              <p className="text-gray-500 text-sm">Total</p>
              <p className="font-semibold text-lg text-indigo-600">
                {" "}
                ₹{orders.total}
              </p>
            </div>
            <p className="text-xs text-gray-400 mt-3">Delivery Address</p>
            <p className="text-sm text-gray-700">Address: {orders.address}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Orders;
