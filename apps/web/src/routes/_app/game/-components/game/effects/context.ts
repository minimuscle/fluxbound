import type { GameEffect } from "@fluxbound/schema";
import { createContext, useCallback, useRef, useState } from "react";

export type EffectTarget = GameEffect["message"]["target"];

export function useGameEffects() {
  const [queue, setQueue] = useState<GameEffect[]>([]);
  const queueRef = useRef<GameEffect[]>([]);
  const pendingUpdateRef = useRef<(() => void) | null>(null);
  const [targets, setTargets] = useState<ReadonlyMap<EffectTarget, HTMLDivElement>>(() => new Map());

  const enqueueEffect = useCallback((message: GameEffect["message"]) => {
    const effect: GameEffect = { id: crypto.randomUUID(), message };
    queueRef.current = [...queueRef.current, effect];
    setQueue(queueRef.current);
  }, []);

  const finishEffect = useCallback((id: GameEffect["id"]) => {
    if (queueRef.current[0]?.id !== id) return;
    queueRef.current = queueRef.current.slice(1);
    setQueue(queueRef.current);
    if (queueRef.current.length === 0) {
      const update = pendingUpdateRef.current;
      pendingUpdateRef.current = null;
      update?.();
    }
  }, []);

  const clearEffects = useCallback(() => {
    queueRef.current = [];
    pendingUpdateRef.current = null;
    setQueue([]);
  }, []);

  const runAfterEffects = useCallback((update: () => void) => {
    // Keep the displayed board intact until every queued animation has completed.
    // Newer server snapshots replace older pending snapshots.
    if (queueRef.current.length > 0) pendingUpdateRef.current = update;
    else update();
  }, []);

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
    runAfterEffects,
    registerTarget,
  };
}

export const EffectsContext = createContext<ReturnType<typeof useGameEffects> | null>(null);
