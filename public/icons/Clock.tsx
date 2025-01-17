const Clock = ({ color = "#ACB5BB" }: { color?: string }) => {
    return (
      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M7.99996 15.3864C4.77996 15.3864 2.16663 12.7731 2.16663 9.55306C2.16663 6.33306 4.77996 3.71973 7.99996 3.71973C11.22 3.71973 13.8333 6.33306 13.8333 9.55306"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 6.05273V9.38607"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 2.05273H10"
          stroke={color}
          strokeWidth="1.2"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.6666 12.0527V14.7194"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.6666 12.0527V14.7194"
          stroke="#161618"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };
  
  export default Clock;
  