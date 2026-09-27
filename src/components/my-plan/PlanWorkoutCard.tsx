"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Clock, Flame, Star, X } from "lucide-react";
import {
  getWorkoutImage,
  getWorkoutName,
  toNumber,
  type Workout,
} from "@/types/workout";

/**
 * One row in the plan / saved list.
 *
 * This component is repeated many times, so it lives in its own file instead
 * of being copy-pasted. It holds no state of its own: everything it changes
 * (`onMarkDone`, `onRemove`) comes from the parent. That is a simple pattern
 * and much easier to follow than a `useState` inside every row.
 */
type PlanWorkoutCardProps = {
  workout: Workout;

  /** Which list this row belongs to. Decides which buttons are shown. */
  mode: "plan" | "saved";

  /** Called by the "Mark as Done" button. Takes the card off the plan. */
  onMarkDone: (id: string) => void;

  /** Called by the X button. Takes the card off whichever list it is on. */
  onRemove: (id: string) => void;
};

export default function PlanWorkoutCard({
  workout,
  mode,
  onMarkDone,
  onRemove,
}: PlanWorkoutCardProps) {
  const name = getWorkoutName(workout);
  const image = getWorkoutImage(workout);
  const id = String(workout.id);

  // Only render a calorie badge when the API actually sent a value.
  const calories = toNumber(workout.caloriesBurned);
  const duration = toNumber(workout.duration);
  const rating = toNumber(workout.rating);

  return (
    <li className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-200 p-4 sm:flex-row sm:items-center">
      {/* Thumbnail, or a plain box if the exercise has no image. */}
      <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-2xl bg-base-300 sm:h-24 sm:w-36">
        {image ? (
          <Image
            src={image}
            alt={`${name} thumbnail`}
            fill
            sizes="144px"
            className="object-cover"
          />
        ) : null}
      </div>

      <div className="min-w-0 flex-1">
        <h2 className="font-heading text-xl normal-case">{name}</h2>

        {workout.equipment ? (
          <p className="text-sm text-base-content/70">{workout.equipment}</p>
        ) : null}

        <div className="mt-2 flex flex-wrap gap-3 text-sm">
          {duration > 0 ? (
            <span className="inline-flex items-center gap-1">
              <Clock className="h-4 w-4 text-primary" />
              {duration} min
            </span>
          ) : null}

          {calories > 0 ? (
            <span className="inline-flex items-center gap-1">
              <Flame className="h-4 w-4 text-primary" />
              {calories} kcal
            </span>
          ) : null}

          {rating > 0 ? (
            <span className="inline-flex items-center gap-1">
              <Star className="h-4 w-4 text-primary" />
              {rating}
            </span>
          ) : null}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/exercise/${workout.id}`}
          className="btn btn-sm btn-outline rounded-2xl"
        >
          View Details
        </Link>

        {/* "Mark as Done" only makes sense for today's plan, not the saved
            list, so we hide it in saved mode. Clicking it finishes the
            exercise, which takes the card off the plan. */}
        {mode === "plan" ? (
          <button
            type="button"
            onClick={() => onMarkDone(id)}
            className="btn btn-sm btn-accent rounded-2xl"
          >
            <Check className="h-4 w-4" />
            Mark as Done
          </button>
        ) : null}

        <button
          type="button"
          onClick={() => onRemove(id)}
          className="btn btn-sm btn-ghost btn-square rounded-2xl"
          aria-label={
            mode === "plan"
              ? `Remove ${name} from today's plan`
              : `Remove ${name} from saved`
          }
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </li>
  );
}
