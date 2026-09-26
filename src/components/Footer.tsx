import Link from "next/link";
import { Dumbbell } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-base-300 bg-base-200">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row">
        <Link
          href="/"
          className="flex items-center gap-2 font-heading text-lg font-semibold"
        >
          <Dumbbell className="h-5 w-5 text-primary" />
          <span>FitLog</span>
        </Link>

        <p className="text-center text-sm text-base-content/70 sm:text-right">
          © {new Date().getFullYear()} FitLog — Workout Library. Train hard,
          log honest.
        </p>
      </div>
    </footer>
  );
}
