import React from 'react';

interface ItemProps {
  item: any;
}

const Item: React.FC<ItemProps> = ({ item }) => (
  <div className="column is-one-third">
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={"http://192.168.16.130:9090/img/jaket11.png"} alt={item.name} />
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
          {/* <br /> */}
          {/* <span className="price">Ｌ</span>&nbsp;&nbsp;{item.priceL}円(税抜) */}
        </div>
      </div>
    </div>
  </div>
);

export default Item;
