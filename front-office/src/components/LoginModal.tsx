// LoginModal.tsx

import React from 'react';
import { Link } from 'react-router-dom';

interface LoginModalProps {
  show: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ show, onClose }) => {
  if (!show) {
    return null; // モーダルが非表示の場合、nullを返して描画をスキップ
  }

  const handleLoginButtonClick = () => {
    onClose(); // ログインボタンがクリックされたらモーダルを閉じる
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-55 transition-opacity duration-300 opacity-100`} style={{ zIndex: 9999 }}>
      <div className="bg-white p-10 rounded-lg shadow-lg relative" style={{ width: '45%', height: '29%', maxHeight:'500px', maxWidth:'500px'}}>
        <h2 className="text-2xl font-semibold mb-4">ログインしてください</h2>
        <p>この機能を利用するにはログインが必要です。</p>
        <div>
          <Link to="/login">
            <button onClick={handleLoginButtonClick} className="bg-blue-gray-600 text-white py-3 px-4 rounded hover:bg-blue-gray-900 mt-4" style={{ width: '40%', height: '30%' }}>
              ログイン
            </button>
          </Link>
        </div>
        <button
          onClick={onClose}
          className="btn btn-square btn-outline absolute top-0 right-0 mt-8 mr-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
