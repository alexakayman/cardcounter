"use client";

import React from "react";
import { getStrategy, getStrategyAdjustments } from "@/lib/strategyTable";

interface StrategyProps {
  trueCount: number;
}

const Strategy: React.FC<StrategyProps> = ({ trueCount }) => {
  const strategy = getStrategy(trueCount);
  const adjustments = getStrategyAdjustments(trueCount);

  // Determine the class for the recommendation banner
  const getBannerClass = () => {
    if (trueCount >= 3) return "bg-green-600 text-white";
    if (trueCount >= 1) return "bg-green-500 text-white";
    if (trueCount >= 0) return "bg-yellow-400 text-gray-900";
    if (trueCount >= -2) return "bg-orange-400 text-white";
    return "bg-red-500 text-white";
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className={`p-4 ${getBannerClass()}`}>
        <h2 className="text-xl font-bold">Current Strategy</h2>
        <div className="text-2xl font-bold mt-1">{strategy.recommendation}</div>
      </div>

      <div className="p-4">
        <p className="text-gray-700 mb-4">{strategy.description}</p>

        {adjustments.length > 0 && (
          <div>
            <h3 className="font-bold text-lg mb-2">Strategy Adjustments:</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {adjustments.map((adjustment, index) => (
                <li key={index}>{adjustment}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4 p-3 bg-gray-100 rounded-lg">
          <h3 className="font-bold text-lg mb-2">Why This Matters</h3>
          <p className="text-gray-700">
            Card counting works because the composition of the remaining deck
            affects the probability of winning. A deck rich in high cards (10s
            and Aces) favors the player, while a deck rich in low cards favors
            the dealer.
          </p>
          <p className="text-gray-700 mt-2">
            When the true count is high, increase your bets and adjust your
            strategy to take advantage of the favorable conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Strategy;
