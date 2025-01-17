const Matches = ({ color = "#ACB5BB" }: { color?: string }) => {
    return (
      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M11.4533 12.7197C13.0533 12.7197 13.4533 11.8197 13.4533 10.7197V6.71973C13.4533 5.61973 13.0533 4.71973 11.4533 4.71973C9.85331 4.71973 9.45331 5.61973 9.45331 6.71973V10.7197C9.45331 11.8197 9.85331 12.7197 11.4533 12.7197Z"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.54669 12.7197C2.94669 12.7197 2.54669 11.8197 2.54669 10.7197V6.71973C2.54669 5.61973 2.94669 4.71973 4.54669 4.71973C6.14669 4.71973 6.54669 5.61973 6.54669 6.71973V10.7197C6.54669 11.8197 6.14669 12.7197 4.54669 12.7197Z"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.54669 8.71973H9.45336"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 10.3861V7.05273"
          stroke={color === "#ACB5BB" ? "#161618" : color} // Custom color for the path
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M1 10.3861V7.05273"
          stroke={color === "#ACB5BB" ? "#161618" : color} // Custom color for the path
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };
  
  export default Matches;
  