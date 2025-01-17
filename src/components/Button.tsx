type ButtonProps = {
  size?: "xs" | "sm"; 
  text?: string; 
  children?: React.ReactNode; 
  className?: string; 
  onClick?: () => void; 
};

const Button: React.FC<ButtonProps> = ({
  size = "sm", 
  text,
  children,
  className = "",
  onClick,
}) => {
  const sizeStyles = size === "xs" ? "button-xs" : "button-sm";

  return (
    <button
      className={`${sizeStyles} ${className}`}
      onClick={onClick}
    >
      {text || children}
    </button>
  );
};

export default Button;
