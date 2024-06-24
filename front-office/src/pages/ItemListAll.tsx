import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { HOST_IP } from '../config';
import ItemCardList from '../components/ItemCardList';

const ItemList: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [itemsSet, setItemsSet] = useState<any[]>([]);
  const [itemsTop, setItemsTop] = useState<any[]>([]);
  const [itemsBottom, setItemsBottom] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // ローディング状態を管理する

  useEffect(() => {
    const getItemsAsync = async () => {
      try {
        const [responseSet, responseTop, responseBottom] = await Promise.all([
          axios.get(`http://${HOST_IP}:8080/ec-202404c/items/set`),
          axios.get(`http://${HOST_IP}:8080/ec-202404c/items/top`),
          axios.get(`http://${HOST_IP}:8080/ec-202404c/items/bottom`),
        ]);

        setItemsSet(responseSet.data.items);
        setItemsTop(responseTop.data.items);
        setItemsBottom(responseBottom.data.items);
        setLoading(false); // データ取得完了後にローディング状態をfalseにする
      } catch (error) {
        console.error('Error fetching items:', error);
        setLoading(false); // エラー発生時もローディング状態をfalseにする
        // エラー処理を追加する
      }
    };

    getItemsAsync();
  }, []);

  // ローディング中は何も表示しない
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ width: "100%" }}>
      <div>
        {/* <Navbar /> */}
        <div className="flex flex-col gap-8">
          <ItemCardList items={itemsSet} />
          <ItemCardList items={itemsTop} />
          <ItemCardList items={itemsBottom} />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ItemList;
