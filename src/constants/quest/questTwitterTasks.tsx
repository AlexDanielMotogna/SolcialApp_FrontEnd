import { ThumbsUp, Repeat2, MessageCircle, UserPlus, Quote } from "lucide-react";

export const taskOptions = [
  {
    key: "like",
    label: "Like Tweet",
    description: "User must like the tweet",
    icon: <ThumbsUp className="w-6 h-6 text-purple-400" />,
  },
  {
    key: "retweet",
    label: "Retweet",
    description: "User must retweet the post",
    icon: <Repeat2 className="w-6 h-6 text-purple-400" />,
  },
  {
    key: "comment",
    label: "Comment",
    description: "User must comment the tweet",
    icon: <MessageCircle className="w-6 h-6 text-purple-400" />,
  },
  {
    key: "follow",
    label: "Follow Account",
    description: "User must follow the account",
    icon: <UserPlus className="w-6 h-6 text-purple-400" />,
  },
  {
    key: "quote",
    label: "Quote Tweet",
    description: "User must quote the tweet with their own message",
    icon: <Quote className="w-6 h-6 text-purple-400" />,
  },
];
export const questTwitterTasks = {
  like: true,
  retweet: true,
  comment: true,
  follow: true,
  quote: true,
};