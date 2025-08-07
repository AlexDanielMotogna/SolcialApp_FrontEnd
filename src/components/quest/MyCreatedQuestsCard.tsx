import { FiSettings } from "react-icons/fi";
import { useRef, useState, useEffect } from "react";
import { formatDate } from "@/utils/questHelpers";
import {
  parseDecimal128ToNumber,
  formatDecimalForDisplay,
} from "@/utils/decimal";
import SolanaIcon from "../../../public/imgs/SolanaIconReward.png";
import Image from "next/image";
import { getStatusDesign } from "@/constants/quest/questStatusDesign";
import { DynamicTable, TableColumn } from "../DynamicTable";

interface Quest {
  _id: string;
  questName: string;
  status: string;
  startDateTime: string;
  actualParticipants?: number;
  rewardPool?: any;
  maxParticipants?: number;
}

interface Props {
  quests: Quest[];
  onEdit?: (quest: Quest) => void;
  onCancel?: (quest: Quest) => void;
  processing?: boolean;
}

const MyCreatedQuestsCard: React.FC<Props> = ({ quests, onEdit, onCancel }) => {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(null);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // Define columns for DynamicTable
  const columns: TableColumn<Quest>[] = [
    {
      key: "#",
      label: "#",
      render: (_v, _r, i) => i + 1,
      className: "w-[50px] py-6 text-[#ACB5BB]  text-xl text-center ",
    },
    {
      key: "questName",
      label: "Quest",
      className: "w-[220px] text-[#E5E7EB]  text-xl text-center",
    },
    {
      key: "status",
      label: "Status",
      className: "w-[120px] text-[#ACB5BB]  text-xl text-center",
      render: (_value, row) => {
        const normalizedStatus = row.status?.toLowerCase() || "";
        const isCanceled =
          normalizedStatus === "canceled" || normalizedStatus === "cancelled";
        const isExpired = normalizedStatus === "finished";
        const isUrgent = normalizedStatus === "active";
        const statusDesign = getStatusDesign({
          quest: { ...row, status: normalizedStatus },
          isCanceled,
          isExpired,
          isUrgent,
        });
        return (
          <span
            className={`px-4 py-2 rounded font-semibold text-xl ${statusDesign.bg} ${statusDesign.text} border ${statusDesign.border}`}
          >
            {statusDesign.label}
          </span>
        );
      },
    },
    {
      key: "startStatus",
      label: "Start Status",
      className: "w-[140px] text-[#ACB5BB]  text-xl text-center",
      render: (_v, row) => {
        const now = new Date();
        const hasStarted =
          row.startDateTime && new Date(row.startDateTime) <= now;
        return (
          <span
            className={`px-3 py-1 rounded font-semibold text-base ${
              hasStarted
                ? "bg-green-700 text-white"
                : "bg-yellow-700 text-white"
            }`}
          >
            {hasStarted ? "Started" : "Not started yet"}
          </span>
        );
      },
    },
    {
      key: "startDateTime",
      label: "Start Date",
      className: "w-[180px] text-[#ACB5BB]  text-xl text-center",
      render: (value) => formatDate(value),
    },
    {
      key: "actualParticipants",
      label: "Current Participants",
      className: "w-[120px] text-[#ACB5BB]  text-xl text-center",
      render: (value) => value ?? 0,
    },
    {
      key: "maxParticipants",
      label: "Max Participants",
      className: "w-[120px] text-[#ACB5BB]  text-xl text-center",
    },
    {
      key: "rewardPool",
      label: "Reward Pool",
      className: "w-[160px] text-[#ACB5BB]  text-xl text-center",
      render: (value) => {
        const formatted = formatDecimalForDisplay(
          parseDecimal128ToNumber(value)
        );
        return (
          <div className="flex items-center justify-center gap-2">
            <span className="text-[#ACB5BB] font-medium">{formatted}</span>
            <Image
              src={SolanaIcon}
              alt="Solana"
              className="w-6 h-6"
              width={24}
              height={24}
            />
          </div>
        );
      },
    },
    {
      key: "actions",
      label: "Actions",
      className: "w-[120px] text-center text-[#ACB5BB] text-xl",
      render: (_v, row) => (
        <div className="flex items-center justify-center relative">
          <button
            className="p-3 rounded-full hover:bg-[#23232A] transition"
            onClick={() => setMenuOpen(menuOpen === row._id ? null : row._id)}
          >
            <FiSettings size={20} />
          </button>
          {menuOpen === row._id && (
            <div
              ref={menuRef}
              className="absolute right-0 mt-3 w-56 bg-[#23232A] border border-[#44444A] rounded-xl shadow-lg z-1000"
            >
              <button
                className="w-full text-left px-6 py-4 rounded-xl hover:bg-[#9945FF] hover:text-white transition text-xl"
                onClick={() => {
                  setMenuOpen(null);
                  onEdit?.(row);
                }}
              >
                Edit Quest
              </button>
              {!(
                row.status === "finished" ||
                row.status === "canceled" ||
                row.status === "cancelled"
              ) && (
                <button
                  className="w-full text-left px-6 py-4 rounded-xl hover:bg-[#FF4D4F] hover:text-white transition text-xl"
                  onClick={() => {
                    setMenuOpen(null);
                    onCancel?.(row);
                  }}
                >
                  Cancel Quest
                </button>
              )}
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-w-[1550px] 2xl:min-w-0 flex items-start justify-start overflow-x-auto bg-[#161618] border border-[#2C2C30] rounded-2xl py-6 px-5 mb-28 shadow-lg w-full">
      <div className="max-h-[600px] overflow-y-auto w-full">
        <DynamicTable
          columns={columns}
          data={quests}
          rowKey={(row) => row._id}
        />
      </div>
    </div>
  );
};

export default MyCreatedQuestsCard;
