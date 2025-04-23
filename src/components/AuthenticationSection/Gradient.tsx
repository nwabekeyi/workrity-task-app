import { useState, useEffect } from "react";
import { Button } from "./Button";

export function Gradient(): JSX.Element {
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    const updateGreeting = () => {
      const hours = new Date().getHours();
      if (hours < 12) {
        setGreeting("Morning");
      } else if (hours < 18) {
        setGreeting("Afternoon");
      } else if (hours < 21) {
        setGreeting("afternoon");
      } else {
        setGreeting("Evening");
      }
    };

    updateGreeting();
    const intervalId = setInterval(updateGreeting, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="px-16">
      <div className="relative z-[5]">
        <h1 className="text-6xl font-bold tracking-tight text-pretty text-gray-50">
          Welcome! Good <span className="text-emerald-500">{greeting}</span>
        </h1>
        <h2 className="text-5xl font-semibold text-pretty text-gray-100 mt-16">
          Sign-in and Registration
        </h2>
        <p className="text-lg/8 text-gray-100 mt-7">
        Workrity Task App
        A sleek task management tool built with React.js, Vite, and Tailwind CSS. Designed for teams at Workrity to easily assign, track, and manage tasks with clarity and efficiency.
        </p>
      </div>
    </section>
  );
}
