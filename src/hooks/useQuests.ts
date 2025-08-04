// MODIFICAR: c:\Users\Lian Li\Desktop\FrontEnd_Solcial\solcial\src\hooks\useQuests.ts

import { useState, useEffect, useCallback, useRef } from "react"; // ✅ ADD useRef
import toast from "react-hot-toast";

interface QuestFilters {
  filter: string;
  page: number;
  limit: number;
}

export const useQuests = () => {
  const [quests, setQuests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false); // ✅ SPECIFIC LOADING FOR FILTERS
  const [pageLoading, setPageLoading] = useState(false); // ✅ SPECIFIC LOADING FOR PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filter, setFilter] = useState<string>("");
  const questsPerPage = 6;

  // ✅ USE REFS TO AVOID DEPENDENCIES IN CALLBACKS
  const currentPageRef = useRef(currentPage);
  const filterRef = useRef(filter);
  const totalPagesRef = useRef(totalPages);
  const filterTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastFetchRef = useRef<string>(""); // ✅ PREVENT DUPLICATE CALLS

  // ✅ UPDATE REFS WHEN STATE CHANGES
  useEffect(() => {
    currentPageRef.current = currentPage;
  }, [currentPage]);

  useEffect(() => {
    filterRef.current = filter;
  }, [filter]);

  useEffect(() => {
    totalPagesRef.current = totalPages;
  }, [totalPages]);

  // ✅ FUNCIÓN PARA ACTUALIZAR ESTADOS DE QUESTS
  const updateQuestStatuses = useCallback(async () => {
    try {
      await fetch("/api/quests/update-status", { method: "POST" });
    } catch (error) {
      console.error("Error updating quest statuses:", error);
    }
  }, []);

  // ✅ FUNCIÓN FETCHQUESTS OPTIMIZADA - WITH SPECIFIC LOADING STATES
  const fetchQuests = useCallback(async (page = 1, filterParam = "", loadingType = "general") => {
    const fetchKey = `${page}-${filterParam}`;
    
    // ✅ CIRCUIT BREAKER - PREVENT DUPLICATE CALLS
    if (lastFetchRef.current === fetchKey) {
      console.log('� DUPLICATE FETCH PREVENTED:', fetchKey);
      return;
    }
    
    lastFetchRef.current = fetchKey;
    
    try {
      // ✅ SET APPROPRIATE LOADING STATE
      if (loadingType === "filter") {
        setFilterLoading(true);
      } else if (loadingType === "page") {
        setPageLoading(true);
      } else {
        setLoading(true);
      }

      // ✅ INLINE THE STATUS UPDATE TO AVOID DEPENDENCY
      if (page === 1 && !filterParam) {
        try {
          await fetch("/api/quests/update-status", { method: "POST" });
        } catch (error) {
          console.error("Error updating quest statuses:", error);
        }
      }

      const params = new URLSearchParams({
        page: page.toString(),
        limit: "6", // ✅ HARDCODE TO REMOVE DEPENDENCY
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
      // ✅ CLEAR ALL LOADING STATES
      setLoading(false);
      setFilterLoading(false);
      setPageLoading(false);
      
      // ✅ RESET CIRCUIT BREAKER AFTER COMPLETION
      setTimeout(() => {
        lastFetchRef.current = "";
      }, 500);
    }
  }, []); // ✅ NO DEPENDENCIES - COMPLETELY STABLE

  const handlePageChange = useCallback((newPage: number) => {
    if (newPage >= 1 && newPage <= totalPagesRef.current) {
      setCurrentPage(newPage);
      fetchQuests(newPage, filterRef.current, "page"); // ✅ PAGE LOADING TYPE
    }
  }, [fetchQuests]); // ✅ ONLY fetchQuests DEPENDENCY

  const handleFilterChange = useCallback((newFilter: string) => {
    // ✅ PREVENT DUPLICATE FILTER CALLS
    if (filterRef.current === newFilter) {
      console.log('🚫 FILTER UNCHANGED, SKIPPING API CALL');
      return;
    }
    
    setFilter(newFilter);
    setCurrentPage(1);
    fetchQuests(1, newFilter, "filter"); // ✅ FILTER LOADING TYPE
  }, [fetchQuests]); // ✅ ONLY fetchQuests DEPENDENCY

  const refreshQuests = useCallback(async () => {
    await fetchQuests(currentPageRef.current, filterRef.current);
  }, [fetchQuests]); // ✅ ONLY fetchQuests DEPENDENCY

  useEffect(() => {
    console.log('🎯 INITIAL FETCH EFFECT RUNNING');
    fetchQuests(1, "");
  }, []); // ✅ EMPTY DEPENDENCIES - ONLY RUN ONCE

  return {
    quests,
    loading,
    filterLoading, // ✅ SPECIFIC LOADING FOR FILTERS
    pageLoading, // ✅ SPECIFIC LOADING FOR PAGINATION
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