"use client";

import React, { useState } from "react";

const Tutorial: React.FC = () => {
  const [openSection, setOpenSection] = useState<number>(0);

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? -1 : index);
  };

  const tutorialSections = [
    {
      title: "What is Card Counting?",
      content: `
        Card counting is a strategy used primarily in blackjack to determine when the player has a statistical advantage over the house.
        
        The basic principle is simple: high cards (10s, face cards, Aces) tend to favor the player, while low cards (2-6) favor the dealer.
        By keeping track of the cards that have been dealt, a player can determine when the deck is rich in high cards
        and increase their bets accordingly.
        
        Card counting is legal but casinos may ask counters to leave as it reduces the house edge.
      `,
    },
    {
      title: "How the Hi-Lo System Works",
      content: `
        The Hi-Lo system is the most common and easiest card counting system to learn:
        
        1. Assign a value to each card:
           • Cards 2-6 = +1 (low cards)
           • Cards 7-9 = 0 (neutral)
           • Cards 10-A = -1 (high cards)
        
        2. Start your count at 0 at the beginning of a new deck or shoe.
        
        3. As each card is dealt, add or subtract its value from your running count.
        
        4. Convert your running count to a "true count" by dividing it by the number of decks remaining.
        
        5. Use the true count to adjust your betting and playing strategy.
      `,
    },
    {
      title: "Converting to True Count",
      content: `
        The true count is the running count divided by the number of decks remaining in the shoe.
        
        True Count = Running Count ÷ Decks Remaining
        
        For example, if your running count is +8 and there are 4 decks remaining, your true count is +2.
        
        The true count gives you a more accurate representation of your advantage, especially in games with multiple decks.
        It allows you to compare the count across different situations and games with different numbers of decks.
      `,
    },
    {
      title: "Betting Strategies",
      content: `
        Your bet size should correlate with your advantage:
        
        1. When the true count is 0 or negative, bet the minimum.
        
        2. When the true count is positive, increase your bet. A common approach is:
           • True count +1: Bet 2× minimum
           • True count +2: Bet 3× minimum
           • True count +3: Bet 4× minimum
           • True count +4: Bet 5× minimum
           • True count +5 or higher: Bet 6-10× minimum
        
        3. Always consider your bankroll and risk tolerance when deciding how much to bet.
        
        4. Avoid large betting spreads (e.g., going from $10 to $100) as this is a red flag for casinos.
      `,
    },
    {
      title: "Strategy Adjustments",
      content: `
        Basic strategy should be modified based on the true count:
        
        1. Insurance: Take insurance when the true count is +3 or higher.
        
        2. Standing vs. Hitting:
           • Stand on 16 vs. dealer's 10 when the true count is +0 or higher
           • Stand on 15 vs. dealer's 10 when the true count is +4 or higher
           • Stand on 12 vs. dealer's 3 when the true count is +2 or higher
           
        3. Doubling Down:
           • Double down on 9 vs. dealer's 2 when the true count is +1 or higher
           • Double down on 10 vs. dealer's A when the true count is +4 or higher
           
        4. Pair Splitting:
           • Split 10s vs. dealer's 5 or 6 when the true count is +5 or higher
           • Split 4s vs. dealer's 5 or 6 when the true count is +6 or higher
           
        These adjustments increase your advantage but require memorization. Start with the Hi-Lo system and basic betting adjustments before incorporating these more advanced tactics.
      `,
    },
    {
      title: "Practice Tips",
      content: `
        Card counting requires practice to master:
        
        1. Start by practicing with a single deck of cards at home, counting through the entire deck. The final count should be 0 in balanced systems like Hi-Lo.
        
        2. Practice speed by dealing cards faster as your accuracy improves.
        
        3. Add distractions like music or TV to simulate casino conditions.
        
        4. Practice converting running count to true count.
        
        5. Use apps and online simulators (like this one!) to practice in realistic scenarios.
        
        6. Start with small stakes at real casinos until you're confident in your abilities.
        
        7. Practice acting natural and avoid staring at the cards or moving your lips as you count.
      `,
    },
    {
      title: "Casino Countermeasures",
      content: `
        Casinos use several methods to detect and deter card counters:
        
        1. Multiple decks (typically 6-8) to make counting harder.
        
        2. Mid-shoe shuffling to disrupt counting.
        
        3. Surveillance and pattern recognition to identify betting patterns.
        
        4. Flat betting restrictions that limit your betting spread.
        
        5. Asking skilled players to leave (casinos reserve the right to refuse service).
        
        To avoid detection:
        - Keep a moderate betting spread (e.g., 1-5 units instead of 1-10).
        - Vary your play times and casinos.
        - Occasionally make small strategy errors or place small "cover" bets.
        - Maintain a relaxed demeanor and socialize with others.
        - Consider playing with a partner who places the larger bets when the count is favorable.
      `,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-2xl font-bold mb-4">Card Counting Tutorial</h2>

      <div className="space-y-2">
        {tutorialSections.map((section, index) => (
          <div key={index} className="border rounded-lg overflow-hidden">
            <button
              className={`w-full text-left p-3 font-medium focus:outline-none flex justify-between items-center ${
                openSection === index
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-900 hover:bg-gray-200"
              }`}
              onClick={() => toggleSection(index)}
            >
              <span>{section.title}</span>
              <span>{openSection === index ? "−" : "+"}</span>
            </button>

            {openSection === index && (
              <div className="p-4 border-t">
                <p className="whitespace-pre-line text-gray-700">
                  {section.content}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tutorial;
