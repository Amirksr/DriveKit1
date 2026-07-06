import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store";

/**
 * Pre-typed versions of `useDispatch`/`useSelector`. Prefer these over the
 * plain react-redux hooks throughout the app so `state` is inferred as
 * `RootState` and dispatched actions are checked against `AppDispatch`
 * without repeating the generic types at every call site.
 */
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
