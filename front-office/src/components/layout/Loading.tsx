import React from 'react';

// Loadingコンポーネントの定義
const Loading: React.FC = () => {
  return (
    <>
      {/* ローディング画面全体を囲むdiv */}
      <div style={{ width: '100%', height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* ローディングスピナー */}
        <span className="loading loading-ring loading-lg"></span>
        {/* 「Loading」テキスト */}
        <div className="text-3xl mt-2 font-josefin font-medium" style={{ display: 'flex' }}>
          {/* それぞれの文字にアニメーションを設定 */}
          <span className="animate-wave" style={{ animationDelay: '0.1s' }}>L</span>
          <span className="animate-wave" style={{ animationDelay: '0.2s' }}>o</span>
          <span className="animate-wave" style={{ animationDelay: '0.3s' }}>a</span>
          <span className="animate-wave" style={{ animationDelay: '0.4s' }}>d</span>
          <span className="animate-wave" style={{ animationDelay: '0.5s' }}>i</span>
          <span className="animate-wave" style={{ animationDelay: '0.6s' }}>n</span>
          <span className="animate-wave" style={{ animationDelay: '0.7s' }}>g</span>
        </div>
        {/* アニメーションのスタイル */}
        <style>
          {`
            @keyframes wave {
              0%, 100% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-5px);
              }
            }

            .animate-wave {
              animation: wave 1s infinite;
            }
          `}
        </style>
      </div>
    </>
  );
};

export default Loading;
