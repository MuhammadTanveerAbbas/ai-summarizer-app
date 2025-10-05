import React from "react";
import { logo } from "../assets";
import { github_icon } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex flex-col items-center">
      <nav className="flex justify-between items-center w-full mb-10 pt-3">
        {/* Logo + title grouped on the left */}
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt="ai_summarizer_logo"
            className="w-12 object-contain"
          />

          <span className="text-lg sm:text-2xl font-extrabold orange_gradient">
            AI Summarizer
          </span>
        </div>

        {/* GitHub Link + Icon */}
        <a
          href="https://github.com/muhammadtanveerabbas"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2"
        >
          <img
            src={github_icon}
            alt="github_icon"
            className="w-8 h-8 object-contain"
            style={{ filter: "invert(50%) sepia(100%) saturate(500%) hue-rotate(0deg) brightness(100%) contrast(100%)" }}
          />
        </a>
      </nav>

      <h1 className="head_text">
        Summarize Articles <br className="max-md:hidden" />
        <span className="orange_gradient">with GPT-4</span>
      </h1>

      <h2 className="desc">
        Get short summaries of long articles. Powered by AI.
      </h2>
    </header>
  );
};

export default Hero;
