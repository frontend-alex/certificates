import { useState, useEffect, RefObject } from "react";

function useOnScreen<T extends HTMLElement>(ref: RefObject<T>, threshold: number = 0.3): boolean {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIntersecting(entry?.isIntersecting ?? false),
      { rootMargin: "0px", threshold }
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, threshold]);

  return isIntersecting;
}

export default useOnScreen;