import React, { useState, useEffect } from 'react';
import Item from '../components/Item';
import axios from 'axios';
import Navbar from '../components/layout/Navbar';
import SearchForm from '../components/SearchForm';


const ItemList: React.FC = () => {

  const [items, setItems] = useState([]);

  useEffect(() => {
    const getChatsAsync = async () => {
        const response = await axios.get('http://192.168.16.130:8080/ec-202404c/items/set'); 
        // console.log("response", response.data.items);
        setItems(response.data.items[0]);
    }
    getChatsAsync();
}, [])

  return (
    <div style={{width:"100%"}}>
      <div className="container">
        <Navbar />
        <SearchForm />
        <div className="columns is-multiline is-centered">
          {items.map((item, index) => (
            <Item key={index} item={item} />
              
          ))}
        </div>
      </div>
    </div>
  )
};

export default ItemList;
