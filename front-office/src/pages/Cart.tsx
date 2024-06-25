import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HOST_IP } from '../config';
import CartItem from '../components/CartItem';
import { getAccessToken, decodeToken } from '../utils/authUtils';
import LoginModal from '../components/LoginModal';
import Price from '../components/Price';

export const getCartInfo = async (userId: number) => {
  try {
    const response = await axios.get(`http://${HOST_IP}:8080/ec-202404c/cart/user/${userId}`);
    return response.data.itemList;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }
};

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = getAccessToken();
        if (!token) {
          setShowModal(true);
          return;
        }

        const userInfo = decodeToken(token);
        if (!userInfo) {
          setShowModal(true);
          return;
        }
        const response = await axios.get(`http://${HOST_IP}:8080/ec-202404c/cart/user/${userInfo.userid}`);
        setCartItems(response.data.itemList);
        console.log(response.data);  // デバッグ用に追加
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleDelete = async (orderItemId: number) => {
    try {
      const token = getAccessToken();
      const userInfo = decodeToken(token);
      await axios.delete(`http://${HOST_IP}:8080/ec-202404c/cart/delete`, {
        data: {
          orderItemId: orderItemId,
          userId: userInfo?.userid
        }
      });
      setCartItems(prevItems => prevItems.filter(item => item.id !== orderItemId));
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const handleProceedToOrder = () => {
    navigate('/order_confirm');
  };

  const totalPrice = useMemo(() => {
    return (cartItems || []).reduce((total, cartItem) => total + (cartItem.item.price * cartItem.quantity), 0);
  }, [cartItems]);

  const tax = useMemo(() => {
    return totalPrice * 0.1;
  }, [totalPrice]);

  if (!cartItems || cartItems.length === 0) {
    return <div>Loading or no items in cart...</div>;
  }

  return (
    <>
      <div className="max-w-screen-2xl mx-auto my-3" style={{ width: '68%' }}>
        <h3 className="text-2xl font-medium text-center mb-6 my-10">ショッピングカート</h3>

        <div className="bg-gray-200 text-gray-600 p-2 flex items-center justify-between h-11 rounded-sm">
          <div style={{ width: '20.5%' }}></div>

          <div className="text-center w-1/4" style={{ marginRight: '30px' }}>
            <p className="py-2 px-4 font-oswald">商品名/サイズ</p>
          </div>

          <div className="text-center w-1/4" style={{ marginLeft: '5px' }}>
            <p className="py-2 px-4 font-oswald">価格(税抜)</p>
          </div>

          <div className="text-center w-1/4" style={{ marginLeft: '8px' }}>
            <p className="py-2 px-4 font-oswald">数量</p>
          </div>

          <div style={{ width: '28%' }}></div>
        </div>
        <hr className="border-gray-300" style={{ marginTop: '18px' }} />

        <div className="overflow-x-auto mb-6">
          {cartItems.map((cartItem, index) => (
            <CartItem key={index} cartItem={cartItem} onDelete={handleDelete} />
          ))}
        </div>

        <div className="flex flex-col items-end gap-4">
          <div className="w-full rounded-lg bg-gray-100 p-4 sm:max-w-xs">
            <div className="space-y-1">
              <div className="flex justify-between gap-4 text-gray-500">
                <span className="font-oswald">小計</span>
                <span className="font-oswald"><Price amount={totalPrice.toFixed(0)}/></span>
              </div>
              <div className="flex justify-between gap-4 text-gray-500">
                <span className="font-oswald">消費税</span>
                <Price amount={tax.toFixed(0)} /></div>
            </div>

            <div className="mt-4 border-t pt-4">
              <div className="flex items-start justify-between gap-4 text-gray-800">
                <span className="text-lg font-bold font-oswald">合計</span>
                <span className="flex flex-col items-end">
                  <span className="text-lg font-bold font-oswald"><Price amount={(totalPrice + tax).toFixed(0)} /></span>
                  <span className="text-sm text-gray-500">(税込)</span>
                </span>
              </div>
            </div>
          </div>
          <button
            className="inline-block rounded-lg bg-gray-800 hover:bg-gray-900 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 focus-visible:ring active:bg-gray-600 md:text-base"
            onClick={handleProceedToOrder}
          >
            注文に進む
          </button>
        </div>
      </div>
      <LoginModal show={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default Cart;
