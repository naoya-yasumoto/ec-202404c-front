import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/layout/Footer';
import { HOST_IP } from '../config';
import ItemCardList from '../components/ItemCardList';

const ItemList: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  const [items, setItems] = useState<any[]>([]);


  useEffect(() => {
    const fetchItems = async () => {
      let url = `http://${HOST_IP}:8080/ec-202404c/items/${type}`;

      // Check if there are query parameters
      const queryParams = new URLSearchParams(location.search);
      const q = queryParams.get('q');
      
      if (q) {
        url += `?q=${encodeURIComponent(q)}`;
      }
      
      try {
        const response = await axios.get(url);
        console.log(url, response.data)
        setItems(response.data.items);
      } catch (error) {
        console.error('Error fetching items:', error);
        // Handle error as needed
      }
    };

    fetchItems();
  }, [type, location.search]);
  

  return (
    <div style={{width:"100%"}}>
      <ItemCardList items={items} />
      <Footer />
    </div>
  );
};

export default ItemList;
