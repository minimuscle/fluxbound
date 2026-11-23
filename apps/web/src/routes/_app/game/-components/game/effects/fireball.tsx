import { useApplication } from "@pixi/react";
import fireballJson from "assets/effects/fireball.json";
import fireballSheet from "assets/effects/fireball.png";
import { Assets, Spritesheet, Texture } from "pixi.js";
import { useEffect, useRef, useState } from "react";

export type FireballEffectProps = {
  target: HTMLDivElement;
  onComplete: () => void;
};

export function FireballEffect({ target, onComplete }: FireballEffectProps) {
  /***** HOOKS *****/
  const { app } = useApplication();
  const [frames, setFrames] = useState<Texture[]>([]);
  const complete = useRef(onComplete);

  /***** EFFECTS *****/
  useEffect(() => {
    complete.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const controller = new AbortController();

    // Parse bundled atlas data directly: production URLs may be inlined data URLs.
    Assets.load<Texture>(fireballSheet)
      .then(async (texture) => {
        const atlas = new Spritesheet({ texture, data: fireballJson });
        await atlas.parse();
        if (controller.signal.aborted) return;
        const animation = atlas.animations.fireball_termplate ?? [];
        if (animation.length === 0) complete.current();
        else setFrames(animation);
      })
      .catch((error: Error) => {
        if (controller.signal.aborted) return;
        console.error("Failed to load fireball animation", error);
        complete.current();
      });

    return () => controller.abort();
  }, []);

  /***** RENDER *****/
  if (frames.length === 0) return null;

  const targetBounds = target.getBoundingClientRect();
  const canvasBounds = app.canvas.getBoundingClientRect();
  const x = ((targetBounds.x + targetBounds.width / 2 - canvasBounds.x) * app.screen.width) / canvasBounds.width + 18;
  const y = ((targetBounds.y + targetBounds.height / 2 - canvasBounds.y) * app.screen.height) / canvasBounds.height - 25;

  return (
    <pixiAnimatedSprite
      ref={(sprite) => {
        sprite?.play();
      }}
      textures={frames}
      x={x}
      y={y}
      anchor={0.5}
      scale={3}
      animationSpeed={0.5}
      rotation={Math.PI / 2}
      autoPlay
      loop={false}
      onComplete={onComplete}
    />
  );
}
