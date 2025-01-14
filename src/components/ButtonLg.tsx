interface ButtonProps {
    text: string;
  }
  
  const ButtonLg: React.FC<ButtonProps> = ({ text }) => {
    return (
      <button className="w-full h-[52px] flex items-center justify-center border rounded-lg gradient border-none outline-none font-semibold text-[1.4rem] text-white hover:text-opacity-85 transition-all duration-300 ease-in-out">
        {text}
      </button>
    );
  };
  
  export default ButtonLg;  