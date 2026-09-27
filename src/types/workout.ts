/**
 * The shape of ONE exercise, exactly as the FitLog API sends it.
 *
 * Before this file existed the same type was copy-pasted into four different
 * files, and the copies slowly drifted apart (one of them was even looking for
 * a `calories` field that the API does not send). Keeping ONE definition here
 * means a mistake only has to be fixed once.
 *
 * Most fields are optional (`?`) because the API is not guaranteed to send
 * every field for every exercise, so our UI always has to have a fallback.
 */
export type Workout = {
  id: string | number;
  name?: string;
  /** The API also has a `title` field. We prefer `name` and fall back to it. */
  title?: string;
  description?: string;
  equipment?: string;
  image?: string;
  /** Older versions of the API used `imageUrl`. Kept as a fallback. */
  imageUrl?: string;
  duration?: number | string;
  /** NOTE: the real field name is `caloriesBurned`, NOT `calories`. */
  caloriesBurned?: number | string;
  rating?: number | string;
  difficulty?: string;
  sets?: number | string;
  reps?: string | number;
  muscleGroups?: string[];
  /** Older name for `muscleGroups`. */
  muscles?: string[];
  category?: string;
  instructions?: string[];
};

/**
 * The title to show for a workout. Falls back through the fields we know about
 * so the UI never shows a blank heading.
 */
export function getWorkoutName(workout: Workout): string {
  return workout.name || workout.title || "Untitled Workout";
}

/**
 * The image URL for a workout, or `undefined` when the API gave us none.
 * Returning `undefined` (instead of a path to a file that does not exist)
 * lets the UI draw a nice grey placeholder box instead of a broken image.
 */
export function getWorkoutImage(workout: Workout): string | undefined {
  return workout.image || workout.imageUrl;
}

/** The muscle group tags to show, falling back through the known field names. */
export function getWorkoutMuscles(workout: Workout): string[] {
  if (workout.muscleGroups?.length) return workout.muscleGroups;
  if (workout.muscles?.length) return workout.muscles;
  if (workout.category) return [workout.category];
  return [];
}

/**
 * Converts a value that may be a string or a number into a number we can add
 * up. Returns 0 instead of `NaN` so totals never show up as "NaN".
 */
export function toNumber(value: number | string | undefined): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}
