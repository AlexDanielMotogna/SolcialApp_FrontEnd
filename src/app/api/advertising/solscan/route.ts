import { log } from "console";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get("address");

  if (!address) {
    return new Response(JSON.stringify({ error: "Missing address" }), { status: 400 });
  }

  // Remplace par ta clé API Solscan
  const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjcmVhdGVkQXQiOjE3MzQ5MTgwMDEyODcsImVtYWlsIjoic29sY2lhbGNvbXBhbnlAZ21haWwuY29tIiwiYWN0aW9uIjoidG9rZW4tYXBpIiwiYXBpVmVyc2lvbiI6InYyIiwiaWF0IjoxNzM0OTE4MDAxfQ.fLuyXbIfJphPMRfGJVPwO5Cdmwyf3U-VGFqPJgXqRcY";
  const solscanUrl = `https://pro-api.solscan.io/v2.0/token/meta?address=${address}`;

  try {
    const solscanRes = await fetch(solscanUrl, {
      headers: { token: apiKey },
    });
    const data = await solscanRes.json();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (e) {
    console.log("Error fetching from Solscan:", e);
    return new Response(JSON.stringify({ error: "Solscan fetch failed" }), { status: 500 });
  }
}