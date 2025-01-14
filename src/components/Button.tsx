interface ButtonProps {
    text: string;
  }
  
  const Button: React.FC<ButtonProps> = ({ text }) => {
    return (
      <button className="w-full h-[46px] flex items-center justify-center border rounded-md gradient border-none outline-none font-semibold text-[1.4rem] text-white hover:text-opacity-85 transition-all duration-300 ease-in-out">
        {text}
      </button>
    );
  };
  
  export default Button;
  