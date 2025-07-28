import Image, { StaticImageData } from "next/image";

interface NotificationCardProps {
  image: StaticImageData;
  title: string;
  message: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ image, title, message }) => (
  <div className="flex items-start gap-4 p-4 bg-[#23232A] rounded-xl shadow-lg mb-2 w-[320px]">
    <Image src={image} alt={title} width={48} height={48} className="rounded-lg" />
    <div>
      <div className="text-white font-semibold text-base">{title}</div>
      <div className="text-[#ACB5BB] text-sm mt-1">{message}</div>
    </div>
  </div>
);

export default NotificationCard;