import fetch from "node-fetch";

const BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAKX93AEAAAAA3mXOV8E5GZtA61Joz13WzbhwAyQ%3DogsYgXz3woxBT6MQl9XvHF1U0bZNxxsGiLJyLWBmz83zSurUz3";
const conversationId = "1877880166749192556";

async function getReplies() {
  const res = await fetch(
    `https://api.twitter.com/2/tweets/search/recent?query=conversation_id:${conversationId}&tweet.fields=in_reply_to_user_id,author_id,created_at,text`,
    {
      headers: {
        Authorization: `Bearer ${BEARER_TOKEN}`,
      },
    }
  );
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

getReplies();
