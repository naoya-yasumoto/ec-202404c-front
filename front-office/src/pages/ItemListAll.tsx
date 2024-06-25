import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { HOST_IP } from '../config';
import ItemCardList from '../components/ItemCardList';

const ItemList: React.FC = () => {
  const [itemsSet, setItemsSet] = useState<any[]>([]);
  const [itemsTop, setItemsTop] = useState<any[]>([]);
  const [itemsBottom, setItemsBottom] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // ローディング状態を管理する

  useEffect(() => {
    const getItemsAsync = async () => {

      let url = `http://${HOST_IP}:8080/ec-202404c/items`;

      // Check if there are query parameters
      const queryParams = new URLSearchParams(location.search);
      const q = queryParams.get('q');

      try {
        const [responseSet, responseTop, responseBottom] = await Promise.all([
          axios.get(`${url}/set`+`?q=${encodeURIComponent(q?q:"")}`),
          axios.get(`${url}/top`+`?q=${encodeURIComponent(q?q:"")}`),
          axios.get(`${url}/bottom`+`?q=${encodeURIComponent(q?q:"")}`),
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
  }, [itemsSet, itemsTop, itemsBottom]);

  // ローディング中は何も表示しない
  if (loading) {
    return (
      <>
      <div style={{ width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <span className="loading loading-ring loading-lg"></span>
      <div className="text-3xl mt-2 font-josefin font-medium" style={{ display: 'flex' }}>
        <span className="animate-wave" style={{ animationDelay: '0.1s' }}>L</span>
        <span className="animate-wave" style={{ animationDelay: '0.2s' }}>o</span>
        <span className="animate-wave" style={{ animationDelay: '0.3s' }}>a</span>
        <span className="animate-wave" style={{ animationDelay: '0.4s' }}>d</span>
        <span className="animate-wave" style={{ animationDelay: '0.5s' }}>i</span>
        <span className="animate-wave" style={{ animationDelay: '0.6s' }}>n</span>
        <span className="animate-wave" style={{ animationDelay: '0.7s' }}>g</span>
      </div>
      <style>
        {`
          @keyframes wave {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
            }
          }

          .animate-wave {
            animation: wave 1s infinite;
          }
        `}
      </style>
    </div>
      </>
    );
  }

  return (
    <div style={{ width: "100%" }}>
      <div>
        {/* <Navbar /> */}
        <div className="flex flex-col gap-8">
          <ItemCardList items={itemsSet} type="set"/>
          <ItemCardList items={itemsTop} type="top"/>
          <ItemCardList items={itemsBottom} type="bottom"/>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ItemList;
