import React from 'react';
import { Link } from "react-router-dom";
import { HOST_IP } from '../config';

interface ItemProps {
  item: any;
}

const Item: React.FC<ItemProps> = ({ item }) => {
  const handleCardClick = () => {
    // プログラム的に遷移を実行する方法
  };

  return (
    <Link to={`/item/${item.id}`} className="relative max-w-[19%] rounded overflow-hidden shadow-lg m-4 border-2 border-gray-300 transition ease-out duration-500 hover:border-gray-600 hover:shadow-lg group block">
      <img className="w-full h-auto object-cover" src={`http://${HOST_IP}:9090/img/` + item.imagePath} alt={item.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{item.name}</div>
        <p className="text-gray-700 text-base">
          <span className="price">М</span>&nbsp;&nbsp;{item.price}円(税抜)
        </p>
        {/* Detailボタンを削除 */}
      </div>
      <div className="py-6"></div> {/* 下部の余白を保持 */}
      <button onClick={handleCardClick} className="transform -translate-x-1/2 translate-y-0 w-[60%] h-[10%] rounded-[0.5rem] bg-gray-600 hover:bg-gray-800 text-white text-[1rem] py-2 px-4 absolute left-1/2 bottom-4 opacity-0 transition ease-out duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        Show Detail
      </button>
    </Link>
  );
};

export default Item;
