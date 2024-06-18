import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);  

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/api/cart'); // 仮のAPIエンドポイント
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  return (
    <div className="container">
      <Navbar />
      <h1 className="title">ショッピングカート</h1>
      <div className="columns is-multiline">
        {cartItems.map((item, index) => (
          <div key={index} className="column is-one-third">
            <div className="card">
              <div className="card-image">
                <figure className="image is-4by3">
                  <img src={item.imagePath} alt={item.name} />
                </figure>
              </div>
              <div className="card-content">
                <div className="media">
                  <div className="media-content">
                    <p className="title is-4">{item.name}</p>
                  </div>
                </div>
                <div className="content">
                  <p>{item.description}</p>
                  <p>価格: {item.price}円 (税抜)</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
