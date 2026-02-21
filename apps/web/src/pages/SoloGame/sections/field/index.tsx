import { Card } from "components/Cards";
import { CARD_LIBRARY } from "components/Cards/library";
import type { GameCardId } from "components/Cards/types";
import { GameContext } from "pages/SoloGame/utils/context";
import { use, useRef } from "react";
import type { Player } from "utils/types/game";
import "./field.scss";

/**********************************************************************************************************
 *   TYPE DEFINITIONS
 **********************************************************************************************************/
type FieldSection = React.FC<{
  player: Player;
}>;

// prettier-ignore
const FIELD_DISPLAY_ORDER = [
  4, 2, 0, 1, 3,
  9, 7, 5, 6, 8,
  14, 12, 10, 11, 13,
  19, 17, 15, 16, 18,
  24, 22, 20, 21, 23,
  29, 27, 25, 26, 28
];

const VISUAL_INDEX_BY_FIELD_INDEX = (() => {
  const visualIndexByFieldIndex: number[] = [];

  for (let visualIndex = 0; visualIndex < FIELD_DISPLAY_ORDER.length; visualIndex++) {
    visualIndexByFieldIndex[FIELD_DISPLAY_ORDER[visualIndex]] = visualIndex;
  }

  return visualIndexByFieldIndex;
})();

const getGridPositionStyle = (visualIndex: number) => ({
  gridRowStart: Math.floor(visualIndex / 5) + 1,
  gridColumnStart: (visualIndex % 5) + 1,
});

/**********************************************************************************************************
 *   COMPONENT START
 **********************************************************************************************************/
export const FieldSection: FieldSection = ({ player }) => {
  /***** HOOKS *****/
  const {
    state: {
      [player.toLowerCase() as "player" | "enemy"]: { field },
    },
  } = use(GameContext)!;

  const creatureCards = field.filter(({ id }) => CARD_LIBRARY[id].type === "CREATURE");
  const fieldIndexByGameCardIdRef = useRef<Map<GameCardId, number>>(new Map());

  const fieldIndexByGameCardId = fieldIndexByGameCardIdRef.current;
  const liveGameCardIds = new Set<GameCardId>(creatureCards.map((c) => c.gameCardId));
  for (const [gameCardId] of fieldIndexByGameCardId) {
    if (!liveGameCardIds.has(gameCardId)) fieldIndexByGameCardId.delete(gameCardId);
  }

  const usedFieldIndexes = new Set(fieldIndexByGameCardId.values());
  let nextExtraFieldIndex = FIELD_DISPLAY_ORDER.length;

  const positionedCards = creatureCards
    .map((card) => {
      let fieldIndex = fieldIndexByGameCardId.get(card.gameCardId);
      if (fieldIndex === undefined) {
        fieldIndex = 0;
        while (fieldIndex < FIELD_DISPLAY_ORDER.length && usedFieldIndexes.has(fieldIndex)) fieldIndex++;
        if (fieldIndex >= FIELD_DISPLAY_ORDER.length) fieldIndex = nextExtraFieldIndex++;

        fieldIndexByGameCardId.set(card.gameCardId, fieldIndex);
        usedFieldIndexes.add(fieldIndex);
      }

      const visualIndex = VISUAL_INDEX_BY_FIELD_INDEX[fieldIndex] ?? fieldIndex;
      return { card, visualIndex };
    })
    .sort((a, b) => a.visualIndex - b.visualIndex);

  /***** RENDER *****/
  return (
    <div className="FieldSection">
      {positionedCards.map(({ card, visualIndex }) => (
        <div key={card.gameCardId} style={getGridPositionStyle(visualIndex)}>
          <Card card={card} isActive player={player} />
        </div>
      ))}
    </div>
  );
};
