export type Suit = "hearts" | "diamonds" | "clubs" | "spades";
export type Rank =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K";

export interface Card {
  suit: Suit;
  rank: Rank;
  faceUp: boolean;
}

export type Deck = Card[];

export type CountingSystem =
  | "hi-lo"
  | "hi-opt-i"
  | "hi-opt-ii"
  | "ko"
  | "omega-ii"
  | "red-7";

export interface CountingSystemValues {
  [key: string]: {
    [key in Rank]: number;
  };
}

export interface Strategy {
  count: number;
  recommendation: string;
  description: string;
}

export interface GameState {
  deck: Deck;
  dealtCards: Card[];
  currentCount: number;
  trueCount: number;
  deckPenetration: number;
  countingSystem: CountingSystem;
  remainingDecks: number;
}
