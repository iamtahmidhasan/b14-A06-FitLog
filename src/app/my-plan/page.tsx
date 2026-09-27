import MyPlanView from "@/components/my-plan/MyPlanView";
import type { Workout } from "@/types/workout";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

/**
 * Fetches every exercise from the API.
 *
 * WHY A SERVER COMPONENT?
 * The exercise list never changes between users, so fetching it on the server
 * means the browser gets ready-made HTML. The plan/saved lists are personal, so
 * those come from the browser via the context instead (see MyPlanView).
 *
 * We return an empty list on failure instead of throwing, so a broken API
 * shows an empty page rather than a crash.
 */
async function getWorkouts(): Promise<Workout[]> {
  try {
    const res = await fetch(API_URL);

    if (!res.ok) return [];

    const data: unknown = await res.json();

    return Array.isArray(data) ? (data as Workout[]) : [];
  } catch {
    return [];
  }
}

export default async function Page() {
  const workouts = await getWorkouts();

  // The ids come from the context inside MyPlanView, so nothing is hardcoded
  // here any more. We just hand over the full list of exercises.
  return <MyPlanView workouts={workouts} />;
}
