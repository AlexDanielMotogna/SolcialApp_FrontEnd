import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaDiscord, FaTelegram, FaTwitter } from "react-icons/fa";
import AdsCard from "@/components/AdsCard";

const features = [
  {
    title: "The best (and easiest!) way to showcase your token to the world!",
    desc: "Your project's logo and socials can be displayed on Solcial front and center, so traders can easily spot and interact with it!",
  },
  {
    title: "Fits any budget",
    desc: "Starts at just $299 – no surprise, know upfront exactly how many impressions your banner will get and renew at any time!",
  },
  {
    title: "Your community will love it!",
    desc: "We'll let them know you have an active ad campaign on Solcial!",
  },
];

const steps = [
  {
    title: "Tell us about your token",
    desc: "All we need is token address, description and links",
  },
  {
    title: "Pay",
    desc: "Pick a budget that works for you. All major cryptocurrencies and credit/debit cards accepted",
  },
  {
    title: "Wait for processing",
    desc: "Most orders are processed within just a few minutes!",
  },
  {
    title: "Done!",
    desc: "Your ad will start running on the Solcial website and apps!",
  },
];

export default function AdvertisingPage() {
  return (
    <div className="min-h-screen bg-[#161618] text-white flex flex-col">
      {/* Header */}
      <header className="w-full px-4 md:px-0 max-w-7xl mx-auto pt-12 pb-6 flex flex-col items-center relative">
        {/* My Profile Button Top Left */}
        <div className="absolute left-0 top-0 mt-20 ml-2">
          <a
            href="/dashboard/profile"
            className="bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-3 px-6 rounded-xl text-base shadow transition"
          >
            My Profile
          </a>
        </div>
        <div className="w-full flex flex-col items-center gap-2">
          <div className="text-sm text-[#A3A3A3]">Home / Token Advertising</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-center">
            Token Advertising
          </h1>
          <p className="text-lg text-[#A3A3A3] text-center max-w-2xl">
            Advertise your token on Solcial and give it the exposure it deserves
          </p>
          <Link
            href="/dashboard/adversting/completeFormular"
            passHref
            legacyBehavior
          >
            <a className="mt-6 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-bold py-3 px-8 rounded-xl text-lg shadow-lg transition block text-center">
              Order Now – from $299.00
            </a>
          </Link>
          <div className="flex gap-4 mt-4 text-[#A3A3A3] text-xl">
            <FaDiscord className="hover:text-[#5865F2] cursor-pointer" />
            <FaTelegram className="hover:text-[#229ED9] cursor-pointer" />
            <FaTwitter className="hover:text-[#1DA1F2] cursor-pointer" />
            <span className="text-xs ml-2">Pay with crypto</span>
          </div>
        </div>
      </header>

      {/* Main Content Horizontal Layout */}
      <main className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-start justify-center px-4 md:px-0 mt-8">
        {/* Preview Card */}
        <div className="flex-1 flex items-center justify-center">
          <AdsCard />
        </div>
        {/* Info Section */}
        <div className="flex-1 flex flex-col gap-10">
          <section>
            <p className="text-xl text-left text-[#A3A3A3] max-w-2xl mb-6">
              Put that marketing budget to good use and get your token in front
              of{" "}
              <span className="text-white font-bold">millions of people!</span>
            </p>
            <div className="flex flex-col gap-8">
              {features.map((f, i) => (
                <div key={i} className="max-w-2xl">
                  <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                  <p className="text-[#A3A3A3] text-base">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>
          <section className="bg-[#10131A] rounded-2xl p-8">
            <h2 className="text-3xl font-extrabold mb-8">How does it work?</h2>
            <div className="flex flex-col md:flex-row gap-8 w-full max-w-4xl justify-start">
              {steps.map((step, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center flex-1"
                >
                  <div className="w-12 h-12 rounded-full bg-[#23232A] flex items-center justify-center text-2xl font-bold mb-4 border-2 border-[#3B82F6]">
                    {i + 1}
                  </div>
                  <h4 className="font-bold text-lg mb-2">{step.title}</h4>
                  <p className="text-[#A3A3A3] text-base">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full flex flex-col items-center py-8 mt-auto bg-transparent">
        <div className="flex gap-6 mb-4 text-2xl text-[#A3A3A3]">
          <FaDiscord className="hover:text-[#5865F2] cursor-pointer" />
          <FaTelegram className="hover:text-[#229ED9] cursor-pointer" />
          <FaTwitter className="hover:text-[#1DA1F2] cursor-pointer" />
        </div>
        <div className="text-[#A3A3A3] text-sm">© 2025 Solcial, Inc.</div>
      </footer>
    </div>
  );
}
