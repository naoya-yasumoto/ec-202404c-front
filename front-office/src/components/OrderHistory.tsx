import React, { useState, useEffect } from "react";
import axios from "axios";
import { HOST_IP } from "../config";
import CartItem from '../components/CartItem';
import { getAccessToken, decodeToken } from "../utils/authUtils";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = getAccessToken();
        const userInfo = decodeToken(token);
        const response = await axios.post(`http://${HOST_IP}:8080/ec-202404c/history`, { userId: userInfo?.userid });
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("注文履歴の取得に失敗しました。", error);
      }
    };

    fetchOrders();
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  return (
    <div style={{ width: "100%", padding: "0 40px" }}>
      <div className="flex justify-center">
        <div style={{ width: "65%", marginTop: "20px", marginBottom: "20px" }}>
          <div className="font-poiret text-4xl font-bold mb-4">注文履歴</div>
          {currentOrders.length === 0 && (
            <div className="flex justify-center my-20">
              注文履歴が見つかりませんでした。
            </div>
          )}
        </div>
      </div>
      <div className="columns is-multiline" style={{ justifyContent: "center" }}>
        {currentOrders.map((order, index) => (
          <div key={index} className="card mb-4" style={{ width: "80%", margin: "10px 0" }}>
            <div className="card-content">
              <p><strong>注文日:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
              <p><strong>配送日:</strong> {new Date(order.deliveryDate).toLocaleDateString()}</p>
              <div>
                <strong>アイテム:</strong>
                <ul>
                  {order.itemList.map((item, idx) => (
                    <CartItem key={idx} cartItem={item} onDelete={() => {}} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      <nav className="flex items-center gap-4 justify-center mt-4 mb-8">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 ${currentPage === 1 ? "disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" : ""}`}
          type="button"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
          </svg>
          Previous
        </button>
        <div className="flex items-center gap-2">
          {Array.from({ length: Math.ceil(orders.length / ordersPerPage) }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase transition-all hover:bg-gray-900/10 active:bg-gray-900/20 ${currentPage === index + 1 ? "bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none" : "text-gray-900"}`}
              type="button"
            >
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                {index + 1}
              </span>
            </button>
          ))}
        </div>
        <button
          disabled={currentPage === Math.ceil(orders.length / ordersPerPage)}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 ${currentPage === Math.ceil(orders.length / ordersPerPage) ? "disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" : ""}`}
          type="button"
        >
          Next
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" aria-hidden="true" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"></path>
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default OrderHistory;
