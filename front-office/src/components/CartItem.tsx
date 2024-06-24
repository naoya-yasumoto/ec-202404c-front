import React from 'react';
import { HOST_IP } from '../config';

interface CartItemProps {
  cartItem: any;
  onDelete: (orderItemId: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ cartItem, onDelete }) => {
  return (
    <>
      <div className="flex items-center justify-between border-b border-gray-300 py-5">
        <div className="flex items-center space-x-4 w-1/4">
          <figure className="w-35 h-35">
            <img
              src={`http://${HOST_IP}:9090/img/${cartItem.item.imagePath}`}
              alt={cartItem.item.name}
              className="rounded-md"
            />
          </figure>
        </div>
        <div style={{ width: '20%', marginLeft:'10px'}}>
          <div className="block text-center text-2xl font-bold font-oswald" style={{ textAlign: 'left' }}>
            {cartItem.item.name}
          </div>
          <div className="text-center font-oswald" style={{ textAlign: 'left' }}>
            {`Size: `}<span className='font-semibold'>{`${cartItem.size}`}</span>
          </div>
        </div>

        <div className="text-center w-1/4 font-medium font-oswald"><span className="text-xl font-semibold">{(cartItem.item.price * cartItem.quantity).toFixed(0)}</span>円</div>
        <div className="text-center w-1/4 font-oswald"><span className='text-2xl font-semibold'>{`${cartItem.quantity}`}</span>個</div>

        <div className="text-center w-1/4">
          <a
            href="#_"
            className="inline-flex items-center px-6 py-3 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-600 hover:text-white"
            onClick={() => onDelete(cartItem.id)}
          >
            削除
          </a>
        </div>
      </div>
    </>
  );
};

export default CartItem;
