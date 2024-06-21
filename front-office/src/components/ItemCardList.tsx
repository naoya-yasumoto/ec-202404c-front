import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Item from '../components/Item';
import axios from 'axios';
import { HOST_IP } from '../config';

const ItemCardList: React.FC = () => {
  const { type } = useParams();
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(`http://${HOST_IP}:8080/ec-202404c/items/${type}`);
        setItems(response.data.items);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };
    fetchItems();
  }, [type]);

  // 現在のページのアイテムを取得
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // ページネーションのためのページ変更ハンドラ
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div style={{ width: '100%' }}>
      <div className="columns is-multiline" style={{ display: 'flex', justifyContent: 'center' }}>
        {currentItems.map((item, index) => (
          <Item key={index} item={item} />
        ))}
      </div>
      {/* ページネーションの表示 */}
      <nav aria-label="Pagination">
        <ul className="pagination">
          {items.length > itemsPerPage &&
            Array.from({ length: Math.ceil(items.length / itemsPerPage) }, (_, index) => (
              <li key={index} className={currentPage === index + 1 ? 'active' : ''}>
                <button className="pagination-link" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default ItemCardList;
