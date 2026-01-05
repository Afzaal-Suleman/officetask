"use client";

import { useCounterStore } from "@/store/useCounterStore";

export default function HomePage() {
  const { count, increment, decrement, reset } = useCounterStore();

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Zustand Counter</h1>

      <p className="text-xl">Count: {count}</p>

      <div className="space-x-2">
        <button onClick={increment} className="btn">+</button>
        <button onClick={decrement} className="btn">-</button>
        <button onClick={reset} className="btn">Reset</button>
      </div>
    </div>
  );
}
