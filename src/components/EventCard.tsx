import Image from "next/image";
import ButtonBorder from "../components/ButtonBorder";
import CryptoCoin from "../../public/imgs/CryptoCoin.png";

interface EventCardProps {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    price: number;
    priceUnit: string;
    liveText: string;
    liveBgColor: string;
    onJoin: () => void;
  }
  
  const EventCard: React.FC<EventCardProps> = ({
    title,
    description,
    startDate,
    endDate,
    price,
    priceUnit,
    liveText,
    liveBgColor,
    onJoin,
  }) => {
  return (
    <div className="w-full p-[1.6rem] bg-[#1E1E20] border border-[#2C2C30] rounded-2xl flex flex-col items-start justify-start gap-4">
      <div className="w-full relative">
        <Image src={CryptoCoin} className="w-full relative" alt="Event" />
        <div className="w-full h-full absolute top-0 right-0 flex flex-col items-center justify-between p-4">
          <div className="w-full flex items-end justify-end">
            <h6
              className="text-[1.2rem] text-white font-normal flex items-center justify-center rounded-[5px] py-[0.4rem] px-[0.8rem]"
              style={{ backgroundColor: liveBgColor }}
            >
              {liveText}
            </h6>
          </div>
          <h6
            className="w-full text-[1.2rem] text-white font-normal bg-[#2C2C30] border border-[#2C2C30] flex items-center justify-center rounded-[5px] py-[0.4rem] px-[0.8rem] shadow-[0px_6px_10px_-3px_rgba(0,0,0,0.25)]"
            style={{
              boxShadow: "inset 0px -5px 10px 0px rgba(255, 255, 255, 0.1)",
            }}
          >
            {startDate} <span className="mx-3">-</span> {endDate}
          </h6>
        </div>
      </div>

      <div className="w-full flex flex-col items-start justify-start gap-1">
        <h3 className="text-[1.8rem] text-[#EDF1F3] font-semibold">{title}</h3>
        <h5 className="text-[1.4rem] text-[#ACB5BB] font-normal">{description}</h5>
      </div>
      <h3 className="text-[1.8rem] font-semibold text-[#EDF1F3]">
        {price} <span className="text-[#9945FF]">{priceUnit}</span>
      </h3>
      <div className="w-full" onClick={onJoin}>
            <ButtonBorder text="Join Event" />
          </div>
    </div>
  );
};

export default EventCard;
