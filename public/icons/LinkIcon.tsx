import React from "react";

type LinkIconProps = {
  type: "x" | "telegram" | "coinmarketcap" | "discord" | "website";
};

const LinkIcon: React.FC<LinkIconProps> = ({ type }) => {
  const common = "w-5 h-5 hover:opacity-80 transition";
  switch (type) {
    case "x":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path
            fill="currentColor"
            d="M18.9 2H22l-9.6 11.1L22.7 22h-7.3l-5.7-6.7L3.9 22H1l10.3-11.9L1.1 2h7.4l5.1 6 5.3-6z"
          />
        </svg>
      );
    case "telegram":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path
            fill="currentColor"
            d="M9.8 15.3l-.4 5.7c.6 0 .9-.2 1.3-.5l3.1-2.3 6.4 4.7c1.2.7 2 .3 2.3-1.1l4.2-19.9v0c.4-1.9-.7-2.6-1.9-2.2L1 9.6c-1.9.7-1.9 1.7-.3 2.1l6.4 2 14.9-9.4c.7-.5 1.3-.2.8.3"
          />
        </svg>
      );
    case "coinmarketcap":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2a10 10 0 1010 10A10 10 0 0012 2Zm6.5 13.8a.9.9 0 01-1.6.5l-2.2-3.4-1.4 2.2a.9.9 0 01-1.5 0L9.7 12l-2.1 3.2a.9.9 0 01-1.6-.5v-2.3a5.9 5.9 0 1111.7 0Z"
          />
        </svg>
      );
    case "discord":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path
            fill="currentColor"
            d="M20.3 4.4A17 17 0 0015.9 3l-.2.5a15 15 0 00-3.4 0l-.2-.5a17.1 17.1 0 00-4.4 1.4C5 7 4 9.6 4 12.2a17 17 0 001.8 7.5 12.7 12.7 0 003.9-2l-.8-1.3c.9.3 1.9.5 3 .5s2.1-.2 3-.5l-.8 1.3a12.7 12.7 0 003.9 2A17 17 0 0020 12.2c0-2.6-1-5.2-3.7-7.8zM9.8 13.8c-.8 0-1.4-.8-1.4-1.7s.6-1.7 1.4-1.7 1.5.8 1.5 1.7-.7 1.7-1.5 1.7zm4.4 0c-.8 0-1.5-.8-1.5-1.7s.7-1.7 1.5-1.7 1.5.8 1.5 1.7-.7 1.7-1.5 1.7z"
          />
        </svg>
      );
    case "website":
      return (
        <svg viewBox="0 0 24 24" className={common} aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2a10 10 0 1010 10A10 10 0 0012 2zm6.9 9h-3.2a15.7 15.7 0 00-1.4-5A8 8 0 0118.9 11zM12 4a13.8 13.8 0 012 6H10a13.8 13.8 0 012-6zM8.7 6a15.7 15.7 0 00-1.4 5H4.1A8 8 0 018.7 6zM4.1 13h3.2a15.7 15.7 0 001.4 5A8 8 0 014.1 13zM12 20a13.8 13.8 0 01-2-6h4a13.8 13.8 0 01-2 6zm3.3-1a15.7 15.7 0 001.4-5h3.2a8 8 0 01-4.6 5z"
          />
        </svg>
      );
    default:
      return null;
  }
};

export default LinkIcon;
