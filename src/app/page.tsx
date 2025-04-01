"use client";

import React, { useState } from "react";
import CardTable from "@/components/CardTable";
import Tutorial from "@/components/Tutorial";

export default function Home() {
  const [showTutorial, setShowTutorial] = useState<boolean>(false);

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                BlackJack Card Counting Trainer
              </h1>
              <p className="mt-2 text-xl text-gray-600">
                Master the art of card counting and gain an edge at the tables
              </p>
            </div>

            <button
              onClick={() => setShowTutorial(!showTutorial)}
              className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium"
            >
              {showTutorial ? "Hide Tutorial" : "Show Tutorial"}
            </button>
          </div>
        </header>

        {showTutorial && (
          <div className="mb-8">
            <Tutorial />
          </div>
        )}

        <CardTable />

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>
            Disclaimer: This trainer is for educational purposes only. Card
            counting may be legal but casinos reserve the right to refuse
            service to anyone they suspect of counting cards.
          </p>
          <p className="mt-2">
            &copy; {new Date().getFullYear()} BlackJack Card Counting Trainer
          </p>
        </footer>
      </div>
    </main>
  );
}
