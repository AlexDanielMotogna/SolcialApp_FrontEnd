import React from "react";
import Image from "next/image";

interface UserAvatarProps {
  name: string;
  email: string;
  avatar: any;
  onLogout?: () => void; // Make onLogout optional
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, email, avatar }) => {
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
          <h2 className="text-white font-medium text-[1.2rem] truncate max-w-[120px] md:max-w-[150px]">
            {name}
          </h2>
          <span className="text-[#6C7278] text-[0.95rem] truncate max-w-[120px] md:max-w-[150px]">
            {email}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2"></div>
    </div>
  );
};

export default UserAvatar;
