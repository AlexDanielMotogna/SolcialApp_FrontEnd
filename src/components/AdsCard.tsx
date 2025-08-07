import TestBanner from "../../public/imgs/Test-Image.png";
import Image from "next/image";

interface AdsCardProps {
  tokenName?: string;
  tokenSymbol?: string;
  tokenLogo?: string;
  description?: string;
  websiteUrl?: string;
  twitterUrl?: string;
  marketingBox?: string;
}

const AdsCard: React.FC<AdsCardProps> = ({
  tokenName = "Pockemon",
  description = "Bitcoin is an innovative payment network and a new kind of money.",
  websiteUrl = "#",
  twitterUrl = "#",
  marketingBox = "This token is currently running an ad campaign on Solcial. Keep track, engage or even buy now before the next wave! Advertise on Solcial!",
}) => {
  return (
    <div className="w-[350px] h-[500px] bg-[#23232A] rounded-2xl shadow-xl flex flex-col items-center p-0 relative border border-[#44444A] overflow-hidden">
      {/* Banner Image - now takes ~60% of card height */}
      <div className="w-full h-[300px] bg-[#18181B] flex items-center justify-center">
        <Image
          src={TestBanner}
          alt="Ad Banner"
          width={350}
          height={300}
          className="object-contain w-full h-full"
          priority
        />
      </div>
      <div className="flex flex-col items-center w-full p-6 pt-4 h-[200px]">
        <h2 className="text-2xl font-bold text-white mb-1">{tokenName}</h2>
        <div className="flex gap-2 mb-2">
          <a
            href={websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3B82F6] hover:underline text-sm"
          >
            Website
          </a>
          <span className="text-[#A3A3A3]">|</span>
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#3B82F6] hover:underline text-sm"
          >
            Twitter
          </a>
        </div>
        <div className="w-full bg-[#1E1E20] rounded-xl p-4 mb-3 mt-2">
          <div className="bg-[#22C55E]/20 border border-[#22C55E] rounded-lg px-3 py-2 mb-2 flex items-center justify-center">
            <span className="text-[#22C55E] font-semibold text-sm">
              Marketing Boost 🚀
            </span>
          </div>
          <p className="text-[#A3A3A3] text-sm text-center">{marketingBox}</p>
        </div>
        <p className="text-[#A3A3A3] text-xs text-center mb-2">{description}</p>
        <button className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-2 rounded-xl text-base shadow transition mt-2">
          Go to Token Profile
        </button>
      </div>
    </div>
  );
};

export default AdsCard;
