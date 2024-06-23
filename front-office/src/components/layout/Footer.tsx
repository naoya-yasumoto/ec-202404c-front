import React from 'react';
import AmericanExpress from '../../assets/AmericanExpress.svg'; // SVGファイルのインポート
import MasterCard from '../../assets/MasterCard.svg'; // SVGファイルのインポート
import PayPal from '../../assets/PayPal.svg'; // SVGファイルのインポート
import Visa from '../../assets/Visa.svg'; // SVGファイルのインポート

const Footer: React.FC = () => {
  return (
    <footer className="footer p-10 bg-neutral text-neutral-content">
      <div className="container mx-auto flex justify-between items-center" style={{ width: '80%' }}>
        <aside className="flex items-center">
          <a className="text-4xl font-poiret font-semibold">RakuStyle</a>
          <p className="ml-4">© 2024 RakuStyle. All Rights Reserved.</p>
        </aside> 
        <nav>
          <h6 className="footer-title">Accepted payment methods</h6> 
          <div className="grid grid-flow-col gap-4">
            {/* アイコンの大きさを+10%大きくする */}
            <a><img src={AmericanExpress} className="w-12 h-12 fill-current" /></a>
            <a><img src={MasterCard} className="w-12 h-12 fill-current" /></a>
            <a><img src={PayPal} className="w-12 h-12 fill-current" /></a>
            <a><img src={Visa} className="w-12 h-12 fill-current" /></a>
          </div>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
