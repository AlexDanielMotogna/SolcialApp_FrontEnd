import Wallet from "../../public/icons/Wallet";

interface ButtonProps {
    text: string;
  }
  

  const ButtonSm: React.FC<ButtonProps> = ({ text }) => {
    return (
      <button className="w-full h-[36px] flex items-center justify-center gap-4 border rounded-md gradient border-none outline-none font-semibold text-[1.4rem] text-white hover:text-opacity-85 transition-all duration-300 ease-in-out">
        <Wallet color="#FFFFFF" />
        {text}
      </button>
    );
  };
  
  export default ButtonSm;
  