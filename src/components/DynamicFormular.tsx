"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import BannerUpload from "@/components/BannerUpload";
import { useTranslation } from "react-i18next";
import { request } from "http";

const adPackages = [
  { views: "10k", price: "$299.00" },
  { views: "25k", price: "$599.00" },
  { views: "50k", price: "$999.00" },
  { views: "100k", price: "$1,999.00" },
  { views: "200k", price: "$3,999.00" },
  { views: "500k", price: "$5,999.00" },
];

export default function DynamicFormular() {
  const { t } = useTranslation();

  const [chain, setChain] = useState("Solana");
  const [tokenAddress, setTokenAddress] = useState("");
  const [tokenValid, setTokenValid] = useState<null | boolean>(null);

  const [selectedPackage, setSelectedPackage] = useState(0);
  const [title, setTitle] = useState("");
  const [pitch, setPitch] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [links, setLinks] = useState({
    website: "",
    x: "",
    telegram: "",
    discord: "",
  });
  const [discordUsername, setDiscordUsername] = useState("");
  const [telegramUsername, setTelegramUsername] = useState("");
  const [agree1, setAgree1] = useState(false);
  const [agree2, setAgree2] = useState(false);

  // Image upload handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  useEffect(() => {
    if(!tokenAddress) {
      setTokenValid(null);
      return;
    }

    const timeout = setTimeout(() => {
    // ...existing code...
    fetch(`/api/advertising/solscan?address=${tokenAddress}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Solscan data:", data);
        
        if (data?.success == true) {
          setTokenValid(true);
        } else {
          setTokenValid(false);
        }
      })
      .catch(() => setTokenValid(false));
    // ...existing code...
        }, 600);

    return () => clearTimeout(timeout);
  }, [tokenAddress]);

  return (
    <form className="w-full max-w-3xl mx-auto bg-gradient-to-br from-[#18181B] via-[#23232A] to-[#161618] rounded-3xl shadow-2xl p-10 flex flex-col gap-10 text-white border border-[#23232A] backdrop-blur-lg">
      <h2 className="text-4xl font-extrabold mb-10 text-center bg-gradient-to-r from-[#3B82F6] via-[#9945FF] to-[#14F195] bg-clip-text text-transparent drop-shadow-lg">
        Token Advertising
      </h2>
      {/* Chain & Token Address */}
      <div className="flex flex-col gap-4 bg-[#23232A]/60 rounded-xl p-6 shadow-inner">
        <label className="font-semibold text-xl">Chain</label>
        <select
          value={chain}
          onChange={(e) => setChain(e.target.value)}
          className="bg-[#18181B] text-white rounded-xl p-3 border-2 border-[#3B82F6] focus:border-[#9945FF] transition-colors shadow"
        >
          <option value="Solana">Solana</option>
        </select>
        <label className="font-semibold mt-6 text-xl">Token Address</label>
        <input
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          className="bg-[#18181B] text-white rounded-xl p-3 border-2 border-[#3B82F6] focus:border-[#9945FF] transition-colors shadow"
          placeholder="Enter token address..."
        />
        {tokenValid === true && (
        <span className="text-sm text-[#22C55E] mt-2">
          {t("valid_token_address")}
          
        </span>
        )}
        {tokenValid === false && (
          <span className="text-sm text-[#EA3030] mt-2">
          {t("invalid_token_address")}
          </span>
        )}
      </div>

      {/* Ad Packages */}
      <div className="flex flex-col gap-2 mt-6">
        <label className="font-semibold text-xl">Ad info</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-2">
          {adPackages.map((pkg, i) => (
            <button
              key={i}
              type="button"
              className={`rounded-2xl p-6 border-2 font-bold text-lg transition flex flex-col items-center justify-center shadow-lg ${
                selectedPackage === i
                  ? "bg-gradient-to-r from-[#3B82F6] to-[#9945FF] text-white border-[#9945FF] scale-105"
                  : "bg-[#23232A]/80 text-[#A3A3A3] border-[#44444A] hover:bg-gradient-to-r hover:from-[#23232A] hover:to-[#18181B]"
              }`}
              onClick={() => setSelectedPackage(i)}
            >
              <span className="tracking-wide text-lg">{pkg.views} views</span>
              <span className="text-base font-normal mt-2">{pkg.price}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Title & Pitch */}
      <div className="flex flex-col gap-4 mt-6 bg-[#23232A]/60 rounded-xl p-6 shadow-inner">
        <label className="font-semibold text-xl">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={48}
          className="bg-[#18181B] text-white rounded-xl p-3 border-2 border-[#3B82F6] focus:border-[#9945FF] transition-colors shadow"
          placeholder="Title..."
        />
        <label className="font-semibold mt-4 text-xl">Pitch</label>
        <input
          value={pitch}
          onChange={(e) => setPitch(e.target.value)}
          maxLength={270}
          className="bg-[#18181B] text-white rounded-xl p-3 border-2 border-[#3B82F6] focus:border-[#9945FF] transition-colors shadow"
          placeholder="A short description of your project to get people interested"
        />
      </div>

      {/* Image Upload */}
      <div className="flex flex-col gap-2 mt-6 bg-[#23232A]/60 rounded-xl p-6 shadow-inner">
        <label className="font-semibold text-xl">Image</label>
        <span className="text-sm text-[#A3A3A3] mb-4">
          Image ratio: 1:1 (e.g. 500x500px). Max file size: 4MB. Supported
          formats: PNG, JPG, JPEG, WebP.
        </span>
        <BannerUpload onImageUpload={(img) => setImage(img?.url || null)} />
        {image && (
          <div className="mt-4 flex flex-col items-center">
            <Image
              src={image}
              alt="Preview"
              width={80}
              height={80}
              className="rounded-xl shadow-lg border-2 border-[#9945FF]"
            />
            <button
              type="button"
              className="mt-2 text-[#EA3030] text-xs underline"
              onClick={() => setImage(null)}
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Links */}
      <div className="flex flex-col gap-2 mt-6 bg-[#23232A]/60 rounded-xl p-6 shadow-inner">
        <label className="font-semibold text-xl">Links</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <input
            value={links.website}
            onChange={(e) =>
              setLinks((l) => ({ ...l, website: e.target.value }))
            }
            className="bg-[#18181B] text-white rounded-xl p-4 border-2 border-[#3B82F6] focus:border-[#9945FF] transition-colors shadow text-base"
            placeholder="Add Website"
          />
          <input
            value={links.x}
            onChange={(e) => setLinks((l) => ({ ...l, x: e.target.value }))}
            className="bg-[#23232A] text-white rounded-xl p-4 border border-[#44444A] text-base"
            placeholder="Add X"
          />
          <input
            value={links.telegram}
            onChange={(e) =>
              setLinks((l) => ({ ...l, telegram: e.target.value }))
            }
            className="bg-[#23232A] text-white rounded-xl p-3 border border-[#44444A]"
            placeholder="Add Telegram"
          />
          <input
            value={links.discord}
            onChange={(e) =>
              setLinks((l) => ({ ...l, discord: e.target.value }))
            }
            className="bg-[#23232A] text-white rounded-xl p-3 border border-[#44444A]"
            placeholder="Add Discord"
          />
        </div>
      </div>

      {/* Preview */}
      <div className="flex flex-col gap-2 mt-6">
        <label className="font-semibold text-xl">Preview</label>
        <div className="flex items-center justify-center bg-gradient-to-br from-[#18181B] via-[#23232A] to-[#161618] rounded-xl p-8 shadow-lg">
          <div className="flex flex-col items-center gap-2">
            <span className="font-bold text-white text-2xl">
              {title || "Preview"}
            </span>
            <span className="text-sm text-[#A3A3A3]">
              {pitch || "A short description will appear here."}
            </span>
            <button className="bg-gradient-to-r from-[#3B82F6] to-[#9945FF] text-white font-bold py-3 px-8 rounded-xl text-lg shadow-lg transition mt-4 hover:scale-105">
              In Chart
            </button>
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col gap-2 mt-6 bg-[#23232A]/60 rounded-xl p-6 shadow-inner">
        <label className="font-semibold text-xl">
          Contact Info{" "}
          <span className="text-[#A3A3A3] text-sm">(optional)</span>
        </label>
        <input
          value={discordUsername}
          onChange={(e) => setDiscordUsername(e.target.value)}
          className="bg-[#18181B] text-white rounded-xl p-4 border-2 border-[#3B82F6] focus:border-[#9945FF] transition-colors shadow text-base"
          placeholder="Discord Username"
        />
        <input
          value={telegramUsername}
          onChange={(e) => setTelegramUsername(e.target.value)}
          className="bg-[#18181B] text-white rounded-xl p-4 border-2 border-[#3B82F6] focus:border-[#9945FF] transition-colors shadow text-base"
          placeholder="Telegram Username"
        />
      </div>

      {/* Order Summary */}
      <div className="flex flex-col gap-2 mt-6 bg-[#23232A]/60 rounded-xl p-6 shadow-inner">
        <label className="font-semibold text-xl">Order summary</label>
        <div className="bg-gradient-to-br from-[#18181B] via-[#23232A] to-[#161618] rounded-xl p-6 flex flex-col gap-2 shadow-lg">
          <div className="flex justify-between text-[#A3A3A3] text-lg font-bold">
            <span>Token Advertising</span>
            <span>{adPackages[selectedPackage].price}</span>
          </div>
          <span className="text-sm text-[#A3A3A3] font-semibold">
            {adPackages[selectedPackage].views} views
          </span>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={agree1}
              onChange={(e) => setAgree1(e.target.checked)}
            />
            I understand that all supplied data must be verifiable through
            official channels such as websites and socials.
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={agree2}
              onChange={(e) => setAgree2(e.target.checked)}
            />
            I understand and accept that Solcial reserves the right to reject or
            modify the provided information.
          </label>
        </div>
        <button
          type="submit"
          className="mt-8 bg-gradient-to-r from-[#3B82F6] to-[#9945FF] hover:from-[#2563EB] hover:to-[#9945FF] text-white font-extrabold py-4 px-12 rounded-2xl text-2xl shadow-xl transition-all duration-200 scale-100 hover:scale-105 tracking-wide"
          disabled={!agree1 || !agree2}
        >
          Order Now
        </button>

        <footer className="text-sm text-[#A3A3A3] mt-8 py-8 text-center font-bold tracking-wide">
          Powered by Solcial
        </footer>
      </div>
    </form>
  );
}
