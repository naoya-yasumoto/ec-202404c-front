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
          // navigate('/login');
          setShowModal(true);
          return;
        }

        const userInfo = decodeToken(token);
        if (!userInfo) {
          // navigate('/login');
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
    <div className="container">
      <h3 className="title has-text-centered">ショッピングカート</h3>
      <div className="table-container">
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <th className="has-text-centered">商品名</th>
              <th className="has-text-centered">サイズ、価格(税抜)、数量</th>
              <th className="has-text-centered">小計</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((cartItem, index) => (
              <CartItem key={index} cartItem={cartItem} onDelete={handleDelete} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="has-text-centered">
        <div className="is-size-4">消費税：<Price amount={tax.toFixed(0)}/>円</div>
        <div className="is-size-4">ご注文金額合計：{(totalPrice + tax).toFixed(0)}円 (税込)</div>
      </div>
      <div className="columns is-centered">
        <div className="column is-3">
          <button className="button is-warning is-fullwidth" onClick={handleProceedToOrder}>注文に進む</button>
        </div>
      </div>
      <LoginModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default Cart;
