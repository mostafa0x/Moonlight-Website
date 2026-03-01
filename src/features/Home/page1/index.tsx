import React from "react";

export default function Page1() {
  return (
    <div className="w-full h-full">
      <video
        src={"/videos/heroSection.webm"}
        muted
        loop
        autoPlay
        aria-label=" "
        className=" w-full h-full object-cover lg:object-fill"
      />
    </div>
  );
}
