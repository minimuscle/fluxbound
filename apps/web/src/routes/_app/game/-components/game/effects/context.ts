import type { GameEffect } from "@fluxbound/schema";
import { createContext, useCallback, useState } from "react";

export type EffectTarget = GameEffect["message"]["target"];

export function useGameEffects() {
  const [queue, setQueue] = useState<GameEffect[]>([]);
  const [targets, setTargets] = useState<ReadonlyMap<EffectTarget, HTMLDivElement>>(() => new Map());

  const enqueueEffect = useCallback((message: GameEffect["message"]) => {
    const effect: GameEffect = { id: crypto.randomUUID(), message };
    setQueue((current) => [...current, effect]);
  }, []);

  const finishEffect = useCallback((id: GameEffect["id"]) => {
    setQueue((current) => current[0]?.id === id ? current.slice(1) : current);
  }, []);

  const clearEffects = useCallback(() => setQueue([]), []);

  // Return a cleanup function for React callback refs. An older ref's cleanup
  // must not remove a replacement element registered for the same target.
  const registerTarget = useCallback((target: EffectTarget, element: HTMLDivElement) => {
    setTargets((current) => new Map(current).set(target, element));

    return () => {
      setTargets((current) => {
        if (current.get(target) !== element) return current;
        const next = new Map(current);
        next.delete(target);
        return next;
      });
    };
  }, []);

  return {
    queue,
    activeEffect: queue[0] ?? null,
    targets,
    enqueueEffect,
    finishEffect,
    clearEffects,
    registerTarget,
  };
}

export const EffectsContext = createContext<ReturnType<typeof useGameEffects> | null>(null);
