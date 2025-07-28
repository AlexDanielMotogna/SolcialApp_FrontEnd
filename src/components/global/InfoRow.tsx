const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="w-full flex items-end justify-between bg-[#2C2C30] border border-[#44444A] rounded-lg px-4 py-[0.6rem]">
    <span className="text-[1.4rem] text-[#ACB5BB]">{label}</span>
    <p className="text-[#EDF1F3] font-semibold text-[1.4rem]">{value}</p>
  </div>
);

export default InfoRow;