interface PriceProps {
    amount: string;
  }

const formatNumberWithCommas = (number: number) => {
    return new Intl.NumberFormat('ja-JP').format(number);
  };

  
const Price: React.FC<PriceProps> = ({ amount }) => {
    return (
      <div className="text-2xl font-semibold">
        {formatNumberWithCommas(parseFloat(amount))}
        <span className="text-sm">円</span>
      </div>
    );
  };
  
export default Price;