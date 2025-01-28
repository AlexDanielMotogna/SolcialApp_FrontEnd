"use client";

import { useState } from "react";
import EventCard from "../../../components/EventCard";
import TournamentsCard from "../../../components/TournamentsCard";
import EventModal from "@/components/modals/EventModal";

const Events: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'events' | 'tournaments'>('events');

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const eventData = [
    {
      title: "Event Title",
      description: "Event Description will be here",
      startDate: "January 10, 2025",
      endDate: "January 10, 2025",
      price: 25,
      priceUnit: "SOL",
      liveText: "LIVE",
      liveBgColor: "#C65468",
    },
    {
      title: "Event Title",
      description: "Event Description will be here",
      startDate: "January 10, 2025",
      endDate: "January 10, 2025",
      price: 25,
      priceUnit: "SOL",
      liveText: "Upcoming",
      liveBgColor: "#7D52F4",
    },
    {
      title: "Event Title",
      description: "Event Description will be here",
      startDate: "January 10, 2025",
      endDate: "January 10, 2025",
      price: 25,
      priceUnit: "SOL",
      liveText: "Ended",
      liveBgColor: "#44444A",
    },
    {
      title: "Event Title",
      description: "Event Description will be here",
      startDate: "January 10, 2025",
      endDate: "January 10, 2025",
      price: 25,
      priceUnit: "SOL",
      liveText: "Ended",
      liveBgColor: "#44444A",
    },
  ];

  const TournamentData = [
    {
      title: "Tournament Title",
      description: "Event Description will be here",
      startDate: "January 10, 2025",
      endDate: "January 10, 2025",
      price: 25,
      priceUnit: "SOL",
      liveText: "Upcoming",
      liveBgColor: "#7D52F4",
    },
    {
      title: "Tournament Title",
      description: "Tournament Description will be here",
      startDate: "January 10, 2025",
      endDate: "January 10, 2025",
      price: 25,
      priceUnit: "SOL",
      liveText: "LIVE",
      liveBgColor: "#C65468",
    },
    {
      title: "Tournament Title",
      description: "Tournament Description will be here",
      startDate: "January 10, 2025",
      endDate: "January 10, 2025",
      price: 25,
      priceUnit: "SOL",
      liveText: "Ended",
      liveBgColor: "#44444A",
    },
  ];

  const handleTabChange = (tab: 'events' | 'tournaments') => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full py-[1.8rem] px-[2.4rem] flex flex-col items-start justify-start gap-[2.4rem]">
      <div className="w-full grid grid-cols-2 md:hidden">
        <h5
          onClick={() => handleTabChange('events')}
          className={`w-full text-[1.4rem] py-5 px-5 border-b border-b-[#2C2C30] text-center text-[#ACB5BB] font-medium cursor-pointer ${
            activeTab === 'events' ? 'border-b-[#7D52F4] text-white border-b-2' : ''
          }`}
        >
          Events
        </h5>
        <h5
          onClick={() => handleTabChange('tournaments')}
          className={`w-full text-[1.4rem] py-5 px-5 border-b border-b-[#2C2C30] text-center text-[#ACB5BB] font-medium cursor-pointer ${
            activeTab === 'tournaments' ? 'border-b-[#7D52F4] text-white border-b-2' : ''
          }`}
        >
          Tournaments
        </h5>
      </div>

      <div className="w-full md:hidden">
        {activeTab === 'events' && (
          <div className="w-full grid grid-cols-1 gap-5">
            {eventData.map((event, index) => (
              <EventCard key={index} {...event} onJoin={openModal} />
            ))}
          </div>
        )}

        {activeTab === 'tournaments' && (
          <div className="w-full grid grid-cols-1 gap-5">
            {TournamentData.map((event, index) => (
              <TournamentsCard key={index} {...event} onJoin={openModal} />
            ))}
          </div>
        )}
      </div>

      <div className="hidden md:flex md:flex-col w-full gap-10">
        <div className="w-full">
          <h2 className="text-white font-semibold text-[2.4rem]">
            Master Events
          </h2>
          <h3 className="text-[#ACB5BB] text-[1.8rem]">
            Play in custom Events.
          </h3>
          <div className="w-full grid md:grid-cols-2 xl:grid-cols-4 gap-5 mt-5">
            {eventData.map((event, index) => (
              <EventCard key={index} {...event} onJoin={openModal} />
            ))}
          </div>
        </div>

        <div className="w-full">
          <h2 className="text-white font-semibold text-[2.4rem]">
            Tournaments
          </h2>
          <h3 className="text-[#ACB5BB] text-[1.8rem]">
            Play in custom tournaments.
          </h3>
          <div className="w-full grid md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
            {TournamentData.map((event, index) => (
              <TournamentsCard key={index} {...event} onJoin={openModal} />
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && <EventModal isOpen={isModalOpen} onClose={closeModal} />}
    </div>
  );
};

export default Events;
