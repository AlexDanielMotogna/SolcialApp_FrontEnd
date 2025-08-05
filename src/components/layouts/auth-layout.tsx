import Image from "next/image";
import { ReactNode } from "react";
import bg from "../../../public/imgs/bg2.svg";
import logo from "../../../public/imgs/logo.png";
import CryptoBalance from "../../../public/imgs/Crypto-Balancee.png";
import Headline from "../../../public/imgs/Headline.png";
import User from "../../../public/imgs/user.png";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="container">
      <div className="w-screen h-auto md:h-screen bg-[#111113] ">
        <div className="fixed inset-0 w-full h-full z-0">
          <Image
            src={bg}
            alt=""
            fill
            className="object-cover pointer-events-none select-none"
            priority
            quality={90}
            style={{ zIndex: 0 }}
          />
        </div>
        <div className="w-full min-h-screen flex flex-col md:grid md:grid-cols-2 justify-center items-center relative pb-12">
          {/* gauche: illustration/logo */}
          <div className="hidden md:flex flex-col items-center justify-center h-full min-h-screen">
            <div className="w-full flex flex-col items-center justify-center mx-auto gap-8">
              <Image src={logo} className="w-80 mb-10" alt="logo" />
              <Image src={CryptoBalance} className="w-[400px] max-w-full my-10" alt="crypto" />
              <Image src={Headline} className="w-[340px] max-w-full" alt="headline" />
            </div>
          </div>
          {/* droite: formulaire */}
          <div className="w-full min-h-full flex flex-col justify-center items-center bg-[#161618] border-l border-[#2C2C30] rounded-[20px]">
            <div className="w-full max-w-[480px] flex flex-col justify-center items-center py-8 sm:py-12 px-4 sm:px-8">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}