// LoginModal.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface LoginModalProps {
  show: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ show, onClose }) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="bg-white p-8 rounded-lg shadow-lg relative">
        <h2 className="text-2xl font-semibold mb-4">ログインしてください</h2>
        <p>この機能を利用するにはログインが必要です。</p>
        <div className="mt-4">
          <Link to="/login" className="text-blue-500 hover:underline">
            ログイン
          </Link>
        </div>
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
