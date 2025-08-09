import React from "react";
import Image from "next/image";

interface UserAvatarProps {
  name: string;
  email: string;
  avatar: any;
  onLogout?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  name,
  email,
  avatar,
  onLogout,
}) => {
  return (
    <div className="w-full bg-[#2C2C30] border-white border-opacity-30 flex items-center gap-2 py-[10px] px-3 rounded-lg min-h-[60px]">
      <div className="flex items-center gap-2 min-w-0 flex-1">
        <Image
          src={avatar}
          alt="User Avatar"
          className="rounded-full"
          width={40}
          height={40}
        />
        <div className="flex flex-col items-start justify-center gap-1 min-w-0">
          <h2 className="text-white font-medium text-[1.2rem] truncate max-w-[80px] md:max-w-[100px]">
            {name}
          </h2>
          <span className="text-[#6C7278] text-[0.95rem] truncate max-w-[80px] md:max-w-[100px]">
            {email}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {onLogout && (
          <button
            onClick={onLogout}
            className="p-2 rounded-full hover:bg-[#44444A] transition-colors"
            title="Logout"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-log-out"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default UserAvatar;
