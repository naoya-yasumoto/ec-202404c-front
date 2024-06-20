import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);  

  // const cartItems = [
  //   {
  //     id: 1,
  //     name: 'じゃがバターベーコン',
  //     size: 'L',
  //     price: 2380,
  //     quantity: 1,
  //     imagePath: '../static/img_pizza/1.jpg',
  //     subtotal: 3280,
  //   },
  //   {
  //     id: 2,
  //     name: 'じゃがバターベーコン',
  //     size: 'L',
  //     price: 2380,
  //     quantity: 1,
  //     imagePath: '../static/img_pizza/1.jpg',
  //     subtotal: 3280,
  //   },
  //   {
  //     id: 3,
  //     name: 'じゃがバターベーコン',
  //     size: 'L',
  //     price: 2380,
  //     quantity: 1,
  //     imagePath: '../static/img_pizza/1.jpg',
  //     subtotal: 3280,
  //   },
  // ];

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://192.168.16.175:8080/ec-202404c/cart/1'); // 仮のAPIエンドポイント
        setCartItems(response.data);
        // console.log(response.data.itemList);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  if (!cartItems || cartItems.length === 0) {
    return <div>Loading or no items in cart...</div>;
  }

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
          {/* {cartItems.itemList[1]}
          <ul>
        {cartItems.itemList.map((cartItem, index) => (
          <li key={index}>
            <h3>Item ID: {cartItem.item.id}</h3>
            <p>Name: {cartItem.item.name}</p>
            <p>Description: {cartItem.item.description}</p>
            <p>Price: {cartItem.item.price}</p>
            <p>Quantity: {cartItem.quantity}</p>
            <p>Size: {cartItem.size}</p>
          </li>
        ))}
      </ul> */}
          <tbody>
           {cartItems.itemList.map((cartItem) => (
              <tr key={cartItem.item.id}>
                <td>
                  <div className="has-text-centered">
                    <figure className="image is-128x128">
                      <img src={"http://192.168.16.175:9090/img/"+cartItem.item.imagePath} alt={cartItem.item.name} />
                    </figure>
                    {cartItem.item.name}
                  </div>
                </td>
                <td className="has-text-centered">
                  <span className="price">&nbsp;{cartItem.item.size}</span>&nbsp;&nbsp;{cartItem.item.price}円&nbsp;&nbsp;{cartItem.item.quantity}個
                </td>
                <td className="has-text-centered">
                  {cartItem.item.subtotal}円
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
