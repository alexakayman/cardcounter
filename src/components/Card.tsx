"use client";

import React from "react";
import { Card as CardType } from "@/lib/types";
import { countingSystemValues } from "@/lib/countingSystem";

interface CardProps {
  card: CardType;
  countingSystem: string;
  highlighted?: boolean;
  showValue?: boolean;
}

const Card: React.FC<CardProps> = ({
  card,
  countingSystem,
  highlighted = false,
  showValue = false,
}) => {
  const { suit, rank, faceUp } = card;

  // Determine card color
  const isRed = suit === "hearts" || suit === "diamonds";
  const textColor = isRed ? "text-red-600" : "text-black";

  // Get the card value for the current counting system
  const cardValue =
    countingSystemValues[countingSystem as keyof typeof countingSystemValues][
      rank
    ];

  // Determine value color
  const valueColor =
    cardValue > 0
      ? "text-green-600"
      : cardValue < 0
      ? "text-red-600"
      : "text-gray-600";

  // Card back pattern
  if (!faceUp) {
    return (
      <div className="w-20 h-32 rounded-lg bg-blue-800 border border-gray-300 shadow-md flex items-center justify-center m-1">
        <div className="w-16 h-28 rounded border-2 border-white bg-blue-700 flex items-center justify-center">
          <div className="w-12 h-24 rounded border border-white bg-blue-600 flex items-center justify-center">
            <span className="text-white text-xl font-bold">♠♣♥♦</span>
          </div>
        </div>
      </div>
    );
  }

  // Get suit symbol
  const suitSymbol =
    suit === "hearts"
      ? "♥"
      : suit === "diamonds"
      ? "♦"
      : suit === "clubs"
      ? "♣"
      : "♠";

  return (
    <div
      className={`w-20 h-32 rounded-lg bg-white border border-gray-300 shadow-md flex flex-col p-2 m-1 relative ${
        highlighted ? "ring-2 ring-yellow-400" : ""
      }`}
    >
      {/* Top left card info */}
      <div className={`text-left ${textColor}`}>
        <div className="text-xl font-bold">{rank}</div>
        <div className="text-xl">{suitSymbol}</div>
      </div>

      {/* Center suit symbol */}
      <div
        className={`text-4xl ${textColor} absolute inset-0 flex items-center justify-center`}
      >
        {suitSymbol}
      </div>

      {/* Bottom right card info */}
      <div className={`text-right mt-auto ${textColor}`}>
        <div className="text-xl">{suitSymbol}</div>
        <div className="text-xl font-bold">{rank}</div>
      </div>

      {/* Card value overlay */}
      {showValue && (
        <div
          className={`absolute -bottom-3 right-0 rounded-full w-6 h-6 flex items-center justify-center bg-white border ${
            cardValue > 0
              ? "border-green-600"
              : cardValue < 0
              ? "border-red-600"
              : "border-gray-400"
          }`}
        >
          <span className={`text-sm font-bold ${valueColor}`}>
            {cardValue > 0 ? `+${cardValue}` : cardValue}
          </span>
        </div>
      )}
    </div>
  );
};

export default Card;
