import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { useRef, useEffect } from "react";
import { CERTIFICATES } from "@/constants/data";
import { useAnimatedText } from "@/hooks/useTextAnimation";

const MainPage = () => {
  const textRref = useAnimatedText();
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cards = cardsRef.current;
    if (!cards) return;

    const handleMouseMove = (e: MouseEvent) => {
      const cardElements = cards.querySelectorAll<HTMLDivElement>(".card");

      cardElements.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    };

    cards.addEventListener("mousemove", handleMouseMove);

    return () => cards.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-5">
        <h1 ref={textRref} className="text-5xl lg:text-8xl font-corm">
          Certificates
        </h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Info />
            </TooltipTrigger>
            <TooltipContent>
              <span>The best score that you can get is 6</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div
        id="cards"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 "
        ref={cardsRef}
      >
        {CERTIFICATES.map(
          ({ title, scoreOne, scoreTwo, subtitle, images, link }, i) => (
            <a href={link} className="card bg-neutral-800 group transition-all" key={i}>
              <div className="card-content">
                <div className="card-image flex items-center justify-center relative">

                  {images?.map((img, idx) => (
                    <img
                      key={idx}
                      src={img.src}
                      alt=""
                      className="absolute w-20 h-20 object-contain -z-1"
                      style={{
                        transform: `rotate(${img.rotation})`,
                        right: `${idx * 50}px`,
                        position: "absolute",
                      }}
                    />
                  ))}
                </div>

                <div className="flex flex-col gap-5 justify-center h-full">
                  <div className="px-5">
                    <h1 className="text-xl font-bold max-w-[220px] group-hover:underline z-[10]">
                      {title}
                    </h1>
                    <p className="text-sm">{subtitle}</p>
                    {scoreOne && scoreTwo && (
                      <ul className="list-disc px-7">
                        <li>{scoreOne}</li>
                        <li>{scoreTwo}</li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </a>
          )
        )}
      </div>
    </div>
  );
};

export default MainPage;
