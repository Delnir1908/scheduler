import { renderHook } from "@testing-library/react";
import { act } from "react";

import useVisualMode from "./useVisualMode";

test("Initial test", () => {
  expect(true).toBe(true);
})

const FIRST = "FIRST";

test("useVisualMode should initialize with default value", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  expect(result.current.mode).toBe(FIRST);
});