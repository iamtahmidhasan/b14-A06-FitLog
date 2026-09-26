
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Clock, Flame, Star, Dumbbell } from "lucide-react";

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
  calories?: number | string;
  rating?: number | string;
  muscleGroups?: string[];
  muscles?: string[];
  category?: string;
};

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchWorkouts() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        const data = await response.json();

        // Supports either:
        // { data: [...] }
        // { workouts: [...] }
        // or directly [...]
        const workoutData = Array.isArray(data)
          ? data
          : data.data || data.workouts || [];

        setWorkouts(workoutData);
      } catch (error) {
        console.error(error);
        setError("Unable to load workouts. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchWorkouts();
  }, []);

  return (
    <section id="library" className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Dumbbell className="h-5 w-5 text-primary" />

          <h2 className="text-3xl font-bold tracking-tight">
            The Library
          </h2>
        </div>

        <p className="mt-2 text-base-content/70">
          Explore exercises covering every major muscle group.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-box border border-base-300 bg-base-200"
            >
              <div className="h-48 animate-pulse bg-base-300" />

              <div className="space-y-4 p-5">
                <div className="h-4 w-24 animate-pulse rounded bg-base-300" />

                <div className="h-6 w-3/4 animate-pulse rounded bg-base-300" />

                <div className="h-4 w-1/2 animate-pulse rounded bg-base-300" />

                <div className="h-4 w-full animate-pulse rounded bg-base-300" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-box border border-error/30 bg-error/10 p-6 text-center">
          <p className="text-error">{error}</p>

          <button
            type="button"
            onClick={() => window.location.reload()}
            className="btn btn-sm mt-4 rounded-field"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && workouts.length === 0 && (
        <div className="rounded-box border border-base-300 bg-base-200 p-10 text-center">
          <Dumbbell className="mx-auto h-10 w-10 text-base-content/40" />

          <h3 className="mt-4 text-lg font-semibold">
            No workouts found
          </h3>

          <p className="mt-2 text-sm text-base-content/60">
            There are currently no workouts available in the library.
          </p>
        </div>
      )}

      {/* Workout Grid */}
      {!loading && !error && workouts.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => {
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
              (workout.category ? [workout.category] : []);

            return (
              <Link
                key={workout.id}
                href={`/exercise/${workout.id}`}
                className="group card overflow-hidden rounded-box border border-base-300 bg-base-200 transition-all duration-200 hover:-translate-y-1 hover:border-primary/60 hover:shadow-lg hover:shadow-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {/* Image */}
                <figure className="relative h-48 w-full overflow-hidden bg-base-300">
                  <Image
                    src={image}
                    alt={`${name} demonstration`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </figure>

                {/* Content */}
                <div className="card-body gap-3 p-5">
                  {/* Muscle Groups */}
                  {muscles.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {muscles.map((muscle) => (
                        <span
                          key={muscle}
                          className="badge badge-primary badge-sm"
                        >
                          {muscle}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Title */}
                  <h2 className="card-title font-heading text-xl normal-case tracking-tight">
                    {name}
                  </h2>

                  {/* Equipment */}
                  {workout.equipment && (
                    <p className="text-sm text-base-content/60">
                      {workout.equipment}
                    </p>
                  )}

                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-base-content/75">
                    {workout.duration !== undefined && (
                      <span className="inline-flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-primary" />
                        {workout.duration} min
                      </span>
                    )}

                    {workout.calories !== undefined && (
                      <span className="inline-flex items-center gap-1.5">
                        <Flame className="h-4 w-4 text-primary" />
                        {workout.calories} kcal
                      </span>
                    )}

                    {workout.rating !== undefined && (
                      <span className="inline-flex items-center gap-1.5">
                        <Star className="h-4 w-4 fill-current text-primary" />
                        {workout.rating}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}
