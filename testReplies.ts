import fetch from "node-fetch";

const BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAKX93AEAAAAAZb54aXbIzCKjV2fF2XlEMSeTqyY%3DUtqDM8h6PaCPme0Z2ptfROvCwtsI9pRnIpB78Y466Km0ZmBL97";
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
