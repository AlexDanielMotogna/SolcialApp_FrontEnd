import { memo } from "react";
import Pagination from "./Pagination";

interface QuestFooterProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalCount: number;
  itemsPerPage: number;
}

const QuestFooter = memo(({
  currentPage,
  totalPages,
  onPageChange,
  totalCount,
  itemsPerPage,
}: QuestFooterProps) => {
  return (
    <footer className="w-full bg-[#1E1E20] content-center border-t border-[#2C2C30] mb-10">
      <div className="max-w-7xl mx-auto px-5 py-6">
        {/* Pagination */}
        <div className="flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            totalCount={totalCount}
            itemsPerPage={itemsPerPage}
          />
        </div>
        
        {/* Optional: Add additional footer content */}
        <div className="mt-4 pt-4 border-t border-[#2C2C30] text-center">
        </div>
      </div>
    </footer>
  );
});

QuestFooter.displayName = 'QuestFooter';

export default QuestFooter;