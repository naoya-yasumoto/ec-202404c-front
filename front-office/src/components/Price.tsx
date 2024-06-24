interface PriceProps {
    amount: string;
  }

const formatNumberWithCommas = (number: number) => {
    return new Intl.NumberFormat('ja-JP').format(number);
  };

  
const Price: React.FC<PriceProps> = ({ amount }) => {
    return (
      <div className="text-xl font-semibold">
        {formatNumberWithCommas(parseFloat(amount))}円
      </div>
    );
  };
  
export default Price;