import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Item from '../components/Item';
import axios from 'axios';
import Navbar from '../components/Navbar';

const ItemDetail: React.FC = () => {

  const { id } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getChatsAsync = async () => {
      const response = await axios.get('http://192.168.16.130:8080/ec-202404c/items/set');
      console.log("response", response.data.items);
      setItems(response.data.items);
    }
    getChatsAsync();
  }, [])

  return (
    <div className="container">
      <Navbar />
      <form action="cart_list.html">
        <h3 className="title has-text-centered">商品詳細</h3>
        <div className="columns px-6">
          <div className="column is-half ">
            <figure className="image is-1by1" style={{ maxWidth: '200px', margin: '0 auto' }}>
              <img src="https://loosedrawing.com/assets/illustrations/png/1244.png" alt="じゃがバターベーコン"  />
            </figure>
          </div>
          <div className="column is-half">
            <div>
              <h4 className="title is-4">じゃがバターベーコン</h4>
              <p>
                マイルドな味付けのカレーに大きくカットしたポテトをのせた、バターとチーズの風味が食欲をそそるお子様でも楽しめる商品です。
              </p>
            </div>
          </div>
        </div>
        <div className="field  px-6">
          <label className="label">サイズ</label>
          <div className="control">
            <label className="radio">
              <input type="radio" name="size" defaultChecked />
              <span>&nbsp;М&nbsp;</span>&nbsp;&nbsp;1,380円(税抜)
            </label>
            <label className="radio">
              <input type="radio" name="size" />
              <span>&nbsp;Ｌ&nbsp;</span>&nbsp;&nbsp;2,380円(税抜)
            </label>
          </div>
        </div>
        <div className="field  px-6">
          <label className="label">数量</label>
          <div className="control">
            <div className="select">
              <select name="quantity">
                {[...Array(12)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="field  px-6">
          <p className="has-text-weight-bold">この商品金額：38,000 円(税抜)</p>
        </div>
        <div className="field  px-6">
          <div className="control">
            <button className="button is-warning is-fullwidth" type="submit">
              カートに入れる
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ItemDetail;
