import React from "react";
import { formatMoney } from "@/utils/decimal";
import LinkIcon from "../../public/icons/LinkIcon";

type Token = {
  rank: number;
  imageUrl: string;
  name: string;
  symbol: string;
  boosts: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  launchDate?: string;
  links?: {
    x?: string;
    telegram?: string;
    coinmarketcap?: string;
    discord?: string;
    website?: string;
  };
};

const LinkBubble: React.FC<{
  href: string;
  label: string;
  children: React.ReactNode;
}> = ({ href, label, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    title={label}
    className="inline-flex items-center justify-center p-2 rounded-md bg-white/5 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20"
  >
    {children}
  </a>
);

interface DynamicListProps {
  tokens: any[];
}

const DynamicList: React.FC<DynamicListProps> = ({ tokens }) => {
  const rows = tokens.slice(0, 50);
  return (
    <div className="w-full max-w-6xl mx-auto overflow-auto rounded-3xl bg-zinc-950 text-zinc-100 shadow-2xl border border-[#232326] min-w-[900px]">
      <div className="p-6 pb-0">
        <h2 className="text-2xl font-bold text-white mb-1">Boosted Tokens</h2>
        <p className="text-base text-zinc-400 mb-2">
          Up to 50 tokens • Sorted by rank
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className=" border-separate border-spacing-0">
          <thead className="sticky top-0 bg-zinc-950/95 backdrop-blur z-10">
            <tr className="[&>th]:py-4 [&>th]:px-4 text-left text-lg text-zinc-400 font-semibold">
              <th className="w-16">#</th>
              <th className="w-20">Image</th>
              <th className="min-w-[150px]">Token Name</th>
              <th className="w-28">Boosts</th>
              <th className="w-40">24H Change</th>
              <th className="w-40">Market Cap</th>
              <th className="w-40">Volume 24H</th>
              <th className="w-40">Launch Date</th>
              <th className="min-w-[50px]">Links</th>
            </tr>
          </thead>
          <tbody className="text-base">
            {rows.map((t: Token) => {
              const pos: boolean = t.change24h >= 0;
              const L: NonNullable<Token["links"]> = t.links || {};
              interface LinkItem {
                key: keyof NonNullable<Token["links"]>;
                href: string;
                label: string;
              }
              const linkItems: LinkItem[] = [
                L.x && { key: "x", href: L.x, label: "X (Twitter)" as const },
                L.telegram && {
                  key: "telegram",
                  href: L.telegram,
                  label: "Telegram" as const,
                },
                L.coinmarketcap && {
                  key: "coinmarketcap",
                  href: L.coinmarketcap,
                  label: "CoinMarketCap" as const,
                },
                L.discord && {
                  key: "discord",
                  href: L.discord,
                  label: "Discord" as const,
                },
                L.website && {
                  key: "website",
                  href: L.website,
                  label: "Website" as const,
                },
              ].filter(Boolean) as LinkItem[];

              return (
                <tr
                  key={`${t.rank}-${t.symbol}`}
                  className="border-b border-white/10 hover:bg-white/5 transition"
                >
                  <td className="py-4 px-4 font-bold text-lg">{t.rank}</td>
                  <td className="py-4 px-4">
                    <img
                      src={t.imageUrl}
                      alt={`${t.name} logo`}
                      className="w-12 h-12 rounded-full object-cover bg-zinc-800 border border-zinc-700 shadow"
                    />
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-semibold text-white">
                      {t.name}{" "}
                      <span className="text-zinc-400 font-normal">
                        ({t.symbol})
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="inline-flex items-center gap-2">
                      <span className="text-yellow-400 font-bold">
                        {t.boosts}
                      </span>
                      <span className="text-yellow-400 text-lg">⚡</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={
                        pos
                          ? "text-emerald-400 font-semibold"
                          : "text-red-400 font-semibold"
                      }
                    >
                      {pos ? "↑" : "↓"} {Math.abs(t.change24h).toFixed(2)}%
                    </span>
                  </td>
                  <td className="py-4 px-4 font-mono">
                    {formatMoney(t.marketCap)}
                  </td>
                  <td className="py-4 px-4 font-mono">
                    {formatMoney(t.volume24h)}
                  </td>
                  <td className="py-4 px-4">
                    {t.launchDate ? (
                      <span className="text-zinc-300">{t.launchDate}</span>
                    ) : (
                      <span className="text-zinc-500">N/A</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3 min-w-[150px] flex-wrap">
                      {linkItems.length === 0 ? (
                        <span className="text-zinc-500">No links provided</span>
                      ) : (
                        linkItems.map((li) => (
                          <LinkBubble
                            key={li.key}
                            href={li.href}
                            label={li.label}
                          >
                            <LinkIcon type={li.key} />
                          </LinkBubble>
                        ))
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="p-4 text-sm text-zinc-500 border-t border-white/10">
        Showing {rows.length} token{rows.length === 1 ? "" : "s"} (max 50). This
        can be deleted later its just for testing.
      </div>
    </div>
  );
};

export default DynamicList;

// Usage example in a parent component:
// <DynamicList tokens={fakeTokens} />
