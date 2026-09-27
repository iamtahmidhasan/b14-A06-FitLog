"use client";

import { Bookmark, CalendarPlus, Check } from "lucide-react";
import { toast } from "react-toastify";
import { MAX_PLAN_SIZE, useExercise } from "@/context/ExerciseProvider";
import { getWorkoutName, type Workout } from "@/types/workout";


export default function ExerciseActions({ workout }: { workout: Workout }) {
  const { todaysplan, setTodaysplan, save, setSave } = useExercise();

  const id = String(workout.id);
  const name = getWorkoutName(workout);
  const inPlan = todaysplan.includes(id);
  const isSaved = save.includes(id);
  const planIsFull = todaysplan.length >= MAX_PLAN_SIZE;

  function handleAddToPlan() {
    if (inPlan) {
      setTodaysplan(todaysplan.filter((item) => item !== id));
      toast.info(`${name} was removed from today's plan.`);
      return;
    }
    if (planIsFull) {
      toast.warn(`You can only plan ${MAX_PLAN_SIZE} exercises a day.`);
      return;
    }

    setTodaysplan([...todaysplan, id]);
    toast.success(`${name} was added to today's plan.`);
  }

  function handleSaveForLater() {
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
