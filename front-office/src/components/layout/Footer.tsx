import React from 'react';
import { Link } from 'react-router-dom'; // Linkコンポーネントのインポート
import AmericanExpress from '../../assets/AmericanExpress.svg';
import MasterCard from '../../assets/MasterCard.svg';
import PayPal from '../../assets/PayPal.svg';
import Visa from '../../assets/Visa.svg';

const Footer: React.FC = () => {
  return (
    <footer className="footer p-10 bg-gray-200" style={{ position: 'relative', marginTop: 'auto' }}>
      <div className="container mx-auto flex justify-between items-center" style={{ width: '80%' }}>
        <aside className="flex items-center">
          <Link to="/item-list" className="text-5xl font-poiret font-semibold" title="一覧画面に遷移">RakuStyle</Link>
          <p className="ml-8">© 2024 RakuStyle. All Rights Reserved.</p>
        </aside>
        <nav>
          <h6 className="footer-title">Accepted payment methods</h6>
          <div className="grid grid-flow-col gap-4">
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
