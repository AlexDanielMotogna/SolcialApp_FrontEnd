const Close = ({ onClick }: { onClick: () => void }) => {
  return (
    <svg
      onClick={onClick}  // Bind the click event to closeModal
      className="cursor-pointer"  // Add the pointer cursor style
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.16797 4.29688L15.8339 15.9628"
        stroke="#ACB5BB"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.16713 15.9628L15.833 4.29688"
        stroke="#ACB5BB"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Close;
