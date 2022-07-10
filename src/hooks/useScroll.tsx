import { useState, useCallback, useEffect } from "react";

const useScroll = (disable?: boolean) => {
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrollUp, setIsScrollUp] = useState(true);

  const controlScroll = useCallback(() => {
    if (disable) {
      return;
    }

    if (typeof window !== "undefined") {
      setIsScrollUp(window.scrollY < lastScrollY);
      setLastScrollY(window.scrollY);
    }
  }, [lastScrollY, disable]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlScroll);

      return () => {
        window.removeEventListener("scroll", controlScroll);
      };
    }
  }, [controlScroll]);

  return isScrollUp;
};

export default useScroll;
