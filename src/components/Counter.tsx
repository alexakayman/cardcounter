"use client";

import React from "react";
import { CountingSystem } from "@/lib/types";
import { countingExplanations } from "@/lib/strategyTable";

interface CounterProps {
  currentCount: number;
  trueCount: number;
  deckPenetration: number;
  remainingDecks: number;
  countingSystem: CountingSystem;
  onChangeCountingSystem: (system: CountingSystem) => void;
}

const Counter: React.FC<CounterProps> = ({
  currentCount,
  trueCount,
  deckPenetration,
  remainingDecks,
  countingSystem,
  onChangeCountingSystem,
}) => {
  // Determine the class for the count display
  const getCountClass = (count: number) => {
    if (count > 0) return "text-green-600";
    if (count < 0) return "text-red-600";
    return "text-gray-800";
  };

  const runningCountClass = getCountClass(currentCount);
  const trueCountClass = getCountClass(trueCount);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-3">Card Counting Stats</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-gray-100 p-3 rounded-lg">
          <div className="text-sm text-gray-600">Running Count</div>
          <div className={`text-3xl font-bold ${runningCountClass}`}>
            {currentCount > 0 ? `+${currentCount}` : currentCount}
          </div>
        </div>

        <div className="bg-gray-100 p-3 rounded-lg">
          <div className="text-sm text-gray-600">True Count</div>
          <div className={`text-3xl font-bold ${trueCountClass}`}>
            {trueCount > 0 ? `+${trueCount}` : trueCount}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-sm text-gray-600">Deck Penetration</div>
          <div className="text-xl font-semibold">
            {deckPenetration.toFixed(1)}%
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-600">Remaining Decks</div>
          <div className="text-xl font-semibold">
            {remainingDecks.toFixed(1)}
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label
          htmlFor="countingSystem"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Counting System
        </label>
        <select
          id="countingSystem"
          className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          value={countingSystem}
          onChange={(e) =>
            onChangeCountingSystem(e.target.value as CountingSystem)
          }
        >
          <option value="hi-lo">Hi-Lo</option>
          <option value="hi-opt-i">Hi-Opt I</option>
          <option value="hi-opt-ii">Hi-Opt II</option>
          <option value="ko">KO (Knock Out)</option>
          <option value="omega-ii">Omega II</option>
          <option value="red-7">Red 7</option>
        </select>
      </div>

      <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
        <h3 className="font-bold mb-1">System Explanation:</h3>
        <p className="whitespace-pre-line">
          {countingExplanations[countingSystem]}
        </p>
      </div>
    </div>
  );
};

export default Counter;
