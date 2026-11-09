import { useEffect } from "react";
import { useInvariant } from "utils/hooks/useInvariant";
import { EffectsContext } from "./context";
import { FireballEffect } from "./fireball";

export function EffectsLayer() {
  const { activeEffect, targets, finishEffect } = useInvariant(EffectsContext);
  const target = activeEffect ? targets.get(activeEffect.message.target) : undefined;

  useEffect(() => {
    if (activeEffect && !target) finishEffect(activeEffect.id);
  }, [activeEffect, target, finishEffect]);

  if (!activeEffect || !target) return null;

  switch (activeEffect.message.effect) {
    case "fireball":
      return (
        <FireballEffect
          key={activeEffect.id}
          effect={activeEffect}
          target={target}
          onComplete={() => finishEffect(activeEffect.id)}
        />
      );
  }
}
