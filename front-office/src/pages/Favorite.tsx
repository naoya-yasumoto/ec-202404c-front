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
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [triangleDirection, setTriangleDirection] = useState<"down" | "up">(
    "down"
  );

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

  // クリック時に表示・非表示を切り替える関数
  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
    setTriangleDirection(triangleDirection === "down" ? "up" : "down");
  };

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
          <div className="flex flex-col">
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
              className="mt-6"
            >
              <p>お気に入り一覧</p>
            </div>

            <div className="container mx-auto p-4 flex justify-center flex-col">
              <div
                className="flex items-center justify-center cursor-pointer bg-blue-gray-500 text-white p-2 rounded hover:underline mx-40 hover:bg-blue-gray-600"
                onClick={toggleCartVisibility}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 mr-1 transition-transform transform ${
                    isCartVisible ? "rotate-180" : "rotate-0"
                  }`}
                  viewBox="0 0 11 10"
                  fill="currentColor"
                  onClick={toggleCartVisibility}
                >
                  <path
                    d="M0 0H10.9091L5.45455 9.27272L0 0ZM1.64063 0.937503L5.45455 7.42329L9.26847 0.937503H1.64063Z"
                    fill="currentColor"
                  />
                </svg>
                <span className="text-center">プレビューモードを展開</span>
              </div>
              <div className='mt-3'>{isCartVisible && <Carousel />}</div>
              <div className='mt-3'>{isCartVisible && <ItemCardList items={itemsPreview} />}</div>
            <hr className='mt-6'/>
            </div>
            <ItemCardList items={itemsFavorite} />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Favorite;
