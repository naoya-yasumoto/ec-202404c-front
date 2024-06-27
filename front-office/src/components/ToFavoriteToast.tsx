import React, { useEffect, useState } from "react";

interface ToastProps {
  show: boolean;
  message: string;
  onClose: () => void;
}

const ToFavoriteToast: React.FC<ToastProps> = ({ show, message, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timer1: NodeJS.Timeout;
    let timer2: NodeJS.Timeout;

    if (show) {
      setIsVisible(true);
      timer1 = setTimeout(() => {
        setIsVisible(false);
      }, 1500); // 1.5秒後にフェードアウト開始
      timer2 = setTimeout(() => {
        onClose();
      }, 2000); // 2秒後に完全に閉じる
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [show, onClose]);

  return (
    <div
      className={`fixed bottom-4 right-4 bg-pink-400 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-500 ease-out ${
        isVisible ? "animate-fadeInUp" : "animate-fadeOutDown"
      } ${show ? "" : "hidden"}`}
      style={{ borderRadius: "12px" }}
    >
      {message}
    </div>
  );
};

export default ToFavoriteToast;
