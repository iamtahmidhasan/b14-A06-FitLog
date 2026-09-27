"use client";

import { ToastContainer } from "react-toastify";

/**
 * The box that shows the toast popups.
 *
 * WHY A SEPARATE FILE?
 * This has to run in the browser, and this is the one place that decides how
 * every toast looks and behaves. Putting it in `layout.tsx` means the toasts
 * keep working no matter which page you are on.
 *
 * Note: `react-toastify` already marks itself as a client component, but the
 * `"use client"` line here makes that obvious to anyone reading this file.
 */
export default function Toaster() {
  return (
    <ToastContainer
      autoClose={2500}
      newestOnTop
      closeButton={false}
      pauseOnHover
    />
  );
}
