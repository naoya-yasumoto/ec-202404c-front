// src/pages/NotFound.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getAccessToken, decodeToken } from '../utils/authUtils';
import Footer from '../components/layout/Footer';
import { HOST_IP } from '../config';
import ItemCardList from '../components/ItemCardList';


const Favorite: React.FC = () => {

    const [itemsFavorite, setItemsFavorite] = useState<any[]>([]);
    const [itemsPreview, setItemsPreview] = useState<any[]>([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const getFavoriteAsync = async () => {
          const token = getAccessToken();
          if (!token) { 
            console.log("not found token")
            return 
            } 
          const response = await axios.get(`http://${HOST_IP}:8080/ec-202404c/favorites`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response)
          setItemsFavorite(response.data.items);

          const response2 = await axios.get(`http://${HOST_IP}:8080/ec-202404c/favorites/forpreview`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response2)
          setItemsPreview(response2.data.items);
          setLoading(false);
        };
        getFavoriteAsync();
      }, []);

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
                <ItemCardList items={itemsFavorite} />
                <ItemCardList items={itemsPreview} />
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default Favorite;
