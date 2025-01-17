const Tournaments = ({ color = "#ACB5BB" }: { color?: string }) => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.99998 14.9932H3.95998C1.64664 14.9932 0.679976 13.3399 1.79998 11.3199L3.87998 7.57324L5.83998 4.05324C7.02664 1.91324 8.97331 1.91324 10.16 4.05324L12.12 7.57991L14.2 11.3266C15.32 13.3466 14.3466 14.9999 12.04 14.9999H7.99998V14.9932Z"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.2933 14.0532L8 9.64648L1.70667 14.0532"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 2.71973V9.64639"
        stroke={color}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Tournaments;
