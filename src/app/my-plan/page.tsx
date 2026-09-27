import type { Metadata } from 'next';
import MyPlanView from "@/components/my-plan/MyPlanView";
import type { Workout } from "@/types/workout";

const API_URL = "https://api.abcz.workers.dev/api/fitlog";
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
 
export const metadata: Metadata = {
  title: 'My Plan | FitLog',
  description: 'FitLog description',
}

export default async function Page() {
  const workouts = await getWorkouts();
  return <MyPlanView workouts={workouts} />;
}
