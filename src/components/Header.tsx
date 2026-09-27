"use client";

import Link from "next/link";
import { useExercise } from "@/context/ExerciseProvider";
export default function Header() {
  const { todaysplan, save } = useExercise();

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <nav className="navbar mx-auto max-w-6xl px-4">
        <div className="navbar-start gap-2">
          <div className="dropdown lg:hidden">
            <button
              type="button"
              className="btn btn-ghost btn-square"
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-menu h-5 w-5"
                aria-hidden="true"
              >
                <path d="M4 5h16"></path>
                <path d="M4 12h16"></path>
                <path d="M4 19h16"></path>
              </svg>
            </button>
            <ul
              className="menu dropdown-content menu-sm z-50 mt-3 w-52 rounded-2xl border border-base-300 bg-base-200 p-2"
            >
              <li>
                <Link href="/">Workouts</Link>
              </li>
              <li>
                <Link href="/my-plan">My Plan</Link>
              </li>
            </ul>
          </div>
          <Link
            className="flex items-center gap-2 font-heading text-xl tracking-wide uppercase font-geist"
            href="/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-dumbbell h-6 w-6 text-primary"
              aria-hidden="true"
            >
              <path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z"></path>
              <path d="m2.5 21.5 1.4-1.4"></path>
              <path d="m20.1 3.9 1.4-1.4"></path>
              <path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z"></path>
              <path d="m9.6 14.4 4.8-4.8"></path>
            </svg>
            FitLog
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">
            <li>
              <Link className="bg-base-200 font-semibold text-accent" href="/">
                Workouts
              </Link>
            </li>
            <li>
              <Link className="" href="/my-plan">
                My Plan
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end gap-2">
          <Link
            className="btn btn-ghost btn-sm gap-2"
            aria-label={`Today's plan, ${todaysplan.length} exercises`}
            href="/my-plan"
          >
            Plan
            <span className="badge badge-primary badge-sm">
              {todaysplan.length}
            </span>
          </Link>

          <Link
            className="btn btn-ghost btn-sm gap-2"
            aria-label={`Saved workouts, ${save.length} exercises`}
            href="/my-plan"
          >
            Saved
            <span className="badge badge-outline badge-sm">
              {save.length}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
