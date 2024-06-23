import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Item from '../components/Item';
import axios from 'axios';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import SearchForm from '../components/SearchForm';
import { HOST_IP } from '../config';
import ItemCardList from '../components/ItemCardList'

const ItemList: React.FC = () => {
  const { type } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getChatsAsync = async () => {
        const response = await axios.get(`http://${HOST_IP}:8080/ec-202404c/items/${type}`); 
        setItems(response.data.items);
    }
    getChatsAsync();
}, [type])
  

  return (
    <div style={{width:"100%"}}>
      <div>
        {/* <Navbar /> */}
        <SearchForm />
        <ItemCardList />
        <Footer />
      </div>
    </div>
  )
};

export default ItemList;
