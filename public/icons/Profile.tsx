const Profile = ({ color = "#ACB5BB" }: { color?: string }) => {
    return (
      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.00002 8.7194C9.84097 8.7194 11.3334 7.22702 11.3334 5.38607C11.3334 3.54512 9.84097 2.05273 8.00002 2.05273C6.15907 2.05273 4.66669 3.54512 4.66669 5.38607C4.66669 7.22702 6.15907 8.7194 8.00002 8.7194Z"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.7266 15.3864C13.7266 12.8064 11.16 10.7197 7.99998 10.7197C4.83998 10.7197 2.27332 12.8064 2.27332 15.3864"
          stroke={color}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };
  
  export default Profile;
  