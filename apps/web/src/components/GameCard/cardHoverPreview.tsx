import type { Game } from "@fluxbound/schema";
import { HoverCard } from "@mantine/core";
import type { ReactElement } from "react";
import { DisplayCard } from "./displayCard";

type CardHoverPreviewProps = {
  card: Game.GameCard;
  children: ReactElement;
};

export const CardHoverPreview = ({ card, children }: CardHoverPreviewProps) => (
  <HoverCard
    openDelay={500}
    closeDelay={0}
    offset={20}
    position="right-start"
    withinPortal
    floatingStrategy="fixed"
    preventPositionChangeWhenVisible={false}
    middlewares={{
      flip: { padding: 8, fallbackPlacements: ["left-start", "bottom-start", "top-start"] },
      shift: { padding: 8, crossAxis: true },
    }}
  >
    <HoverCard.Target>{children}</HoverCard.Target>
    <HoverCard.Dropdown
      p={0}
      style={{
        background: "transparent",
        border: 0,
        pointerEvents: "none",
        maxWidth: "calc(100vw - 16px)",
        maxHeight: "calc(100dvh - 16px)",
        overflow: "auto",
      }}
    >
      <div style={{ zoom: 2 }}>
        <DisplayCard card={card} />
      </div>
    </HoverCard.Dropdown>
  </HoverCard>
);
