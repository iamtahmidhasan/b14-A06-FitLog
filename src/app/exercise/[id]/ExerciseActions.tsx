"use client";

import { Bookmark, CalendarPlus, Check } from "lucide-react";
import { toast } from "react-toastify";
import { MAX_PLAN_SIZE, useExercise } from "@/context/ExerciseProvider";
import { getWorkoutName, type Workout } from "@/types/workout";

/**
 * The "Add to today's plan" and "Save for later" buttons.
 *
 * WHY IS THIS A SEPARATE FILE?
 * `page.tsx` is a server component (it fetches the data on the server) and
 * cannot use `useState` or context. So the two buttons that need the browser
 * live here, and each click fires a toast to say what happened.
 */
export default function ExerciseActions({ workout }: { workout: Workout }) {
  // Read the plan and saved lists from the context.
  const { todaysplan, setTodaysplan, save, setSave } = useExercise();

  const id = String(workout.id);
  const name = getWorkoutName(workout);

  // These are recalculated on every render, so they update as soon as the
  // user clicks a button.
  const inPlan = todaysplan.includes(id);
  const isSaved = save.includes(id);
  const planIsFull = todaysplan.length >= MAX_PLAN_SIZE;

  function handleAddToPlan() {
    // If it is already in the plan, this click takes it out.
    if (inPlan) {
      setTodaysplan(todaysplan.filter((item) => item !== id));
      toast.info(`${name} was removed from today's plan.`);
      return;
    }

    // A full plan cannot take more.
    if (planIsFull) {
      toast.warn(`You can only plan ${MAX_PLAN_SIZE} exercises a day.`);
      return;
    }

    setTodaysplan([...todaysplan, id]);
    toast.success(`${name} was added to today's plan.`);
  }

  function handleSaveForLater() {
    // If it is already saved, this click takes it off the saved list.
    if (isSaved) {
      setSave(save.filter((item) => item !== id));
      toast.info(`${name} was removed from your saved list.`);
    } else {
      setSave([...save, id]);
      toast.success(`${name} was saved for later.`);
    }
  }

  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        onClick={handleAddToPlan}
        // Outlined once it is in the plan, because the click now removes it.
        className={
          inPlan ? "btn btn-outline rounded-2xl" : "btn btn-accent rounded-2xl"
        }
      >
        {inPlan ? (
          <Check className="h-4 w-4" />
        ) : (
          <CalendarPlus className="h-4 w-4" />
        )}

        {inPlan ? "Remove from today's plan" : "Add to today's plan"}
      </button>

      <button
        type="button"
        onClick={handleSaveForLater}
        className={
          isSaved
            ? "btn btn-accent rounded-2xl"
            : "btn btn-outline rounded-2xl"
        }
      >
        {isSaved ? (
          <Check className="h-4 w-4" />
        ) : (
          <Bookmark className="h-4 w-4" />
        )}

        {isSaved ? "Saved for later" : "Save for later"}
      </button>
    </div>
  );
}
