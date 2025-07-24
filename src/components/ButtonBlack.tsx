interface ButtonProps {
  text: string;
  onClick?: () => void; // Add onClick to the props
}

const ButtonBlack: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        boxShadow: "inset 0px -5px 10px 0px rgba(255, 255, 255, 0.1)",
      }}
      className="w-full h-[43px] px-4 py-2 flex items-center justify-center border border-[#2C2C30] rounded-[0.6rem] bg-[#161618] outline-none font-semibold text-[1.4rem] text-white hover:text-opacity-85 transition-all duration-300 ease-in-out shadow-[0px_6px_10px_-3px_rgba(0,0,0,0.25)] whitespace-nowrap truncate max-w-[200px]"
    >
      {text}
    </button>
  );
};

export default ButtonBlack;