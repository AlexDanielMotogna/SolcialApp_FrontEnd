import { useState } from "react";

export function useCreateQuest(initialForm: any, onClose: () => void) {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // Prepara los datos correctamente antes de enviar
      const dataToSend = {
      questName: form.questName,
      description: form.description,
      banner: "", // o form.banner si luego implementas imágenes
      maxParticipants: Number(form.maxParticipants),
      rewardPool: Number(form.rewardPool),
      startDate: form.startDate,
      startTime: form.startTime,
      endDate: form.endDate,
      endTime: form.endTime,
      tasks: {
        like: form.tasks.like,
        retweet: form.tasks.retweet,
        comment: form.tasks.comment,
        follow: form.tasks.follow,
        quote: form.tasks.quote,
      },
    };

      const res = await fetch("/api/quests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
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
    handleSubmit,
    calculateRewardPerTask,
    loading,
    error,
  };
}