import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { HOST_IP } from '../config';
import ItemCardList from '../components/ItemCardList';

const ItemListAll: React.FC = () => {
  const { type } = useParams<{ type: string }>(); // useParamsの型指定
  const [items, setItems] = useState<any[]>([]); // itemsの型指定

  useEffect(() => {
    const getItemsAsync = async () => {
      try {
        const response = await axios.get(`http://${HOST_IP}:8080/ec-202404c/items/${type}`);
        setItems(response.data.items);
      } catch (error) {
        console.error('Error fetching items:', error);
        // エラー処理を追加することも考慮する
      }
    };

    getItemsAsync();
  }, [type]);

  return (
    <div style={{ width: "100%" }}>
      <div>
        {/* <Navbar /> */}
        {type === 'set' && <ItemCardList items={items} />} {/* "set"の場合 */}
        {type === 'top' && <ItemCardList items={items} />} {/* "top"の場合 */}
        {type === 'bottom' && <ItemCardList items={items} />} {/* "bottom"の場合 */}
        <Footer />
      </div>
    </div>
  );
};

export default ItemListAll;
