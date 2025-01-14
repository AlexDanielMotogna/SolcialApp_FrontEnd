import Image from 'next/image';

import SquareTick from "../../../public/imgs/tick-square.svg";
import bg from "../../../public/imgs/bg2.svg";
import logo from "../../../public/imgs/logo.png";
import CryptoBalance from "../../../public/imgs/Crypto-Balancee.png";
import Headline from "../../../public/imgs/Headline.png";

import FilledLeftArrow from "../../../public/icons/FilledLeftArrow";

import Button from "../../components/Button";

const ResetSuccess = () => {
  return (
    <div className="container">
      <div className="w-screen h-screen bg-[#111113] ">
        <Image src={bg} className="relative md:h-auto lg:h-screen" alt='' />
        <div className="w-full h-screen absolute top-0 left-0 grid grid-cols-1 md:grid-cols-2 justify-start md:justify-center items-start md:items-center">
          <div className="w-full px-6 h-full pt-16 md:hidden">
            <FilledLeftArrow />
          </div>

          <div className="w-full md:h-screen flex flex-col items-center justify-center">
            <Image src={logo} className="mb-7 pt-12 w-64" alt='' />
            <Image src={CryptoBalance} className="w-[65%] hidden md:block" alt=''/>
            <Image src={Headline} className="px-7" alt=''/>
          </div>
          <div className="w-full h-full flex justify-start items-end p-4">
            <div className="w-full max-h-max md:h-full bg-[#161618] border border-[#2C2C30] rounded-[20px] flex justify-center items-center ">
              <div className="w-[393px] h-full flex justify-center items-center flex-col gap-10 p-9">
                <Image src={SquareTick} alt=''/>
                <div className="w-full flex flex-col justify-start items-start gap-5">
                  <h1 className="text-white font-semibold text-4xl md:text-[3.2rem] text-nowrap">
                    Reset password succesful
                  </h1>
                  <p className="text-[#ACB5BB] font-medium text-[1.6rem] text-center">
                    Successfully changed password. you can enter the main page
                  </p>
                </div>

                <Button text="Continue" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetSuccess;
