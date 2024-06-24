import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { HOST_IP } from '../config';
import ItemCardList from '../components/ItemCardList';

const ItemList: React.FC = () => {
  const { type } = useParams<{ type: string }>(); // useParamsの型指定
  const [itemsSet, setItemsSet] = useState<any[]>([]); // setアイテムのステート
  const [itemsTop, setItemsTop] = useState<any[]>([]); // topアイテムのステート
  const [itemsBottom, setItemsBottom] = useState<any[]>([]); // bottomアイテムのステート

  useEffect(() => {
    const getItemsAsync = async () => {
      try {
        // 各タイプの商品を取得するためのリクエストを並行して送信する
        const [responseSet, responseTop, responseBottom] = await Promise.all([
          axios.get(`http://${HOST_IP}:8080/ec-202404c/items/set`),
          axios.get(`http://${HOST_IP}:8080/ec-202404c/items/top`),
          axios.get(`http://${HOST_IP}:8080/ec-202404c/items/bottom`),
        ]);

        // レスポンスから商品リストをセットする
        setItemsSet(responseSet.data.items);
        setItemsTop(responseTop.data.items);
        setItemsBottom(responseBottom.data.items);
      } catch (error) {
        console.error('Error fetching items:', error);
        // エラー処理を追加することも考慮する
      }
    };

    getItemsAsync();
  }, []);

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
