import React, { useState, useEffect, useMemo, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { HOST_IP } from '../config';
import CartItem from '../components/CartItem';
import { getAccessToken, decodeToken } from '../utils/authUtils';
import LoginModal from '../components/LoginModal';
import Price from '../components/Price';
import { ECsiteContext } from "../contexts";
import EmptyCart from '../components/EmptyCart';

export const getCartInfo = async (userId: number) => {
  try {
    const response = await axios.get(`http://${HOST_IP}:8080/ec-202404c/cart/user/${userId}`);
    return response.data.itemList;
  } catch (error) {
    console.error('Error fetching cart items:', error);
    return [];
  }
};

export const CartTop: React.FC<{ cartItems: any[], handleDelete: (orderItemId: number) => void }> = ({ cartItems, handleDelete }) => {
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
      </div>
    </>
  );
};

export const CartBottom: React.FC<{ totalPrice: number, tax: number, handleProceedToOrder: () => void }> = ({ totalPrice, tax, handleProceedToOrder }) => {
  return (
    <div className="flex flex-col items-end gap-4" style={{ width: '84%' }}>
      <div className="w-full rounded-lg bg-gray-100 p-4 sm:max-w-xs">
        <div className="space-y-1">
          <div className="flex justify-between gap-4 text-gray-500">
            <span className="font-oswald">小計</span>
            <span className="font-oswald">{totalPrice.toFixed(0)}円</span>
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
        className="relative inline-block px-8 py-3 text-center text-sm font-semibold text-gray-600 bg-gray-100 border border-gray-100 rounded-lg shadow-inner overflow-hidden group"
        onClick={handleProceedToOrder}
      >
        <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
        <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
        <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
        <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
        <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
        <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">注文に進む</span>
      </button>

    </div>
  );
};

const Cart: React.FC = () => {
  // const [cartItems, setCartItems] = useState<any[]>([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { cartItems, setCartItems } = useContext(ECsiteContext);

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
    return <EmptyCart />; // カートが空の場合は EmptyCart コンポーネントを表示
  }

  return (
    <>
      <CartTop cartItems={cartItems} handleDelete={handleDelete} />
      <CartBottom totalPrice={totalPrice} tax={tax} handleProceedToOrder={handleProceedToOrder} />
      <LoginModal show={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default Cart;
