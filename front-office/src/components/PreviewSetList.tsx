import React, { useState } from "react";
import { HOST_IP } from "../config";
import Price from "./Price";

interface ItemProps {
  item: any;
  onImageClick: (imagePath: string) => void;
}

const Item: React.FC<ItemProps> = ({ item, onImageClick }) => {
  const handleCardClick = () => {
    onImageClick(item.imagePath);
  };

  return (
    <div
      onClick={handleCardClick}
      className="relative max-w-[19%] rounded overflow-hidden shadow-lg m-4 border-2 border-gray-300 transition ease-out duration-500 hover:border-gray-600 hover:shadow-lg group block cursor-pointer"
    >
      <div className='bg-teal-100 m-1 mx-1 py-3 rounded-sm overflow-hidden'>
        <img
          className="w-full h-auto object-cover transform hover:scale-110 transition duration-300"
          src={`http://${HOST_IP}:9090/img/` + item.imagePath}
          alt={item.name}
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-md mb-2">{item.name}</div>
        <div className="text-gray-700 text-base">
          <div>size:M</div>
          <div className="inline-flex items-baseline text-sm">
            <Price amount={item.price} />
            <span className="ml-1">(税抜)</span>
          </div>
        </div>
      </div>
      <div className="py-6"></div> {/* 下部の余白を保持 */}
    </div>
  );
};

interface PreviewSetListProps {
  items: any[];
  onImageClick: (imagePath: string) => void;
}

const PreviewSetList: React.FC<PreviewSetListProps> = ({
  items,
  onImageClick,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div style={{ width: "100%" }}>
      <div className="flex flex-wrap justify-center">
        {currentItems.map((item, index) => (
          <Item key={index} item={item} onImageClick={onImageClick} />
        ))}
      </div>
      <nav className="flex items-center gap-4 justify-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className={`flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 ${
            currentPage === 1
              ? "disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              : ""
          }`}
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            ></path>
          </svg>
          Previous
        </button>
        <div className="flex items-center gap-2">
          {Array.from(
            { length: Math.ceil(items.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase transition-all hover:bg-gray-900/10 active:bg-gray-900/20 ${
                  currentPage === index + 1
                    ? "bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    : "text-gray-900"
                }`}
                type="button"
              >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                  {index + 1}
                </span>
              </button>
            )
          )}
        </div>
        <button
          disabled={currentPage === Math.ceil(items.length / itemsPerPage)}
          onClick={() => setCurrentPage(currentPage + 1)}
          className={`flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none hover:bg-gray-900/10 active:bg-gray-900/20 ${
            currentPage === Math.ceil(items.length / itemsPerPage)
              ? "disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              : ""
          }`}
          type="button"
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            ></path>
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default PreviewSetList;
