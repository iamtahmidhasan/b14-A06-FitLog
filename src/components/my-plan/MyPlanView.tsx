"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { MAX_PLAN_SIZE, useExercise } from "@/context/ExerciseProvider";
import PlanWorkoutCard from "./PlanWorkoutCard";
import { toNumber, getWorkoutName, type Workout } from "@/types/workout";

/** Which list the user is looking at. */
type Tab = "plan" | "saved";

/** The ways the list can be sorted. */
type SortKey = "duration" | "calories" | "rating";

/**
 * The visible part of the "My Plan" page.
 *
 * WHY IS THIS A CLIENT COMPONENT?
 * The plan and saved lists live in the browser (they come from the context),
 * and a server component cannot use context. So `page.tsx` fetches the
 * exercises on the server and passes them down as a prop.
 */
export default function MyPlanView({ workouts }: { workouts: Workout[] }) {
  // The context only holds the IDs, so this is where the IDs are matched up
  // with the real exercises that the server sent.
  const { todaysplan, setTodaysplan, save, setSave } = useExercise();

  // Which tab is open, and how the list is sorted.
  const [tab, setTab] = useState<Tab>("plan");
  const [sortBy, setSortBy] = useState<SortKey>("duration");

  const todayPlan = workouts.filter((workout) =>
    todaysplan.includes(String(workout.id)),
  );

  const savedWorkouts = workouts.filter((workout) =>
    save.includes(String(workout.id)),
  );

  // The list for the open tab, in the chosen order.
  const visible = tab === "plan" ? todayPlan : savedWorkouts;
  const sorted = sortWorkouts(visible, sortBy);

  const minutes = todayPlan.reduce(
    (total, workout) => total + toNumber(workout.duration),
    0,
  );

  const calories = todayPlan.reduce(
    (total, workout) => total + toNumber(workout.caloriesBurned),
    0,
  );

  function handleMarkDone(id: string) {
    // Finishing an exercise means it leaves today's plan, so the card
    // disappears from the list.
    setTodaysplan(todaysplan.filter((item) => item !== id));
    toast.success(`${nameOf(id)} is done. Nice work!`);
  }

  function handleRemove(id: string) {
    // Remove from whichever list we are looking at.
    if (tab === "plan") {
      setTodaysplan(todaysplan.filter((item) => item !== id));
      toast.info(`${nameOf(id)} was removed from today's plan.`);
    } else {
      setSave(save.filter((item) => item !== id));
      toast.info(`${nameOf(id)} was removed from your saved list.`);
    }
  }

  function handleClearPlan() {
    setTodaysplan([]);
    toast.info("Today's plan was cleared.");
  }

  // Looks up the name of an exercise from its id, for the toast messages.
  function nameOf(id: string): string {
    const match = workouts.find((workout) => String(workout.id) === id);
    return match ? getWorkoutName(match) : "Workout";
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="space-y-2">
        <h1 className="text-4xl">My Plan</h1>

        <p className="text-base-content/70">
          Cap of {MAX_PLAN_SIZE} lifts for today. Finish them, then load more.
        </p>
      </header>

      {/* Stats for today's plan */}
      <div className="stats stats-vertical w-full rounded-2xl border border-base-300 bg-base-200 shadow-none sm:stats-horizontal">
        <div className="stat">
          <div className="stat-title">Exercises</div>
          <div className="stat-value text-primary">
            {todayPlan.length}
            <span className="text-lg text-base-content/50">
              /{MAX_PLAN_SIZE}
            </span>
          </div>
        </div>

        <div className="stat">
          <div className="stat-title">Minutes</div>
          <div className="stat-value">{minutes}</div>
        </div>

        <div className="stat">
          <div className="stat-title">Calories</div>
          <div className="stat-value">{calories}</div>
        </div>
      </div>

      {/* Tabs + Sort */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="tablist" className="tabs tabs-box w-fit bg-base-200">
          <button
            type="button"
            role="tab"
            onClick={() => setTab("plan")}
            aria-selected={tab === "plan"}
            className={
              tab === "plan" ? "tab gap-2 tab-active" : "tab gap-2"
            }
          >
            Today&apos;s Plan
            <span className="badge badge-primary badge-sm">
              {todayPlan.length}
            </span>
          </button>

          <button
            type="button"
            role="tab"
            onClick={() => setTab("saved")}
            aria-selected={tab === "saved"}
            className={
              tab === "saved" ? "tab gap-2 tab-active" : "tab gap-2"
            }
          >
            Saved
            <span className="badge badge-sm">{savedWorkouts.length}</span>
          </button>
        </div>

        <label className="form-control w-full max-w-xs">
          <span className="label-text mb-1">Sort By</span>

          <select
            className="select select-bordered rounded-2xl"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value as SortKey)}
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </label>
      </div>

      {/* The list for the open tab */}
      <section className="space-y-4">
        {sorted.length === 0 ? (
          <EmptyState mode={tab} />
        ) : (
          <ul className="space-y-4">
            {sorted.map((workout) => (
              <PlanWorkoutCard
                key={workout.id}
                workout={workout}
                mode={tab}
                onMarkDone={handleMarkDone}
                onRemove={handleRemove}
              />
            ))}
          </ul>
        )}

        {/* Start again with an empty plan */}
        {tab === "plan" && todayPlan.length > 0 ? (
          <button
            type="button"
            onClick={handleClearPlan}
            className="btn btn-ghost btn-sm rounded-2xl"
          >
            Clear today&apos;s plan
          </button>
        ) : null}
      </section>
    </div>
  );
}

/**
 * Sorts a copy of the list, biggest value first.
 * The `[...]` makes a copy, so the original array is left alone.
 */
function sortWorkouts(list: Workout[], key: SortKey): Workout[] {
  return [...list].sort((a, b) => valueFor(b, key) - valueFor(a, key));
}

/** Reads the number we sort by, for one workout. */
function valueFor(workout: Workout, key: SortKey): number {
  if (key === "duration") return toNumber(workout.duration);
  if (key === "calories") return toNumber(workout.caloriesBurned);
  return toNumber(workout.rating);
}

/** Shown when the open list has nothing in it. */
function EmptyState({ mode }: { mode: Tab }) {
  if (mode === "saved") {
    return (
      <div className="rounded-2xl border border-base-300 bg-base-200 p-8 text-center">
        <h2 className="text-xl font-semibold">No saved exercises</h2>

        <p className="mt-2 text-sm text-base-content/70">
          Save exercises from the library and they will appear here.
        </p>

        <Link href="/" className="btn btn-accent mt-4 rounded-2xl">
          Browse workouts
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-base-300 bg-base-200 p-8 text-center">
      <h2 className="text-xl font-semibold">
        No exercises in today&apos;s plan
      </h2>

      <p className="mt-2 text-sm text-base-content/70">
        Add exercises to your plan to see them here.
      </p>

      <Link href="/" className="btn btn-accent mt-4 rounded-2xl">
        Browse workouts
      </Link>
    </div>
  );
}
