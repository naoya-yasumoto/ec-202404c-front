import React from 'react';
import { Link } from 'react-router-dom';

const OrderComplete: React.FC = () => {

    
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full sm:w-4/5 lg:w-3/5 mt-20 mb-20">
        <div className="mx-2 my-20 sm:my-auto">
          <div className="flex justify-center">
            <div className="w-full sm:w-11/12 p-12 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">
              <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800 mt-6 mb-6">
                注文完了
              </h2>
              <p className="text-center text-gray-600 text-lg mb-6">
                ご注文いただきありがとうございます。<br />
                ご注文は正常に処理されました。
              </p>
              <div className="text-center mb-6">
                <svg className="w-24 h-24 text-green-500 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <Link to="/item-list/set" className="block w-full py-3 mt-4 bg-gray-800 rounded-sm font-medium text-white uppercase text-center focus:outline-none hover:bg-gray-700 hover:shadow-none">
                ホームへ戻る
              </Link>
              <div className="sm:flex sm:flex-wrap mt-8 sm:mb-4 text-sm text-center">
                <p className="flex-1 text-gray-500 text-md mx-4 my-1 sm:my-auto">
                  他の情報が必要ですか？
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
