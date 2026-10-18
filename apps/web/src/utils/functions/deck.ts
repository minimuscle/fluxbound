export const convertDecktoArray = (deck: string) => {
  return deck.split(" ");
};

export const convertArrayToDeck = (cards: string[]) => {
  return cards.join(" ");
};
