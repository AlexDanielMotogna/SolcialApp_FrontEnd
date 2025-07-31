import { useState, useEffect } from "react";
import toast from "react-hot-toast";

interface QuestFilters {
  filter: string;
  page: number;
  limit: number;
}

export const useQuests = () => {
  const [quests, setQuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filter, setFilter] = useState<string>("");
  const questsPerPage = 6;

  const fetchQuests = async (page = 1, filterParam = filter) => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        page: page.toString(),
        limit: questsPerPage.toString(),
      });

      if (filterParam) {
        if (["active", "finished", "canceled"].includes(filterParam)) {
          params.append("filter", filterParam);
        } else {
          params.append("sort", filterParam);
        }
      }

      const res = await fetch(`/api/quests?${params}`);
      const data = await res.json();

      if (data.quests) {
        setQuests(data.quests);

        if (data.pagination) {
          setCurrentPage(data.pagination.currentPage);
          setTotalPages(data.pagination.totalPages);
          setTotalCount(data.pagination.totalCount);
        }
      }
    } catch (err) {
      console.error("Error fetching quests:", err);
      setQuests([]);
      toast.error("Error loading quests");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      fetchQuests(newPage, filter);
    }
  };

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1);
    fetchQuests(1, newFilter);
  };

  const refreshQuests = async () => {
    await fetchQuests(currentPage, filter);
  };

  useEffect(() => {
    fetchQuests(1, "");
  }, []);

  return {
    quests,
    loading,
    currentPage,
    totalPages,
    totalCount,
    filter,
    questsPerPage,
    fetchQuests,
    handlePageChange,
    handleFilterChange,
    refreshQuests,
  };
};