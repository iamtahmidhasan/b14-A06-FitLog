export type Workout = {
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
export function getWorkoutName(workout: Workout): string {
  return workout.name || workout.title || "Untitled Workout";
}
export function getWorkoutImage(workout: Workout): string | undefined {
  return workout.image || workout.imageUrl;
}
export function getWorkoutMuscles(workout: Workout): string[] {
  if (workout.muscleGroups?.length) return workout.muscleGroups;
  if (workout.muscles?.length) return workout.muscles;
  if (workout.category) return [workout.category];
  return [];
}

export function toNumber(value: number | string | undefined): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}
