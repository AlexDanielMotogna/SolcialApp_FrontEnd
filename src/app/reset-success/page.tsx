"use client";
import Image from "next/image";
import logo from "../../../public/imgs/logo.png";
import CryptoBalance from "../../../public/imgs/Crypto-Balancee.png";
import Headline from "../../../public/imgs/Headline.png";
import SquareTick from "../../../public/imgs/tick-square.svg";
import Button from "../../components/Button";
import { useRouter } from "next/navigation";

const ResetSuccess = () => {
  const router = useRouter();

  return (
    <div className="container">
      <div className="w-screen h-auto md:h-screen bg-[#111113] ">
        <div className="w-full h-auto absolute top-0 left-0 grid grid-cols-1 md:grid-cols-2 justify-start md:justify-center items-start md:items-center">
          <div className="w-full md:h-screen flex flex-col items-center justify-center">
            <Image src={logo} className="mb-7 pt-12 w-64" alt="" />
            <Image src={CryptoBalance} className="w-[65%] hidden md:block" alt="" />
            <Image src={Headline} className="px-7" alt="" />
          </div>
          <div className="w-full max-h-max md:h-full px-4 pt-12 md:pt-4 pb-4">
            <div className="w-full h-full bg-[#161618] border border-[#2C2C30] rounded-[20px] flex justify-center items-center ">
              <div className="w-[393px] h-full flex justify-center items-center flex-col gap-10 p-9">
                <Image src={SquareTick} alt="Success" width={60} height={60} />
                <div className="w-full flex flex-col justify-start items-start gap-5">
                  <h1 className="text-white font-semibold text-3xl md:text-[2.2rem] text-nowrap text-center">
                    Reset password successful
                  </h1>
                  <p className="text-[#ACB5BB] font-medium text-[1.1rem] text-center">
                    Successfully changed password. You can now enter the main page.
                  </p>
                </div>
                <Button
                  text="Continue"
                  className="w-full py-3 rounded-xl font-bold text-lg shadow-green-500/20 hover:scale-105 transition-transform"
                  onClick={() => router.push("/login")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetSuccess;
