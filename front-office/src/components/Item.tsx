import React from 'react';
import { Link } from "react-router-dom";
import { HOST_IP } from '../config';

interface ItemProps {
  item: any;
}

const Item: React.FC<ItemProps> = ({ item }) => {
  console.log("aaaa" + item);
  return (
  <div className="column is-one-third">
    <div className="card">
      <div className="card-image">
        <figure className="image " style={{maxWidth:"150px"}}>
          <img src={`http://${HOST_IP}:9090/img/`+item.imagePath}alt={item.name} />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{item.name}</p>
          </div>
        </div>
        <div className="content">
          <span className="price">М</span>&nbsp;&nbsp;{item.price}円(税抜)
          <Link to={`/item/${item.id}`}>
                <button>detail</button>
          </Link>
          {/* <br /> */}
          {/* <span className="price">Ｌ</span>&nbsp;&nbsp;{item.priceL}円(税抜) */}
        </div>
      </div>
    </div>
  </div>
)};

export default Item;
