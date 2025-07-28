import TwitterLg from "../../../public/icons/TwitterLg";
import ArrowRight from "../../../public/icons/ArrowRight";

const TaskList = ({ tasks, userQuest }: { tasks: Record<string, boolean>, userQuest?: any }) => (
  <div className="w-full flex flex-col items-start justify-start gap-[0.8rem]">
    {Object.entries(tasks).map(([task, completed]) => (
      <div
        key={task}
        className={`w-full bg-[#2C2C30] p-5 flex items-center justify-between rounded-md border ${
          userQuest
            ? completed
              ? "border-green-500"
              : "border-[#44444A]"
            : "border-[#44444A]"
        }`}
      >
        <div className="flex items-center justify-center gap-[0.6rem]">
          <TwitterLg />
          <p className="text-white font-medium text-[1.4rem]">{task}</p>
        </div>
        <ArrowRight />
      </div>
    ))}
  </div>
);

export default TaskList;