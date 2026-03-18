export default function Page() {
  return (
    <div className="flex justify-center items-center w-full h-screen pt-20 px-6.25 pb-7.5">
      <div className="flex flex-col max-h-[80vh] scrollbar-custom overflow-y-auto px-6.25 py-9 gap-4 md:gap-6 bg-black w-107 md:w-157 rounded-lg">
        <h1 className="text-[#F2C975] font-bold text-4xl mb-5.5">
          Privacy Policy
        </h1>

        <span className="text-base text-[#888888] flex justify-end items-end">
          Effective Date: March 2026
        </span>

        <h2 className="text-white font-semibold text-base">
          At Moonlight, one of our main priorities is the privacy of our
          visitors. This Privacy Policy document contains types of information
          that is collected and recorded by Moonlight and how we use it.
        </h2>

        <div className="flex flex-col gap-2">
          <h3 className="text-[#F2C975] font-semibold text-lg">
            1. Information We Collect
          </h3>
          <p className="text-[#888888] text-sm">
            We only collect personal information that you voluntarily provide to
            us when you inquire about our services or book a tour. This may
            include:
          </p>

          <ul className="list-disc pl-5 text-[#888888] text-sm flex flex-col gap-1">
            <li>
              <span className="text-white font-medium">
                Identification Data:
              </span>
              Name and nationality.
            </li>
            <li>
              <span className="text-white font-medium">Contact Data:</span>{" "}
              Email address and phone number (WhatsApp).
            </li>
            <li>
              <span className="text-white font-medium">Travel Data:</span>{" "}
              Preferences, dates of travel, and number of guests.
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-[#F2C975] font-semibold text-lg">
            2. How We Use Your Information
          </h3>

          <ul className="list-disc pl-5 text-[#888888] text-sm flex flex-col gap-1">
            <li>Provide, operate, and maintain our website.</li>
            <li>
              Communicate with you to plan and customize your Egyptian tour.
            </li>
            <li>
              Send you booking confirmations and essential travel updates.
            </li>
            <li>Improve your experience on our website.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-[#F2C975] font-semibold text-lg">
            3. Data Security & Sharing
          </h3>

          <ul className="list-disc pl-5 text-[#888888] text-sm flex flex-col gap-1">
            <li>
              <span className="text-white font-medium">
                No Third-Party Sharing:
              </span>
              We do not sell, rent, or share your personal information with
              third parties for marketing purposes.
            </li>
            <li>
              <span className="text-white font-medium">Service Providers:</span>{" "}
              Your data is only shared with essential service providers (e.g.,
              Nile Cruise operators or hotel bookings) only when necessary to
              fulfill your tour reservation.
            </li>
            <li>
              <span className="text-white font-medium">Protection:</span> We
              implement standard security measures to protect your data from
              unauthorized access.
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-[#F2C975] font-semibold text-lg">4. Log Files</h3>
          <p className="text-[#888888] text-sm">
            Moonlight follows a standard procedure of using log files. These
            files log visitors when they visit websites. The information
            collected includes internet protocol (IP) addresses, browser type,
            and date/time stamps. These are not linked to any information that
            is personally identifiable.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-[#F2C975] font-semibold text-lg">
            5. Your Data Rights
          </h3>

          <ul className="list-disc pl-5 text-[#888888] text-sm flex flex-col gap-1">
            <li>Request a copy of the personal data we hold about you.</li>
            <li>
              Request that we correct any information you believe is inaccurate.
            </li>
            <li>
              Request that we delete your personal data after your tour is
              completed.
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="text-[#F2C975] font-semibold text-lg">6. Consent</h3>
          <p className="text-[#888888] text-sm">
            By using our website, you hereby consent to our Privacy Policy and
            agree to its terms.
          </p>
        </div>
      </div>
    </div>
  );
}
