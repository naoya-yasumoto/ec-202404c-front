// src/pages/NotFound.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // react-router-domからLinkをインポート
import NotFoundLeft from '../assets/NotFoundLeft.svg'; // SVGファイルをインポート
import NotFoundRight from '../assets/NotFoundRight.svg'; // SVGファイルをインポート

const NotFound: React.FC = () => {
    return (
        <div className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">
            {/* 左下に配置する画像 */}
            <img
                src={NotFoundLeft}
                alt="Not Found Left"
                className="absolute bottom-0 left-0"
                style={{ width: '40rem', height: 'auto' }}
            />
            {/* 右上に配置する画像 */}
            <img
                src={NotFoundRight}
                alt="Not Found Right"
                className="absolute top-0 right-0"
                style={{ width: '40rem', height: 'auto'}}
            />
            {/* 中央に配置する404テキスト */}
            <div className="absolute inset-0 flex items-center justify-center font-josefin text-blue-900" style={{ fontSize: '17rem', fontWeight: 'bold'}}>
                404
            </div>
            {/* 上部に配置するテキスト */}
            <div className="absolute top-1/4 text-center font-josefin text-3xl text-blue-900">
                Page Not Found
            </div>
            {/* 下部に配置するリンク化されたテキスト */}
            <div className="absolute bottom-1/4 text-center font-josefin text-3xl" style={{marginBottom:'2rem'}}>
                <Link
                    to="/item-list"
                    className="text-blue-900 hover:text-blue-gray-500 hover:underline"
                >
                    Back to Top
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
