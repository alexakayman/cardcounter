"use client";

import React, { useState, useEffect, useCallback } from "react";
import Card from "./Card";
import Counter from "./Counter";
import Strategy from "./Strategy";
import { CountingSystem, GameState } from "@/lib/types";
import { initializeGameState, dealCard } from "@/lib/countingSystem";

const CardTable: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(() =>
    initializeGameState("hi-lo", 6)
  );
  const [dealSpeed, setDealSpeed] = useState<number>(1000); // ms between deals
  const [autoDeal, setAutoDeal] = useState<boolean>(false);
  const [showCardValues, setShowCardValues] = useState<boolean>(true);
  const [lastDealtCard, setLastDealtCard] = useState<number>(-1);

  // Handle dealing a card
  const handleDealCard = useCallback(() => {
    try {
      const [card, newGameState] = dealCard(gameState);
      setGameState(newGameState);
      setLastDealtCard(newGameState.dealtCards.length - 1);

      // Reset the highlight after a delay
      setTimeout(() => {
        setLastDealtCard(-1);
      }, 500);
    } catch (error) {
      console.error(error);
      // Handle deck empty
      alert("The deck is empty. Reshuffling...");
      handleReset();
    }
  }, [gameState]);

  // Auto-deal effect
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (autoDeal) {
      intervalId = setInterval(() => {
        handleDealCard();
      }, dealSpeed);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoDeal, dealSpeed, handleDealCard]);

  // Handle changing the counting system
  const handleChangeCountingSystem = (system: CountingSystem) => {
    setGameState((prevState) => ({
      ...prevState,
      countingSystem: system,
    }));
  };

  // Reset the game
  const handleReset = () => {
    setAutoDeal(false);
    setGameState(initializeGameState(gameState.countingSystem, 6));
  };

  // Calculate displayed cards (most recent 20 cards)
  const displayedCards = gameState.dealtCards.slice(
    Math.max(0, gameState.dealtCards.length - 20),
    gameState.dealtCards.length
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="bg-green-800 rounded-lg shadow-lg p-6 min-h-96">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-white text-2xl font-bold">Blackjack Table</h2>
            <div className="flex space-x-2">
              <button
                onClick={handleDealCard}
                disabled={autoDeal}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md disabled:opacity-50"
              >
                Deal Card
              </button>
              <button
                onClick={() => setAutoDeal(!autoDeal)}
                className={`px-4 py-2 rounded-md ${
                  autoDeal
                    ? "bg-red-500 hover:bg-red-600 text-white"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                {autoDeal ? "Stop Auto" : "Auto Deal"}
              </button>
              <button
                onClick={handleReset}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="mb-4 flex items-center space-x-4">
            <div className="flex items-center">
              <label htmlFor="dealSpeed" className="text-white mr-2">
                Speed:
              </label>
              <input
                id="dealSpeed"
                type="range"
                min="200"
                max="3000"
                step="100"
                value={dealSpeed}
                onChange={(e) => setDealSpeed(Number(e.target.value))}
                className="w-32"
              />
              <span className="text-white ml-2">{dealSpeed}ms</span>
            </div>

            <div className="flex items-center">
              <input
                id="showValues"
                type="checkbox"
                checked={showCardValues}
                onChange={() => setShowCardValues(!showCardValues)}
                className="mr-2"
              />
              <label htmlFor="showValues" className="text-white">
                Show Card Values
              </label>
            </div>
          </div>

          <div className="bg-green-700 p-4 rounded-lg shadow-inner min-h-64">
            <h3 className="text-white text-lg mb-2">Dealt Cards</h3>
            {gameState.dealtCards.length === 0 ? (
              <p className="text-white opacity-70">
                No cards dealt yet. Press "Deal Card" to begin.
              </p>
            ) : (
              <div className="flex flex-wrap gap-1">
                {displayedCards.map((card, index) => (
                  <Card
                    key={`${card.suit}-${card.rank}-${
                      gameState.dealtCards.length -
                      displayedCards.length +
                      index
                    }`}
                    card={card}
                    countingSystem={gameState.countingSystem}
                    showValue={showCardValues}
                    highlighted={
                      gameState.dealtCards.length -
                        displayedCards.length +
                        index ===
                      lastDealtCard
                    }
                  />
                ))}
              </div>
            )}
          </div>

          <div className="mt-4 text-white">
            <p>
              Cards Dealt: {gameState.dealtCards.length} of{" "}
              {gameState.dealtCards.length + gameState.deck.length}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Counter
          currentCount={gameState.currentCount}
          trueCount={gameState.trueCount}
          deckPenetration={gameState.deckPenetration}
          remainingDecks={gameState.remainingDecks}
          countingSystem={gameState.countingSystem}
          onChangeCountingSystem={handleChangeCountingSystem}
        />

        <Strategy trueCount={gameState.trueCount} />
      </div>
    </div>
  );
};

export default CardTable;
