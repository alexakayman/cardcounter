import { Strategy } from "./types";

// Strategy recommendations based on the true count
export const getStrategy = (trueCount: number): Strategy => {
  // Strategies for different true count ranges
  if (trueCount <= -3) {
    return {
      count: trueCount,
      recommendation: "Bet Minimum",
      description:
        "With a very negative count, the deck is rich in high cards. Bet the minimum and be more conservative.",
    };
  } else if (trueCount <= -1) {
    return {
      count: trueCount,
      recommendation: "Bet Minimum, Play Basic Strategy",
      description:
        "Deck is slightly unfavorable. Bet minimum and stick to basic strategy.",
    };
  } else if (trueCount < 1) {
    return {
      count: trueCount,
      recommendation: "Bet Minimum, Follow Basic Strategy",
      description:
        "Nearly neutral deck. Bet minimum and follow basic strategy.",
    };
  } else if (trueCount < 2) {
    return {
      count: trueCount,
      recommendation: "Bet 2× Minimum",
      description:
        "Slightly positive count. Consider doubling your minimum bet.",
    };
  } else if (trueCount < 3) {
    return {
      count: trueCount,
      recommendation: "Bet 2-3× Minimum",
      description:
        "Positive count. Consider doubling or tripling your minimum bet.",
    };
  } else if (trueCount < 4) {
    return {
      count: trueCount,
      recommendation: "Bet 3-4× Minimum",
      description:
        "Strong positive count. Increase your bet to 3-4 times the minimum.",
    };
  } else if (trueCount < 5) {
    return {
      count: trueCount,
      recommendation: "Bet 4-5× Minimum",
      description:
        "Very strong positive count. Increase your bet significantly.",
    };
  } else {
    return {
      count: trueCount,
      recommendation: "Bet 5-10× Minimum",
      description:
        "Extremely favorable count. Maximize your bet within your bankroll limits.",
    };
  }
};

// Strategy adjustments based on the true count
export const getStrategyAdjustments = (trueCount: number): string[] => {
  const adjustments: string[] = [];

  if (trueCount >= 1) {
    adjustments.push("Take insurance when dealer shows an Ace");
  }

  if (trueCount >= 3) {
    adjustments.push("Stand on 16 vs. dealer's 10");
    adjustments.push("Stand on 15 vs. dealer's 10");
  }

  if (trueCount >= 4) {
    adjustments.push("Stand on 12 vs. dealer's 3");
  }

  if (trueCount <= -2) {
    adjustments.push("Hit on 12 vs. dealer's 4");
    adjustments.push("Hit on 12 vs. dealer's 5");
    adjustments.push("Hit on 12 vs. dealer's 6");
  }

  return adjustments;
};

// Basic explanation of the Hi-Lo system
export const countingExplanations = {
  "hi-lo": `
    The Hi-Lo system assigns a value to each card:
    • Cards 2-6 = +1 (low cards)
    • Cards 7-9 = 0 (neutral)
    • Cards 10-A = -1 (high cards)
    
    Keep a running count as cards are dealt. Divide by remaining decks for true count.
    A positive count means there are more high cards left in the deck, which is favorable for the player.
  `,
  "hi-opt-i": `
    The Hi-Opt I (Highly Optimum) system:
    • Cards 2, 7-9 = 0
    • Cards 3-6 = +1
    • Cards 10-K = -1
    • Aces = 0 (keep a separate count of Aces)
    
    More complex but potentially more accurate than Hi-Lo.
  `,
  "hi-opt-ii": `
    The Hi-Opt II system:
    • Aces, 8, 9 = 0
    • 2, 3, 7 = +1
    • 4, 5, 6 = +2
    • 10-K = -2
    
    Higher betting correlation but requires more practice.
  `,
  ko: `
    The KO (Knock Out) system:
    • 2-7 = +1
    • 8-9 = 0
    • 10-A = -1
    
    An unbalanced system that doesn't require true count conversion.
  `,
  "omega-ii": `
    The Omega II system:
    • 2, A = 0
    • 3, 4, 6 = +1
    • 5 = +2
    • 7 = +2
    • 8 = 0
    • 9 = -1
    • 10-K = -2
    
    Complex but very powerful counting system.
  `,
  "red-7": `
    The Red Seven system:
    • 2-6 = +1
    • Red 7 = +1, Black 7 = 0
    • 8-9 = 0
    • 10-A = -1
    
    An unbalanced counting system that doesn't require converting to a true count.
  `,
};
