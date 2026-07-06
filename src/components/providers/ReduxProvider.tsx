"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";

/**
 * Wraps the app with the Redux `Provider`. This has to be a Client
 * Component (Next.js App Router renders `layout.tsx` on the server by
 * default, and the Redux context/store only make sense in the browser).
 */
export default function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
