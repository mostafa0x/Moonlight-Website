export default function Page() {
  return (
    <div className="flex justify-center items-center w-full h-full pt-20 px-6.25 pb-7.5">
      <div className="flex flex-col h-full px-6.25 py-9 gap-6 scrollbar-custom overflow-y-auto  bg-black w-107 md:w-157">
        <h1 className="text-[#F2C975] font-bold text-4xl">About Moonlight</h1>

        <h2 className="text-white font-semibold text-base">
          Your Guide to the Magic of Egyptian History
        </h2>

        <div className="flex flex-col gap-2">
          <h3 className="text-[#F2C975] font-semibold text-lg">Who We Are</h3>
          <p className="text-[#888888] text-sm md:text-base">
            At Moonlight, we don’t just offer tours; we take you on a journey
            through time. Born out of a deep passion for Egypt's magnificent
            history, Moonlight was created to provide a personalized travel
            experience that goes beyond the ordinary, making every visit to
            ancient landmarks a story to remember.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-[#F2C975] font-semibold text-lg">What We Do</h3>

          <p className="text-[#888888] text-sm md:text-base">
            We specialize in organizing and managing bespoke tours within Egypt,
            focusing on the archaeological treasures and museums that defined
            civilization:
          </p>

          <ul className="list-disc pl-5 text-[#888888] text-sm md:text-base flex flex-col gap-1">
            <li>
              <span className="text-white font-medium">Cairo & Giza:</span>{" "}
              Enchanting tours of the Great Pyramids, the Saladin Citadel, and
              world-class museums.
            </li>

            <li>
              <span className="text-white font-medium">Alexandria:</span>{" "}
              Exploring the "Bride of the Mediterranean" and its unique
              Greco-Roman heritage.
            </li>

            <li>
              <span className="text-white font-medium">Nile Cruises:</span> A
              serene experience sailing the eternal Nile, surrounded by
              thousands of years of history.
            </li>

            <li>
              <span className="text-white font-medium">Coming Soon:</span>{" "}
              Expanding our horizons to the golden sands and magic of Luxor and
              Aswan.
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-[#F2C975] font-semibold text-lg">
            Why Moonlight?
          </h3>

          <p className="text-[#888888] text-sm md:text-base">
            We believe that great travel is all about the details. We
            meticulously plan every step of your trip to ensure comfort, safety,
            and insightful discovery. Whether you are looking for an educational
            museum tour or a peaceful Nile cruise under the moonlight, we are
            here to make it happen with professionalism and heart.
          </p>
        </div>
      </div>
    </div>
  );
}
