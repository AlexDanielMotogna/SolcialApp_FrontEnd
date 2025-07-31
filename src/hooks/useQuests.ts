// MODIFICAR: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\hooks\useQuests.ts

import { useState, useEffect, useCallback } from "react"; // ✅ AGREGAR useCallback
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

  // ✅ FUNCIÓN PARA ACTUALIZAR ESTADOS DE QUESTS
  const updateQuestStatuses = useCallback(async () => {
    try {
      await fetch("/api/quests/update-status", { method: "POST" });
    } catch (error) {
      console.error("Error updating quest statuses:", error);
    }
  }, []);

  // ✅ FUNCIÓN FETCHQUESTS ACTUALIZADA
  const fetchQuests = useCallback(async (page = 1, filterParam = filter) => {
    try {
      setLoading(true);

      // ✅ ACTUALIZAR ESTADOS ANTES DE OBTENER QUESTS
      await updateQuestStatuses();

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
  }, [filter, questsPerPage, updateQuestStatuses]); // ✅ AGREGAR DEPENDENCIAS

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

  const refreshQuests = useCallback(async () => {
    await fetchQuests(currentPage, filter);
  }, [fetchQuests, currentPage, filter]); // ✅ USAR useCallback

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