import React from "react";
import Image from "next/image";

export default function Hero() {
  return (
    <div>
      <section className="grid items-center gap-10 rounded-2xl border border-base-300 bg-base-200 p-8 lg:grid-cols-2 lg:p-12">
        <div className="space-y-5">
          <p className="font-heading text-sm  text-primary uppercase font-geist">
            Workout Library
          </p>

          <h1 className="text-4xl leading-tight sm:text-5xl uppercase">
            Train with intent. Log every set.
          </h1>

          <p className="max-w-md text-base-content/75">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a href="#library" className="btn btn-accent rounded-2xl">
            Browse Workouts
          </a>
        </div>

        <Image
          src="/assets/banner.png"
          alt="Gym Illustration"
          width={500}
          height={400}
          className="w-full"
          priority
        />
      </section>
    </div>
  );
}