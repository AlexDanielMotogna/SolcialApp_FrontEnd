import fetch from "node-fetch";

const BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAAKX93AEAAAAA3mXOV8E5GZtA61Joz13WzbhwAyQ%3DogsYgXz3woxBT6MQl9XvHF1U0bZNxxsGiLJyLWBmz83zSurUz3";
const tweetId = "1877880166749192556";

async function getTweetAuthor() {
  console.log("🔍 Obteniendo autor del tweet:", tweetId);
  
  try {
    const res = await fetch(
      `https://api.twitter.com/2/tweets/${tweetId}?tweet.fields=author_id`,
      {
        headers: {
          Authorization: `Bearer ${BEARER_TOKEN}`,
        },
      }
    );
    
    console.log("📊 Status:", res.status, res.statusText);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error("❌ Error:", errorText);
      return;
    }
    
    const data = await res.json();
    console.log("✅ Respuesta completa:");
    console.log(JSON.stringify(data, null, 2));
    
    if (data.data) {
      console.log("\n👤 Autor real del tweet:", data.data.author_id);
      console.log("🆔 Tweet ID:", data.data.id);
      console.log("📝 Texto del tweet:", data.data.text);
    }
  } catch (error) {
    console.error("❌ Error:", error);
  }
}

getTweetAuthor();