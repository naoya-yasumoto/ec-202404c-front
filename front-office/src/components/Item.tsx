import React from 'react';
import { Link } from "react-router-dom";
import { HOST_IP } from '../config';
import Price from './Price';

interface ItemProps {
  item: any;
}

const Item: React.FC<ItemProps> = ({ item }) => {
  console.log(item);
  const handleCardClick = () => {
    // プログラム的に遷移を実行する方法
  };

  return (
    <Link to={`/item/${item.id}`} className="relative max-w-[19%] rounded overflow-hidden shadow-lg m-4 border-2 border-gray-300 transition ease-out duration-500 hover:border-gray-600 hover:shadow-lg group block">
      <img className="w-full h-auto object-cover" src={`http://${HOST_IP}:9090/img/` + item.imagePath} alt={item.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{item.name}</div>
        <div className="text-gray-700 text-base">
          <div>M</div>
          <div className="inline-flex items-baseline">
            <Price amount={item.price}/>
            <span className="ml-1">(税抜)</span>
          </div>
        </div>
      </div>
      <div className="py-6"></div> {/* 下部の余白を保持 */}
      <button onClick={handleCardClick} className="transform -translate-x-1/2 translate-y-0 w-[57%] h-[8.5%] rounded-[0.6rem] bg-gray-600 hover:bg-gray-800 text-white text-[1rem] py-2 px-4 absolute left-1/2 bottom-4 opacity-0 transition ease-out duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        Show Detail
      </button>
    </Link>
  );
};

export default Item;
