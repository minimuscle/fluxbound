import { useApplication } from "@pixi/react";
import fireballJson from "assets/effects/fireball.json?url";
import fireballSheet from "assets/effects/fireball.png";
import { Assets, Spritesheet, Texture } from "pixi.js";
import { useEffect, useState } from "react";

export type FireballEffectProps = {
  target: HTMLDivElement;
  onComplete: () => void;
};

export function FireballEffect({ target, onComplete }: FireballEffectProps) {
  console.log(target);

  /***** HOOKS *****/
  const { app } = useApplication();
  const [frames, setFrames] = useState<Texture[]>([]);

  /***** EFFECTS *****/
  useEffect(() => {
    Assets.load<Texture>(fireballSheet).then((sheet) => {
      const id = crypto.randomUUID();

      Assets.add({
        alias: id,
        src: fireballJson,
        data: { texture: sheet },
      });
      Assets.load<Spritesheet>(id).then((atlas) => {
        setFrames(atlas.animations.fireball_termplate ?? []);
      });
    });
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
