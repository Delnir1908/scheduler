import { useState } from "react";

export default function useVisualMode(initial){
  
  const [mode, setMode] = useState(initial);

  const transition = (newMode) => {
    setMode(newMode);
  }

  const back = (previousMode) => {
    setMode(previousMode);
  }

  return { mode, transition, back };
}