import { Github, Info, Instagram, Linkedin, User2 } from "lucide-react";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "./ui/tooltip";
import { useTheme } from "@/contexts/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 w-full">
      <div className="p-5 max-w-[110em] mx-auto flex flex-col gap-5">
        <div className="flex items-center justify-between gap-5">
          <div className="flex flex-col">
            <h1 className="font-bold text-xl">AI.</h1>
            <p>Make the web a beatiful place.</p>
          </div>
          <div className="flex flex-col gap-3"></div>
        </div>
        <div
          className={`${
            theme === "light" ? "bg-black" : "line-gradient"
          } w-full h-[1px] opacity-20`}
        />
        <div className="flex items-center justify-between gap-5">
          <p>© AI. All Rights Reserved {new Date().getFullYear()}</p>
          <div className="flex items-center gap-3">
            <a href="https://github.com/frontend-alex">
              <Github
                className="cursor-pointer hover:text-indigo-600 transition-all"
                size={18}
              />
            </a>
            <a href="https://www.instagram.com/yourrfavalex">
              <Instagram
                className="cursor-pointer hover:text-indigo-600 transition-all"
                size={18}
              />
            </a>
            <a href="https://www.linkedin.com/in/aleksander-ivanov-0356a8274/">
              <Linkedin
                className="cursor-pointer hover:text-indigo-600 transition-all"
                size={18}
              />
            </a>
            <a href="https://portfolio-backup-eight.vercel.app/">
              <User2
                className="cursor-pointer hover:text-indigo-600 transition-all"
                size={18}
              />
            </a>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info size={18} />
                </TooltipTrigger>
                <TooltipContent>
                  <span className="flex items-center gap-1">
                    The <User2 size={13} /> is for my portfolio :)
                  </span>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
