import {
  Card,
  CountingSystem,
  CountingSystemValues,
  Deck,
  Rank,
  GameState,
} from "./types";

// Card counting system values
export const countingSystemValues: CountingSystemValues = {
  "hi-lo": {
    A: -1,
    "2": 1,
    "3": 1,
    "4": 1,
    "5": 1,
    "6": 1,
    "7": 0,
    "8": 0,
    "9": 0,
    "10": -1,
    J: -1,
    Q: -1,
    K: -1,
  },
  "hi-opt-i": {
    A: 0,
    "2": 0,
    "3": 1,
    "4": 1,
    "5": 1,
    "6": 1,
    "7": 0,
    "8": 0,
    "9": 0,
    "10": -1,
    J: -1,
    Q: -1,
    K: -1,
  },
  "hi-opt-ii": {
    A: 0,
    "2": 1,
    "3": 1,
    "4": 2,
    "5": 2,
    "6": 1,
    "7": 1,
    "8": 0,
    "9": 0,
    "10": -2,
    J: -2,
    Q: -2,
    K: -2,
  },
  ko: {
    A: -1,
    "2": 1,
    "3": 1,
    "4": 1,
    "5": 1,
    "6": 1,
    "7": 1,
    "8": 0,
    "9": 0,
    "10": -1,
    J: -1,
    Q: -1,
    K: -1,
  },
  "omega-ii": {
    A: 0,
    "2": 1,
    "3": 1,
    "4": 2,
    "5": 2,
    "6": 2,
    "7": 1,
    "8": 0,
    "9": -1,
    "10": -2,
    J: -2,
    Q: -2,
    K: -2,
  },
  "red-7": {
    A: -1,
    "2": 1,
    "3": 1,
    "4": 1,
    "5": 1,
    "6": 1,
    "7": 0.5,
    "8": 0,
    "9": 0,
    "10": -1,
    J: -1,
    Q: -1,
    K: -1,
  },
};

// Generate a new deck of cards
export const createDeck = (numDecks: number = 6): Deck => {
  const suits: Array<Card["suit"]> = ["hearts", "diamonds", "clubs", "spades"];
  const ranks: Array<Card["rank"]> = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];

  const deck: Deck = [];

  for (let d = 0; d < numDecks; d++) {
    for (const suit of suits) {
      for (const rank of ranks) {
        deck.push({ suit, rank, faceUp: false });
      }
    }
  }

  return shuffleDeck(deck);
};

// Shuffle the deck using Fisher-Yates algorithm
export const shuffleDeck = (deck: Deck): Deck => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Deal a card from the deck
export const dealCard = (gameState: GameState): [Card, GameState] => {
  if (gameState.deck.length === 0) {
    throw new Error("Deck is empty");
  }

  const newDeck = [...gameState.deck];
  const card = { ...newDeck.pop()!, faceUp: true };
  const newDealtCards = [...gameState.dealtCards, card];

  // Calculate deck penetration
  const totalCards = 52 * 6; // Assuming 6 decks
  const deckPenetration = (newDealtCards.length / totalCards) * 100;

  // Calculate remaining decks
  const remainingDecks = (gameState.deck.length - 1) / 52;

  // Update count
  const newCount = updateCount(
    gameState.currentCount,
    card,
    gameState.countingSystem
  );

  // Calculate true count (running count divided by remaining decks)
  const trueCount =
    Math.round((newCount / Math.max(remainingDecks, 1)) * 2) / 2;

  return [
    card,
    {
      ...gameState,
      deck: newDeck,
      dealtCards: newDealtCards,
      currentCount: newCount,
      trueCount,
      deckPenetration,
      remainingDecks,
    },
  ];
};

// Update the running count based on the card dealt
export const updateCount = (
  currentCount: number,
  card: Card,
  countingSystem: CountingSystem
): number => {
  if (!card.faceUp) return currentCount;

  const cardValue = countingSystemValues[countingSystem][card.rank];
  return currentCount + cardValue;
};

// Initialize the game state
export const initializeGameState = (
  countingSystem: CountingSystem = "hi-lo",
  numDecks: number = 6
): GameState => {
  const deck = createDeck(numDecks);

  return {
    deck,
    dealtCards: [],
    currentCount: 0,
    trueCount: 0,
    deckPenetration: 0,
    countingSystem,
    remainingDecks: numDecks,
  };
};
