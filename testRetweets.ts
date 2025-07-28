// testRetweets.ts
import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
dotenv.config({ path: ".env.local" }); 

const userId = '1677425439445229568'; // ← REEMPLAZA por el userId del que quieres verificar
const tweetId = '1877880166749192556'; // ← ID del tweet original que debería estar retweeteado

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY!,
  appSecret: process.env.TWITTER_API_SECRET!,
  accessToken: process.env.TWITTER_ACCESS_TOKEN!,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET!,
});

(async () => {
  try {
    const timeline = await client.v2.userTimeline(userId, {
      max_results: 100,
      'tweet.fields': 'referenced_tweets',
    });

    const tweets = timeline.data?.data ?? [];

    console.log(`🔎 Analizando timeline de userId ${userId}`);
    console.log("Tweets encontrados:", tweets.length);

    const hasRetweet = tweets.some(tweet =>
      tweet.referenced_tweets?.some(ref =>
        ref.type === 'retweeted' && ref.id === tweetId
      )
    );

    console.log("✅ ¿Ha hecho retweet?", hasRetweet);
  } catch (error) {
    console.error("❌ Error verificando retweet:", error);
  }
})();
