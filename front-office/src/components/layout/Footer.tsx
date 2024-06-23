import React from 'react';
import AmericanExpress from '../../assets/AmericanExpress.svg'; // SVGファイルのインポート
import MasterCard from '../../assets/MasterCard.svg'; // SVGファイルのインポート
import PayPal from '../../assets/PayPal.svg'; // SVGファイルのインポート
import Visa from '../../assets/Visa.svg'; // SVGファイルのインポート

const Footer: React.FC = () => {
  return (
    <footer className="footer p-10 bg-gray-200">
      <div className="container mx-auto flex justify-between items-center" style={{ width: '80%' }}>
        <aside className="flex items-center">
          <a className="text-5xl font-poiret font-semibold">RakuStyle</a>
          <p className="ml-8">© 2024 RakuStyle. All Rights Reserved.</p>
        </aside> 
        <nav>
          <h6 className="footer-title">Accepted payment methods</h6> 
          <div className="grid grid-flow-col gap-4">
            {/* アイコンの大きさを+10%大きくする */}
            <a className="border-2 border-gray-300 rounded-lg p-2"><img src={AmericanExpress} className="w-14 h-7 fill-current" alt="American Express" /></a>
            <a className="border-2 border-gray-300 rounded-lg p-2"><img src={MasterCard} className="w-14 h-7 fill-current" alt="MasterCard" /></a>
            <a className="border-2 border-gray-300 rounded-lg p-2"><img src={PayPal} className="w-14 h-7 fill-current" alt="PayPal" /></a>
            <a className="border-2 border-gray-300 rounded-lg p-2"><img src={Visa} className="w-14 h-7 fill-current" alt="Visa" /></a>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
