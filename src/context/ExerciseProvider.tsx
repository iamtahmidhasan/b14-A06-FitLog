"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export const MAX_PLAN_SIZE = 5;

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
export function useExercise() {
  const context = useContext(ExerciseContext);
  if (!context) {
    throw new Error(
      "useExercise() must be used inside <ExerciseProvider> in src/app/layout.tsx",
    );
  }

  return context;
}
