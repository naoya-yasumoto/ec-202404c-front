import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { HOST_IP } from '../config';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://${HOST_IP}:8080/ec-202404c/cart/user/2`); // 仮のAPIエンドポイント
        setCartItems(response.data.itemList);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  const handleDelete = async (orderItemId: number) => {
    try {
      await axios.delete(`http://${HOST_IP}:8080/ec-202404c/cart/delete`, {
        data: {
          orderItemId: orderItemId,
          userId: 1
        }
      });
      // Remove item from state after successful deletion
      setCartItems(prevItems => prevItems.filter(item => item.id !== orderItemId));
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

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
              <tr key={index}>
                <td>
                  <div className="has-text-centered" style={{ maxWidth: "200px" }}>
                    <figure className="image is-128x128">
                      <img src={`http://${HOST_IP}:9090/img/${cartItem.item.imagePath}`} alt={cartItem.item.name} />
                    </figure>
                    {cartItem.item.name}
                  </div>
                </td>
                <td className="has-text-centered">
                  <span className="price">&nbsp;{cartItem.size}</span>&nbsp;&nbsp;{cartItem.price}円&nbsp;&nbsp;{cartItem.quantity}個
                </td>
                <td className="has-text-centered">
                  {cartItem.id}円
                </td>
                <td className="has-text-centered">
                  <button className="button is-primary" onClick={() => handleDelete(cartItem.id)}>削除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="has-text-centered">
        <div className="is-size-4">消費税：8,000円</div>
        <div className="is-size-4">ご注文金額合計：38,000円 (税込)</div>
      </div>
      <div className="columns is-centered">
        <div className="column is-3">
          <form action="order_confirm.html">
            <button className="button is-warning is-fullwidth" type="submit">注文に進む</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;
