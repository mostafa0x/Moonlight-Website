import React, { useEffect, useState } from "react";

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  //custom breakpoint for website  normal value 764px
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
};
