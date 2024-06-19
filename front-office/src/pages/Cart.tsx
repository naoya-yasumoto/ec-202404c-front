import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Cart: React.FC = () => {
  // const [cartItems, setCartItems] = useState<any[]>([]);  

  const cartItems = [
    {
      id: 1,
      name: 'じゃがバターベーコン',
      size: 'L',
      price: 2380,
      quantity: 1,
      imagePath: '../static/img_pizza/1.jpg',
      subtotal: 3280,
    },
    {
      id: 2,
      name: 'じゃがバターベーコン',
      size: 'L',
      price: 2380,
      quantity: 1,
      imagePath: '../static/img_pizza/1.jpg',
      subtotal: 3280,
    },
    {
      id: 3,
      name: 'じゃがバターベーコン',
      size: 'L',
      price: 2380,
      quantity: 1,
      imagePath: '../static/img_pizza/1.jpg',
      subtotal: 3280,
    },
  ];

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/api/cart'); // 仮のAPIエンドポイント
        // setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div className="container">
      <Navbar />
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
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="has-text-centered">
                    <figure className="image is-128x128">
                      <img src={item.imagePath} alt={item.name} />
                    </figure>
                    {item.name}
                  </div>
                </td>
                <td className="has-text-centered">
                  <span className="price">&nbsp;{item.size}</span>&nbsp;&nbsp;{item.price}円&nbsp;&nbsp;{item.quantity}個
                </td>
                <td className="has-text-centered">
                  {item.subtotal}円
                </td>
                <td className="has-text-centered">
                  <button className="button is-primary">削除</button>
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
