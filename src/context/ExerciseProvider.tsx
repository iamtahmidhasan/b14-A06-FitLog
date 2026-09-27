"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

/** How many exercises a user is allowed to plan for one day. */
export const MAX_PLAN_SIZE = 5;

/** What every component can read from the context. */
type ExerciseContextType = {
  todaysplan: string[];
  setTodaysplan: (ids: string[]) => void;
  save: string[];
  setSave: (ids: string[]) => void;
};

const ExerciseContext = createContext<ExerciseContextType | null>(null);

export default function ExerciseProvider({
  children,
}: {
  children: ReactNode;
}) {
  // We only keep the exercise IDs, not the whole exercises. The pages fetch
  // the full data anyway, and a copy kept in the browser could go out of date.
  // IDs are stored as text so that the number 7 and the text "7" match.
  const [todaysplan, setTodaysplan] = useState<string[]>([]);
  const [save, setSave] = useState<string[]>([]);

  return (
    <ExerciseContext.Provider
      value={{ todaysplan, setTodaysplan, save, setSave }}
    >
      {children}
    </ExerciseContext.Provider>
  );
}

/**
 * The one way a component reads this context.
 * It is a hook so every component gets the types for free, and so a missing
 * provider gives a clear error instead of a confusing crash.
 */
export function useExercise() {
  const context = useContext(ExerciseContext);

  // `null` means there is no <ExerciseProvider> above this component.
  if (!context) {
    throw new Error(
      "useExercise() must be used inside <ExerciseProvider> in src/app/layout.tsx",
    );
  }

  return context;
}
