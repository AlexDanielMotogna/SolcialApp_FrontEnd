// Quest status design utility for consistent badge styles

export interface QuestStatusDesign {
  bg: string;
  border: string;
  dot: string;
  text: string;
  label: string;
}

export interface GetStatusDesignParams {
  quest: { status?: string };
  isCanceled: boolean;
  isExpired: boolean;
  isUrgent: boolean;
}

export const getStatusDesign = ({ quest, isCanceled, isExpired, isUrgent }: GetStatusDesignParams): QuestStatusDesign => {
  if (isCanceled) {
    return {
      bg: 'bg-red-600 bg-opacity-90',
      border: 'border-red-500',
      dot: 'bg-red-100',
      text: 'text-white',
      label: 'Canceled',
    };
  }

  if (isExpired) {
    return {
      bg: 'bg-yellow-600 bg-opacity-90',
      border: 'border-yellow-500',
      dot: 'bg-yellow-100',
      text: 'text-white',
      label: 'Finished',
    };
  }

  if (quest.status?.toLowerCase() === 'finished') {
    return {
      bg: 'bg-yellow-600 bg-opacity-90',
      border: 'border-yellow-500',
      dot: 'bg-yellow-100',
      text: 'text-white',
      label: 'Finished',
    };
  }

  if (quest.status?.toLowerCase() === 'active') {
    return {
      bg: 'bg-green-600 bg-opacity-90',
      border: 'border-green-500',
      dot: 'bg-green-100',
      text: 'text-white',
      label: 'Active',
    };
  }

  return {
    bg: isUrgent ? 'bg-red-600 bg-opacity-90' : 'bg-gray-700 bg-opacity-90',
    border: isUrgent ? 'border-red-500' : 'border-gray-500',
    dot: isUrgent ? 'bg-red-100 animate-pulse' : 'bg-gray-100',
    text: 'text-white',
    label: quest.status || 'Active',
  };
};
