interface WalletProps {
    color?: string; // Optional prop for stroke color
  }
  
  const Wallet: React.FC<WalletProps> = ({ color = "#ACB5BB" }) => {
    return (
      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.66669 6.71973H4.66669"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14.6667 8.03349V9.40686C14.6667 9.77353 14.3733 10.0735 14 10.0868H12.6933C11.9733 10.0868 11.3133 9.56017 11.2533 8.84017C11.2133 8.42017 11.3733 8.02683 11.6533 7.7535C11.9 7.50017 12.24 7.35352 12.6133 7.35352H14C14.3733 7.36685 14.6667 7.66682 14.6667 8.03349Z"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.6533 7.75273C11.3733 8.02606 11.2133 8.4194 11.2533 8.8394C11.3133 9.5594 11.9733 10.0861 12.6933 10.0861H14V11.0527C14 13.0527 12.6666 14.3861 10.6666 14.3861H4.66665C2.66665 14.3861 1.33331 13.0527 1.33331 11.0527V6.38607C1.33331 4.57273 2.42665 3.30607 4.12665 3.09273C4.29998 3.06607 4.47998 3.05273 4.66665 3.05273H10.6666C10.84 3.05273 11.0066 3.05939 11.1666 3.08606C12.8866 3.28606 14 4.5594 14 6.38607V7.35274H12.6133C12.24 7.35274 11.9 7.49939 11.6533 7.75273Z"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };
  
  export default Wallet;
  