import Image, { StaticImageData } from 'next/image';

interface CryptoCardProps {
    image: string | StaticImageData;
    price: string;
    name: string;
    priceColor: string;
  }

const CryptoCard: React.FC<CryptoCardProps> = ({ image, price, name, priceColor }) => {
  return (
    <div className="h-full pl-4 pr-3 py-3 bg-[#2C2C30] border border-[#44444A] rounded-md flex items-center justify-center gap-3 flex-shrink-0">
      <div className="flex items-end justify-center gap-2">
        <Image src={image} alt={name}/>
        <span className={`text-[1.6rem] font-semibold ${priceColor}`}>
          {price}
        </span>
      </div>
      <div className="h-[26px] w-[1px] bg-[#44444A]"></div>
      <p className="text-white font-medium text-[1.6rem]">{name}</p>
    </div>
  );
};

export default CryptoCard;
