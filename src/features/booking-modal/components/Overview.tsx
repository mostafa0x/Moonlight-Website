import { memo } from "react";

function Overview() {
  return (
    <div>
      <h2 className="text-[20px] text-[#F2C975] font-medium">Overview</h2>
      <p className="text-[16px] text-[#E0E0E0] font-medium">
        Experience the majesty of the ancient world with our exclusive VIP tour
        of the Giza Plateau. Enjoy skip-the-line access, a private Egyptologist
        guide, and a luxurious camel ride at sunset.
      </p>
    </div>
  );
}
export default memo(Overview);
