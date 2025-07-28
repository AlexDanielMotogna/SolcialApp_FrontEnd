import { useState } from "react";

export function useCreateQuest(initialForm: any, onClose: () => void, userId: string) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
//
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (
      name === "like" ||
      name === "retweet" ||
      name === "comment" ||
      name === "follow" ||
      name === "quote"
    ) {
      const checked = (e.target as HTMLInputElement).checked;
      setForm((prev: any) => ({
        ...prev,
        tasks: { ...prev.tasks, [name]: checked },
      }));
    } else {
      setForm((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const calculateRewardPerTask = () => {
    const pool = parseFloat(form.rewardPool);
    const participants = parseInt(form.maxParticipants, 10);
    if (!isNaN(pool) && !isNaN(participants) && participants > 0) {
      return (pool / participants).toFixed(6);
    }
    return "";
  };

  // now accepts questData as an argument
  // This allows for more flexibility in handling the quest creation logic
  const handleSubmit = async (questData: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/quests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(questData),
      });
      if (res.ok) {
        return "success";
      } else {
        setError("Error al crear el quest");
      }
    } catch (err) {
      setError("Error de red");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    setForm,
    handleChange,
    handleSubmit, // ahora acepta questData
    calculateRewardPerTask,
    loading,
    error,
  };
}