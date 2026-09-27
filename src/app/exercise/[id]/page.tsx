import Image from "next/image";
import {
  Bookmark,
  CalendarPlus,
} from "lucide-react";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

type Workout = {
  id: string | number;
  name?: string;
  title?: string;
  description?: string;
  equipment?: string;
  image?: string;
  imageUrl?: string;
  duration?: number | string;
  caloriesBurned?: number | string;
  rating?: number | string;
  difficulty?: string;
  sets?: number | string;
  reps?: string | number;
  muscleGroups?: string[];
  muscles?: string[];
  category?: string;
  instructions?: string[];
};

async function getWorkout(id: string): Promise<Workout | null> {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) return null;
    const data: Workout[] = await res.json();
    if (!Array.isArray(data)) return null;
    return data.find((workout) => String(workout.id) === String(id)) ?? null;
  } catch {
    return null;
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const workout = await getWorkout(id);

  if (!workout) {
    return (
      <article className="grid gap-10 lg:grid-cols-2">
        <div className="relative min-h-72 overflow-hidden rounded-2xl border border-base-300 bg-base-200" />

        <div>
          <h1 className="text-4xl">
            Workout not found
          </h1>

          <p className="mt-4 text-base-content/75">
            The requested workout could not be found.
          </p>
        </div>
      </article>
    );
  }

  const name =
    workout.name ||
    workout.title ||
    "Untitled Workout";

  const image =
    workout.image ||
    workout.imageUrl ||
    "/placeholder-workout.jpg";

  const muscles =
    workout.muscleGroups ||
    workout.muscles ||
    (workout.category
      ? [workout.category]
      : []);

  return (
    <article className="grid gap-10 lg:grid-cols-2">
      {/* Image */}
      <div className="relative min-h-72 overflow-hidden rounded-2xl border border-base-300">
        <Image
          src={workout.image as string}
          alt= {name}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div>
        <h1 className="text-4xl uppercase">
          {name}
        </h1>

        {workout.description && (
          <p className="mt-4 text-base-content/75">
            {workout.description}
          </p>
        )}

        {/* Muscle Groups */}
        {muscles.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {muscles.map((muscle) => (
              <span
                key={muscle}
                className="badge badge-primary"
              >
                {muscle}
              </span>
            ))}
          </div>
        )}

        {/* Workout Information */}
        <dl className="mt-6 divide-y divide-base-300 overflow-hidden rounded-2xl border border-base-300">
          {workout.equipment && (
            <div className="grid grid-cols-1 gap-1 bg-base-200 px-4 py-3 sm:grid-cols-2 sm:items-center">
              <dt className="font-heading text-sm uppercase font-geist">
                Equipment
              </dt>
              <dd>{workout.equipment}</dd>
            </div>
          )}

          {workout.difficulty && (
            <div className="grid grid-cols-1 gap-1 bg-base-200 px-4 py-3 sm:grid-cols-2 sm:items-center">
              <dt className="font-heading text-sm uppercase font-geist">
                Difficulty
              </dt>
              <dd>{workout.difficulty}</dd>
            </div>
          )}

          {workout.sets !== undefined && (
            <div className="grid grid-cols-1 gap-1 bg-base-200 px-4 py-3 sm:grid-cols-2 sm:items-center">
              <dt className="font-heading text-sm uppercase font-geist">
                Sets
              </dt>
              <dd>{workout.sets}</dd>
            </div>
          )}

          {workout.reps !== undefined && (
            <div className="grid grid-cols-1 gap-1 bg-base-200 px-4 py-3 sm:grid-cols-2 sm:items-center">
              <dt className="font-heading text-sm uppercase font-geist">
                Reps
              </dt>
              <dd>{workout.reps}</dd>
            </div>
          )}

          {workout.duration !== undefined && (
            <div className="grid grid-cols-1 gap-1 bg-base-200 px-4 py-3 sm:grid-cols-2 sm:items-center">
              <dt className="font-heading text-sm uppercase font-geist">
                Duration
              </dt>
              <dd>{workout.duration} min</dd>
            </div>
          )}

          {workout.caloriesBurned !== undefined && (
            <div className="grid grid-cols-1 gap-1 bg-base-200 px-4 py-3 sm:grid-cols-2 sm:items-center">
              <dt className="font-heading text-sm uppercase font-geist">
                Calories
              </dt>
              <dd>{workout.caloriesBurned} kcal</dd>
            </div>
          )}

          {workout.rating !== undefined && (
            <div className="grid grid-cols-1 gap-1 bg-base-200 px-4 py-3 sm:grid-cols-2 sm:items-center">
              <dt className="font-heading text-sm uppercase font-geist">
                Rating
              </dt>
              <dd>{workout.rating}</dd>
            </div>
          )}
        </dl>

        {/* Instructions */}
        {workout.instructions &&
          workout.instructions.length > 0 && (
            <>
              <h2 className="mt-8 text-2xl">
                Instructions
              </h2>

              <ol className="mt-4 list-decimal space-y-3 pl-5">
                {workout.instructions.map(
                  (instruction, index) => (
                    <li key={index}>
                      {instruction}
                    </li>
                  )
                )}
              </ol>
            </>
          )}

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            className="btn btn-accent rounded-2xl"
          >
            <CalendarPlus className="h-4 w-4" />
            Add to today&apos;s plan
          </button>

          <button
            type="button"
            className="btn btn-outline rounded-2xl"
          >
            <Bookmark className="h-4 w-4" />
            Save for later
          </button>
        </div>
      </div>
    </article>
  );
}
