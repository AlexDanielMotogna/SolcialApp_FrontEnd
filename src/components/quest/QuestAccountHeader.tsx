import { useRouter } from "next/navigation";
import ButtonBlack from "../ButtonBlack";

interface QuestAccountHeaderProps {
  stats: {
    created: {
      total: number;
      active: number;
      finished: number;
      canceled: number;
    };
    completed: {
      total: number;
      rewardsClaimed: number;
      pendingRewards: number;
    };
  };
}

const QuestAccountHeader = ({ stats }: QuestAccountHeaderProps) => {
  const router = useRouter();

  return (
    <div className="w-full max-w-8xl flex flex-col gap-6 mb-8 ml-12">
      {/* Back Button */}
      <div className="flex items-center justify-start">
        <ButtonBlack
          text="Back to Quests"
          onClick={() => router.push("/dashboard/quests")}
        />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Created Quests Stats */}
        <div className="bg-[#1E1E20] border border-[#2C2C30] rounded-xl p-4">
          <h3 className="text-[#ACB5BB] text-sm font-medium mb-2">Created Quests</h3>
          <p className="text-white text-2xl font-bold">{stats.created.total}</p>
          <div className="flex gap-2 mt-2 text-xs">
            <span className="text-green-400">{stats.created.active} Active</span>
            <span className="text-blue-400">{stats.created.finished} Finished</span>
            <span className="text-red-400">{stats.created.canceled} Canceled</span>
          </div>
        </div>

        {/* Completed Quests Stats */}
        <div className="bg-[#1E1E20] border border-[#2C2C30] rounded-xl p-4">
          <h3 className="text-[#ACB5BB] text-sm font-medium mb-2">Completed Quests</h3>
          <p className="text-white text-2xl font-bold">{stats.completed.total}</p>
          <p className="text-green-400 text-sm mt-1">Quests Completed</p>
        </div>

        {/* Rewards Claimed */}
        <div className="bg-[#1E1E20] border border-[#2C2C30] rounded-xl p-4">
          <h3 className="text-[#ACB5BB] text-sm font-medium mb-2">Rewards Claimed</h3>
          <p className="text-white text-2xl font-bold">{stats.completed.rewardsClaimed}</p>
          <p className="text-green-400 text-sm mt-1">Total Rewards</p>
        </div>

        {/* Pending Rewards */}
        <div className="bg-[#1E1E20] border border-[#2C2C30] rounded-xl p-4">
          <h3 className="text-[#ACB5BB] text-sm font-medium mb-2">Pending Rewards</h3>
          <p className="text-white text-2xl font-bold">{stats.completed.pendingRewards}</p>
          <p className="text-yellow-400 text-sm mt-1">Ready to Claim</p>
        </div>
      </div>
    </div>
  );
};

export default QuestAccountHeader;