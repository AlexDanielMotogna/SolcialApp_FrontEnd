import Marquee from "react-fast-marquee";
import CryptoCard from "./CryptoCard";

import CleanShot from "../../../../public/imgs/CleanShot.png";
import CleanShot2 from "../../../../public/imgs/CleanShot2.png";
import CleanShot3 from "../../../../public/imgs/CleanShot3.png";
import CleanShot4 from "../../../../public/imgs/CleanShot4.png";
import CleanShot5 from "../../../../public/imgs/CleanShot5.png";
import CleanShot6 from "../../../../public/imgs/CleanShot6.png";
import CleanShot7 from "../../../../public/imgs/CleanShot7.png";

const cryptoData = [
  { image: CleanShot, price: "$349", name: "PONKEI", priceColor: "text-[#12B3A8]" },
  { image: CleanShot2, price: "$412", name: "CATS", priceColor: "text-[#12B3A8]" },
  { image: CleanShot3, price: "$256", name: "CVERSE", priceColor: "text-[#12B3A8]" },
  { image: CleanShot4, price: "$378", name: "DOLPHINWIF", priceColor: "text-[#12B3A8]" },
  { image: CleanShot5, price: "$490", name: "PONKEI", priceColor: "text-[#FF4252]" },
  { image: CleanShot6, price: "$215", name: "GOAT", priceColor: "text-[#12B3A8]" },
  { image: CleanShot7, price: "$367", name: "PONKEI", priceColor: "text-[#FF4252]" },
];

const CryptoRow = () => {
  return (
    <div className="w-full px-7 py-5 border-b border-b-[#2C2C30]">
      <Marquee gradient={false} speed={50} loop={0} pauseOnHover={true}>
        <div className="flex items-center gap-4 flex-nowrap">
          {cryptoData.map((crypto, index) => (
            <CryptoCard
              key={index}
              image={crypto.image}
              price={crypto.price}
              name={crypto.name}
              priceColor={crypto.priceColor}
            />
          ))}

          <div className="mx-4 flex items-center gap-4 flex-nowrap"> 
            {cryptoData.map((crypto, index) => (
              <CryptoCard
                key={`repeat-${index}`}
                image={crypto.image}
                price={crypto.price}
                name={crypto.name}
                priceColor={crypto.priceColor}
              />
            ))}
          </div>
        </div>
      </Marquee>
    </div>
  );
};

export default CryptoRow;
