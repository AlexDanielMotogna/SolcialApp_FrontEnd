import Marquee from "react-fast-marquee";
import CryptoCard from "./CryptoCard";
import { useState } from "react";
import CleanShot from "../../../../public/imgs/CleanShot.png";
import CleanShot2 from "../../../../public/imgs/CleanShot2.png";
import CleanShot3 from "../../../../public/imgs/CleanShot3.png";
import CleanShot4 from "../../../../public/imgs/CleanShot4.png";
import CleanShot5 from "../../../../public/imgs/CleanShot5.png";
import CleanShot6 from "../../../../public/imgs/CleanShot6.png";
import CleanShot7 from "../../../../public/imgs/CleanShot7.png";
import BoostIcon from "../../../../public/icons/Boost";
import DynamicList from "../../DynamicList";
import { fakeTokens } from "@/data/mockTokensForDinamic";

const cryptoData = [
  {
    image: CleanShot,
    price: "$349",
    name: "PONKEI",
    priceColor: "text-[#12B3A8]",
  },
  {
    image: CleanShot2,
    price: "$412",
    name: "CATS",
    priceColor: "text-[#12B3A8]",
  },
  {
    image: CleanShot3,
    price: "$256",
    name: "CVERSE",
    priceColor: "text-[#12B3A8]",
  },
  {
    image: CleanShot4,
    price: "$378",
    name: "DOLPHINWIF",
    priceColor: "text-[#12B3A8]",
  },
  {
    image: CleanShot5,
    price: "$490",
    name: "PONKEI",
    priceColor: "text-[#FF4252]",
  },
  {
    image: CleanShot6,
    price: "$215",
    name: "GOAT",
    priceColor: "text-[#12B3A8]",
  },
  {
    image: CleanShot7,
    price: "$367",
    name: "PONKEI",
    priceColor: "text-[#FF4252]",
  },
];

const CryptoRow = ({
  onSeeAll,
  tokens,
}: {
  onSeeAll?: () => void;
  tokens?: any[];
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleSeeAll = () => {
    setShowModal(true);
    if (onSeeAll) onSeeAll();
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="w-full px-7 py-5 border-b border-b-[#2C2C30] flex flex-col gap-4">
      <div className="w-full">
        <Marquee gradient={false} loop={0} pauseOnHover={true}>
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
      {/* Botón "See All" centrado y con padding adecuado */}
      <div className="w-full flex justify-center mt-2">
        <button
          className="flex items-center gap-2 px-5 py-2 rounded-xl bg-[#232326] hover:bg-[#2C2C30] transition shadow-md"
          onClick={handleSeeAll}
          aria-label="See all boosted tokens"
        >
          <BoostIcon />
          <span className="text-white text-base font-semibold">
            See All Boosted Tokens
          </span>
        </button>
      </div>
      {/*Modal to show DynamicList*/}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-[#161618] border border-[#44444A] rounded-2xl shadow-2xl p-8  mx-4 relative min-w-[800px]">
            <button
              className="absolute top-4 right-4 text-white text-xl"
              onClick={handleCloseModal}
              aria-label="Close"
            >
              &times;
            </button>
            <DynamicList tokens={fakeTokens} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoRow;
