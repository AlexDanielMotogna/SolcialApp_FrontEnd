interface ButtonProps {
    text: string;
  }
  
  const ButtonBorder: React.FC<ButtonProps> = ({ text }) => {
    return (
      <button className="w-full h-[43px] flex items-center justify-center border rounded-[0.6rem] gradient border-none outline-none font-semibold text-[1.4rem] text-white hover:text-opacity-85 transition-all duration-300 ease-in-out">
        {text}
      </button>
    );
  };
  
  export default ButtonBorder;
  