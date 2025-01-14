// import { useState } from "react";
// import ArrowRight from "../../assets/icons/ArrowRight";
import EventCard from "../../../components/EventCard";
import TournamentsCard from "../../../components/TournamentsCard";

const Events: React.FC = () => {

    // const [isModalOpen, setIsModalOpen] = useState(false);
    
      // const openModal = () => {
      //   setIsModalOpen(true);
      // };
    
      // const closeModal = () => {
      //   setIsModalOpen(false);
      // };

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

  return (
    <div className="w-full py-[1.8rem] px-[2.4rem] flex flex-col items-start justify-start gap-[2.4rem]">
      <div className="w-full flex flex-col md:flex-row md:gap-8 items-center justify-between">
        <div className="w-full flex flex-col items-start justify-start gap-1">
          <h2 className="text-white font-semibold text-[2.4rem]">
            Master Events
          </h2>
          <h3 className="text-[#ACB5BB] text-[1.8rem]">
            Play in custom Events.
          </h3>
        </div>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-5">
        {eventData.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>

      <div className="w-full flex flex-col items-start justify-start gap-1">
        <h2 className="text-white font-semibold text-[2.4rem]">Tournaments</h2>
        <h3 className="text-[#ACB5BB] text-[1.8rem]">
          Play in custom tournaments.
        </h3>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-5">
        {TournamentData.map((event, index) => (
          <TournamentsCard key={index} {...event} />
        ))}
      </div>

      {/* {isModalOpen && (
        <div className="fixed inset-0 bg-[#000000] bg-opacity-60 flex justify-center items-center z-50">
          <div
            className="bg-[#161618] max-h-[90vh] overflow-y-auto flex flex-col items-start justify-start gap-6 border border-[#44444A] rounded-2xl shadow-[0px_2px_10px_-3px_rgba(0,0,0,0)]"
            style={{
              boxShadow: "0px -5px 10px 0px #FFFFFF1A inset",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div className="w-full p-8 border-b border-[#44444A] flex items-center justify-between">
              <h3 className="text-[1.8rem] text-white font-semibold">
                Social Media Engagement Quest
              </h3>

              <Close onClick={closeModal} />
            </div>

            <div className="w-full flex flex-col items-start justify-start gap-6 px-8">
              <img src={SocialMedia} className="w-full" />

              <div className="w-full flex flex-col items-start justify-start gap-1">
                <h4 className="text-white font-semibold text-[1.8rem]">
                  Social Media Engagement Quest
                </h4>
                <p className="text-[#ACB5BB] text-[1.4rem]">
                  Engage with our social media posts to win prizes.
                </p>
              </div>

              <div className="w-full flex flex-col items-start justify-start gap-[0.8rem]">
                <div className="w-full flex items-end justify-between bg-[#2C2C30] border border-[#44444A] rounded-lg px-4 py-[0.6rem]">
                  <span className="text-[1.4rem] text-[#ACB5BB]">Reward</span>
                  <p className="text-[#EDF1F3] font-semibold text-[1.4rem]">
                    500 SOL
                  </p>
                </div>
                <div className="w-full flex items-end justify-between bg-[#2C2C30] border border-[#44444A] rounded-lg px-4 py-[0.6rem]">
                  <span className="text-[1.4rem] text-[#ACB5BB]">
                    Start Date
                  </span>
                  <p className="text-[#EDF1F3] font-semibold text-[1.4rem]">
                    22/11/2024, 11:00:00
                  </p>
                </div>
                <div className="w-full flex items-end justify-between bg-[#2C2C30] border border-[#44444A] rounded-lg px-4 py-[0.6rem]">
                  <span className="text-[1.4rem] text-[#ACB5BB]">End Date</span>
                  <p className="text-[#EDF1F3] font-semibold text-[1.4rem]">
                    25/11/2024, 11:00:00
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col items-start justify-start px-8 gap-6">
              <h5 className="text-white text-[1.6rem] font-semibold">Tasks</h5>

              <div className="w-full flex flex-col items-start justify-start gap-[0.8rem]">
                <div className="w-full bg-[#2C2C30] p-5 flex items-center justify-between rounded-md border border-[#44444A]">
                  <div className="flex items-center justify-center gap-[0.6rem]">
                    <TwitterLg />
                    <p className="text-white font-medium text-[1.4rem]">
                      Like my twitter post
                    </p>
                  </div>

                  <ArrowRight />
                </div>

                <div className="w-full bg-[#2C2C30] p-5 flex items-center justify-between rounded-md border border-[#44444A]">
                  <div className="flex items-center justify-center gap-[0.6rem]">
                    <TwitterLg />
                    <p className="text-white font-medium text-[1.4rem]">
                      Follow my twitter page
                    </p>
                  </div>

                  <ArrowRight />
                </div>

                <div className="w-full bg-[#2C2C30] p-5 flex items-center justify-between rounded-md border border-[#44444A]">
                  <div className="flex items-center justify-center gap-[0.6rem]">
                    <TwitterLg />
                    <p className="text-white font-medium text-[1.4rem]">
                      Retweet my twitter post
                    </p>
                  </div>

                  <ArrowRight />
                </div>
              </div>
            </div>

            <div className="w-full border-t border-[#44444A] p-8">
              <Button text="Claim Reward" />
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Events;
