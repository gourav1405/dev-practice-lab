import useTimer from "./useTimer.js";
import { useEffect } from "react";
export default function App() {
  const { isRunning, start, end, seconds } = useTimer(5);

  /**
   * 🧠 In simple word
  useEffect runs:
On first render ✅
Whenever anything in dependency array changes
🎯 So here:
[start]

👉 Means:

“If the start function reference changes → run again”

⚠️ Important Insight (THIS IS KEY)

In most cases:

👉 start comes from your custom hook (useTimer)

If start is NOT memoized (using useCallback):

👉 It will be new on every render

👉 So this effect will run again and again ❌
   */
  // useEffect(() => {
  //   start;
  // }, [start]);

  return (
    <div>
      <h2>{isRunning ? seconds : "No Timer Runnning"}</h2>
      <button onClick={start} disabled={isRunning}>
        Start Timer
      </button>
      <button onClick={end} disabled={!isRunning}>
        Stop Timer
      </button>
    </div>
  );
}
