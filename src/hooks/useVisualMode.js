import { useState } from "react";
export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      setMode(newMode);
      setHistory((prev) => prev.slice(1));
    }
    setMode(newMode);
    setHistory((prev) => [newMode, ...prev]);
  }
  function back() {
    if (history.length > 1) {
      setMode(history[1]);
      setHistory((prev) => prev.slice(1));
    }
  }

  return { mode, transition, back };
}
