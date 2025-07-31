import React from 'react';
import Image from 'next/image';


interface InputProps {
  label?: string;
  placeholder: string;
  imgSrc?: string;
  showPassword?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const Input: React.FC<InputProps> = ({ label, placeholder, imgSrc, showPassword, value, onChange, type = "text", ...props }) => {
  return (
    <div className='w-full flex flex-col items-start justify-start gap-1'>
      {label && <span className='text-[#ACB5BB] font-medium text-[1.2rem]'>{label}</span>}
      
      <div className='w-full h-[46px] bg-[#2C2C30] border border-[#44444A] rounded-md flex justify-between items-center px-3 py-5 gap-1 focus-within:border-[#ACB5BB] transition-all duration-300 ease-in-out'>
        {imgSrc && <Image src={imgSrc} alt="icon" />}

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className='w-full p-2 rounded border-none bg-transparent outline-none text-white font-normal text-[1.4rem]'
          {...props}
        />

        {showPassword && <Image src={showPassword} alt="show-password" className="cursor-pointer" />}
      </div>
    </div>
  );
};

export default Input;
