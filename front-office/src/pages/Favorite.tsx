// src/pages/NotFound.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAccessToken, decodeToken } from "../utils/authUtils";
import Footer from "../components/layout/Footer";
import { HOST_IP } from "../config";
import ItemCardList from "../components/ItemCardList";
import Loading from "../components/layout/Loading";
import Carousel from "../components/Carousel";

const Favorite: React.FC = () => {
  // お気に入りの商品単体
  // ボトム，トップ，セットがそのまま取得されている
  const [itemsFavorite, setItemsFavorite] = useState<any[]>([]);

  // 比較(プレビュー)用のデータ．お気に入りに登録したセットはそのまま取得されるが，ボトムやトップの場合は，そのidを持つセットが取得される
  const [itemsPreview, setItemsPreview] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFavoriteAsync = async () => {
      const token = getAccessToken();
      if (!token) {
        console.log("not found token");
        return;
      }
      const response = await axios.get(
        `http://${HOST_IP}:8080/ec-202404c/favorites`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      setItemsFavorite(response.data.items);

      const response2 = await axios.get(
        `http://${HOST_IP}:8080/ec-202404c/favorites/forpreview`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response2);
      setItemsPreview(response2.data.items);
      setLoading(false);
    };
    getFavoriteAsync();
  }, []);

  // ローディング中は何も表示しない
  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }
  return (
    <>
      <div style={{ width: "100%" }}>
        <div>
          <div className="flex flex-col gap-8">
            <div style={{ width:'100%' ,display:'flex', justifyContent:'center'}}>
              <p>お気に入り一覧</p>
            </div>


            <Carousel/>

            
            <ItemCardList items={itemsPreview} />
            <ItemCardList items={itemsFavorite} />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Favorite;
