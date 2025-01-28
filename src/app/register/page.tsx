import Image from 'next/image';

import User from "../../../public/imgs/user.svg";
import LeftArrow from "../../../public/imgs/arrow-left.svg";
import Key from "../../../public/imgs/key.svg";
import Eye from "../../../public/imgs/eye-slash.svg";
import bg from "../../../public/imgs/bg2.svg";
import logo from "../../../public/imgs/logo.png";
import CryptoBalance from "../../../public/imgs/Crypto-Balancee.png";
import Headline from "../../../public/imgs/Headline.png";

import FilledLeftArrow from "../../../public/icons/FilledLeftArrow";

import Button from "../../components/Button";
import Input from "../../components/Input";

const Register = () => {
  return (
    <div className="container">
      <div className="w-screen h-[994px] md:h-screen bg-[#111113] ">
        <Image src={bg} className="relative" alt=''/>
        <div className="w-full h-screen absolute top-0 left-0 grid grid-cols-1 md:grid-cols-2 justify-start md:justify-center items-start md:items-center">
          <div className="w-full px-6 h-full pt-16 md:pt-0  md:hidden">
            <FilledLeftArrow />
          </div>

          <div className="w-full md:h-screen flex flex-col items-center justify-center">
            <Image src={logo} className="mb-7 pt-12 w-64" alt=''/>
            <Image src={CryptoBalance} className="w-[65%] hidden md:block" alt=''/>
            <Image src={Headline} className="px-7" alt=''/>
          </div>

          <div className="w-full max-h-max md:h-full px-4 pt-12 md:pt-4 pb-4">
            <div className="w-full h-full bg-[#161618] border border-[#2C2C30] rounded-[20px] flex justify-center items-center ">
              <div className="w-[343px] h-full flex justify-center items-center flex-col gap-10 p-9">
            
            <div className="w-full flex flex-col justify-start items-start gap-5">
              <Image src={LeftArrow} className="cursor-pointer hidden md:block" alt=''/>
              <h1 className="text-white font-semibold text-[3.2rem]">
                Register
              </h1>
              <p className="text-[#ACB5BB] font-medium text-[1.6rem]">
                Let’s create a new account
              </p>
            </div>

            <div className="w-full flex flex-col items-start justify-start gap-[1rem]">
              <Input
                label="Full name"
                placeholder="Yourname"
                imgSrc={User}
              />
              <Input
                label="Email"
                placeholder="yourname@gmail.com"
                imgSrc={User}
              />
              <Input
                label="Phone Number"
                placeholder="(+12)435-1213-232"
                imgSrc={User}
              />
              <Input
                label="Password"
                placeholder="********"
                imgSrc={Key}
                showPassword={Eye}
              />
              <Input
                label="Repeat Password"
                placeholder="********"
                imgSrc={Key}
                showPassword={Eye}
              />
            </div>
            <Button text="Register" />

            <p className="font-medium text-[1.4rem] text-[#ACB5BB]">
              Already have an account?{" "}
              <span className="font-semibold gradient bg-clip-text text-transparent cursor-pointer">
                Login Here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default Register
