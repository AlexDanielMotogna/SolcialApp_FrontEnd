interface ButtonProps {
  text: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  type?: "button" | "submit" | "reset";
  className?: string; // <-- añadido
}

const ButtonBorder: React.FC<ButtonProps> = ({
  text,
  disabled = false,
  onClick,
  className, // <-- añadido
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full h-[43px] px-4 py-2 flex items-center justify-center border rounded-[0.6rem] gradient border-none outline-none font-semibold text-[1.4rem] text-white transition-all duration-300 ease-in-out ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:text-opacity-85"
      } ${className || ""}`} // <-- añadido
    >
      {text}
    </button>
  );
};

export default ButtonBorder;