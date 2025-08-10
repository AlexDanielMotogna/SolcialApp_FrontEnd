import { useState, useEffect, useCallback, useRef } from "react";
import toast from "react-hot-toast";
// Custom hook to fetch and manage quests with pagination and filtering
// This hook is used in the QuestList component and handles quest data fetching, pagination, and filtering
interface QuestFilters {
  filter: string;
  page: number;
  limit: number;
}

export const useQuests = () => {
  const [quests, setQuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filter, setFilter] = useState<string>("");
  const questsPerPage = 6;

  const currentPageRef = useRef(currentPage);
  const filterRef = useRef(filter);
  const totalPagesRef = useRef(totalPages);
  const lastFetchRef = useRef<string>("");

  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  useEffect(() => {
    filterRef.current = filter;
  }, [filter]);

  useEffect(() => {
    totalPagesRef.current = totalPages;
  }, [totalPages]);

  const fetchQuests = useCallback(
    async (page = 1, filterParam = "", loadingType = "general") => {
      const fetchKey = `${page}-${filterParam}`;

      if (lastFetchRef.current === fetchKey) {
        console.log("Using cached data for", fetchKey);
        return;
      }

      lastFetchRef.current = fetchKey;

      try {
        if (loadingType === "filter") {
          setFilterLoading(true);
        } else if (loadingType === "page") {
          setPageLoading(true);
        } else {
          setLoading(true);
        }
        if (page === 1 && !filterParam) {
          try {
            await fetch("/api/quests/update-status", { method: "POST" });
          } catch (error) {
            console.error("Error updating quest statuses:", error);
          }
        }

        const params = new URLSearchParams({
          page: page.toString(),
          limit: "6",
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
        setFilterLoading(false);
        setPageLoading(false);
        setTimeout(() => {
          lastFetchRef.current = "";
        }, 500);
      }
    },
    []
  );

  const handlePageChange = useCallback(
    (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPagesRef.current) {
        setCurrentPage(newPage);
        fetchQuests(newPage, filterRef.current, "page");
      }
    },
    [fetchQuests]
  );

  const handleFilterChange = useCallback(
    (newFilter: string) => {
      if (filterRef.current === newFilter) {
        return;
      }

      setFilter(newFilter);
      setCurrentPage(1);
      fetchQuests(1, newFilter, "filter");
    },
    [fetchQuests]
  );

  const refreshQuests = useCallback(async () => {
    await fetchQuests(currentPageRef.current, filterRef.current);
  }, [fetchQuests]);

  useEffect(() => {
    fetchQuests(1, "");
  }, []);

  return {
    quests,
    loading,
    filterLoading,
    pageLoading,
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
