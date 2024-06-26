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
  const [imagePosition, setImagePosition] = useState({ top: "59%", left: "59%" });

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

  const moveImageToClickPosition = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const isOutsideWidth = e.clientX - rect.left > 1000 || e.clientX - rect.left < 300;
    const isOutsideHeight = e.clientY - rect.top > 400 || e.clientY - rect.top < 210;
    if (isOutsideWidth || isOutsideHeight) {
      // If click is outside the Carousel width or height, reset position
      setImagePosition({ top: "59%", left: "59%" });
    } else {
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setImagePosition({ top: `${y}%`, left: `${x}%` });
    }
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
              className="mt-7"
            >
              <p className="text-3xl">お気に入り一覧</p>
            </div>

            <div className="container mx-auto p-4 flex justify-center flex-col">
              <div
                className="flex items-center justify-center cursor-pointer bg-teal-600 text-white p-2 rounded hover:underline mx-40 hover:bg-teal-800"
                onClick={toggleCartVisibility}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 mr-1 transition-transform transform ${isCartVisible ? "rotate-180" : "rotate-0"
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
                      animation: "rollDown 1.5s ease-out"
                    }}
                  >
                    <div
                      className="text-md font-normal text-blue-gray-800 mt-2"
                      style={{ width: "70%" }}
                    >
                      ＊プレビューモードでは、お気に入りに登録したセット、
                      <br />
                      またはトップス・ボトムスに紐づくセットをプレビューで選択することができます
                    </div>
                  </div>
                  <div
                    className="relative mt-3"
                    onClick={moveImageToClickPosition}
                    style={{ cursor: "pointer", animation: "rollDown 1s ease-out" }}
                  >
                    <div style={{ width: '60%', maxWidth: '900px', margin: '0 auto' }}>
                      {selectedImage && (
                        <div className="absolute inset-0 flex justify-center items-center">
                          <img
                            src={selectedImage}
                            alt="Selected"
                            className="z-50 transition-all duration-500"
                            style={{
                              maxWidth: "73%",
                              maxHeight: "73%",
                              position: "absolute",
                              top: imagePosition.top,
                              left: imagePosition.left,
                              transform: "translate(-50%, -50%)",
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              width: "120px",
                              height: "30px",
                              backgroundColor: "rgba(128, 128, 128, 0.1)",
                              borderRadius: "15px",
                              transform: "translateY(630%)",
                              top: imagePosition.top,
                              left: `calc(${imagePosition.left} - 55px)`,
                              zIndex: '40',
                            }}
                          ></div>
                        </div>

                      )}
                    </div>
                    <Carousel />
                  </div>
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                      animation: "rollDown 1s ease-out"
                    }}
                  >
                    <div
                      className="text-xl font-semibold text-blue-gray-700 pt-6"
                      style={{ width: "70%" }}
                    >
                      クリックしてプレビューするセットを入れ替える
                    </div>
                  </div>
                  <div className="pb-3" style={{ animation: "rollDown 1s ease-out" }}>
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
      <style jsx>{`
        @keyframes rollDown {
          0% {
            max-height: 0;
            opacity: 0;
          }
          100% {
            max-height: 100%;
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
};

export default Favorite;
