import React from 'react';
import { HOST_IP } from '../config';

interface CartItemProps {
  cartItem: any;
  onDelete: (orderItemId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ cartItem, onDelete }) => {
  return (
    <tr>
      <td>
        <div className="has-text-centered" style={{ maxWidth: "200px" }}>
          <figure className="image is-128x128">
            <img src={`http://${HOST_IP}:9090/img/${cartItem.item.imagePath}`} alt={cartItem.item.name} />
          </figure>
          {cartItem.item.name}
        </div>
      </td>
      <td className="has-text-centered">
        <span className="price">&nbsp;{cartItem.size}</span>&nbsp;&nbsp;{cartItem.item.price}円&nbsp;&nbsp;{cartItem.quantity}個
      </td>
      <td className="has-text-centered">
        {cartItem.item.price * cartItem.quantity}円
      </td>
      <td className="has-text-centered">
        <button className="button is-primary" onClick={() => onDelete(cartItem.id)}>削除</button>
      </td>
    </tr>
  );
};

export default CartItem;
