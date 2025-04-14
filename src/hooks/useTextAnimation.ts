import gsap from "gsap";
import useOnScreen from "./useOnScreen"; 

import { SplitText } from "@/lib/split-text"; 
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

export function useAnimatedText(initialVisible = false) {
  const textRef = useRef<HTMLDivElement>(null!); 
  const isOnScreen = useOnScreen(textRef); 
  
  const [shouldAnimate, setShouldAnimate] = useState(initialVisible);

  useEffect(() => {
    if (isOnScreen) {
      setShouldAnimate(true);
    }
  }, [isOnScreen]);

  useEffect(() => {
    if (shouldAnimate && textRef.current) {
      const split = new SplitText(textRef.current);

      gsap.fromTo(
        split.lines,
        { y: 40, opacity: 0 },
        {
          duration: 2,
          y: 0,
          opacity: 1,
          stagger: 0.4,
          ease: "power4.out",
          scrollTrigger: {
            trigger: textRef.current,
            toggleActions: "restart none none reset",
          },
        }
      );
    }
  }, [shouldAnimate]);

  return textRef;
}