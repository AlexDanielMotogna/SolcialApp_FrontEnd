const Notification = ({
  type,
  children,
}: {
  type: "info" | "success" | "error";
  children: React.ReactNode;
}) => {
  const bg =
    type === "success"
      ? "bg-green-700"
      : type === "error"
      ? "bg-red-700"
      : "bg-blue-700";
  return (
    <div className={`w-full mb-4 px-4 py-2 ${bg} text-white rounded text-center font-semibold`}>
      {children}
    </div>
  );
};

export default Notification;