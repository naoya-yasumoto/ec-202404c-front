import React, { useState, useEffect } from "react";
import axios from "axios";
import { getAccessToken } from "../utils/authUtils";
import Footer from "../components/layout/Footer";
import { HOST_IP } from "../config";
import ItemCardList from "../components/ItemCardList";
import PreviewSetList from "../components/PreviewSetList";
import Loading from "../components/layout/Loading";
import Carousel from "../components/Carousel";

const Favorite: React.FC = () => {
  const [itemsFavorite, setItemsFavorite] = useState<any[]>([]);
  const [itemsPreview, setItemsPreview] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [triangleDirection, setTriangleDirection] = useState<"down" | "up">(
    "down"
  );
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  const toggleCartVisibility = () => {
    setIsCartVisible(!isCartVisible);
    setTriangleDirection(triangleDirection === "down" ? "up" : "down");
  };

  const handleImageClick = (imagePath: string) => {
    setSelectedImage(`http://${HOST_IP}:9090/img/` + imagePath);
  };

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
              <p className="text-3xl">お気に入り一覧</p>
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
              {isCartVisible && (
                <>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      className="text-md font-light text-blue-gray-800 mt-2"
                      style={{ width: "70%" }}
                    >
                      ＊プレビューモードでは、お気に入りに登録したセット、
                      <br />
                      またはトップス・ボトムスに紐づくセットをプレビューで選択することができます
                    </div>
                  </div>
                  <div className="relative mt-3">
                    {selectedImage && (
                      <div className="absolute inset-0 flex justify-center items-center">
                        <img
                          src={selectedImage}
                          alt="Selected"
                          className="z-50"
                          style={{
                            maxWidth: "73%",
                            maxHeight: "73%",
                            position: "absolute",
                            top: "59%",
                            left: "59%",
                            transform: "translate(-50%, -50%)",
                          }}
                        />
                      </div>
                    )}
                    <Carousel />
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      className="text-xl font-semibold text-blue-gray-700 pt-6"
                      style={{ width: "70%" }}
                    >
                      クリックしてプレビューするセットを入れ替える
                    </div>
                  </div>
                  <div className="pb-3">
                    <PreviewSetList
                      items={itemsPreview}
                      onImageClick={handleImageClick}
                    />
                  </div>
                </>
              )}
              <hr className="mt-6" />
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="text-2xl font-semibold" style={{ width: "70%" }}>
                お気に入りに登録されたすべてのアイテム
              </div>
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
