import { use } from "react";
import type { Player } from "utils/types/game";
import { GameContext } from "../../../pages/SoloGame/utils/context";
import { CARD_LIBRARY } from "../library";
import { CardTooltip } from "../tooltip";
import { ELEMENTS, type Element } from "../types";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type CardRunes = React.FC<{
  player: Player;
}>;

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const CardRunes: CardRunes = ({ player }) => {
  const {
    state: {
      [player.toLowerCase() as "player" | "enemy"]: { field },
    },
  } = use(GameContext)!;

  const runeCounts = field.reduce<Record<Element, typeof field>>(
    (acc, card) => {
      const def = CARD_LIBRARY[card.id];
      if (def.type !== "RUNE") return acc;

      acc[def.element].push(card);
      return acc;
    },
    {
      FIRE: [],
      WATER: [],
      AIR: [],
      EARTH: [],
      LIGHT: [],
      DARK: [],
      LIFE: [],
      DEATH: [],
      AETHER: [],
      VOID: [],
    },
  );

  return (
    <div className="Runes">
      {ELEMENTS.map((element) => {
        const cards = runeCounts[element];
        if (!cards.length) return null;

        const firstCard = cards[0];

        return (
          <CardTooltip key={element} card={firstCard}>
            <div className={`Runes__rune rune__${element.toLowerCase()}`}>
              {element}
              <div className="Runes__runeNumber">{cards.length}</div>
            </div>
          </CardTooltip>
        );
      })}
    </div>
  );
};
