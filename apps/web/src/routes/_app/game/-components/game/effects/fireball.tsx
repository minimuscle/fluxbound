import type { GameEffect } from "@fluxbound/schema";

export type FireballEffectProps = {
  effect: GameEffect;
  target: HTMLDivElement;
  onComplete: () => void;
};

export function FireballEffect(_props: FireballEffectProps) {
  // TODO: Render your Pixi animation at target.getBoundingClientRect().
  // Convert the DOM position to canvas coordinates, then call onComplete
  // once the animation finishes. Until then, this effect stays at the queue head.
  return null;
}
