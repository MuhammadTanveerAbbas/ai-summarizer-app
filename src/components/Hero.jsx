import React from "react";
import { logo } from "../assets";

const Hero = () => {
  return (
    <header className="w-full flex flex-col items-center">
      <nav className="flex justify-between items-center w-full mb-10 pt-3 px-6 sm:px-16">
        {/* Shorter logo */}
        <img
          src={logo}
          alt="ai_summarizer_logo"
          className="w-20 object-contain"
        />

        {/* Right-side text */}
        <span className="text-lg sm:text-2xl font-extrabold orange_gradient">
          AI Summarizer
        </span>
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
