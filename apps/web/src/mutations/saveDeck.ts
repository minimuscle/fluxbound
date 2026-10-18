import { mutationOptions } from "@tanstack/react-query";
import { user } from "api/user";
import { convertArrayToDeck } from "utils/functions/deck";

export const saveDeckOptions = mutationOptions({
  mutationFn: (cards: string[]) => user.saveDeck(convertArrayToDeck(cards)),
});
