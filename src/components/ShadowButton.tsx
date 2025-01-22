import React from "react";

interface ShadowButtonProps {
  label: string; // Text to display
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>; // Optional icon component
  className?: string; // Additional CSS classes
  style?: React.CSSProperties; // Inline styles
}

const ShadowButton: React.FC<ShadowButtonProps> = ({
  label,
  icon: Icon,
  className = "",
  style = {},
}) => {
  return (
    <div
      className={`w-full flex items-center justify-center gap-4 bg-[#161618] border border-[#2C2C30] rounded-[6px] py-[1.3rem] px-[2.4rem] shadow-[0px_0px_0px_3.7px_rgba(0,0,0,0)] ${className}`}
      style={{
        boxShadow: "0px 7.4px 18.5px 0px #FFFFFF1C inset",
        ...style,
      }}
    >
      {Icon && <Icon className="text-white" />}
      <h5 className="text-[1.4rem] font-semibold text-white">{label}</h5>
    </div>
  );
};

export default ShadowButton;
