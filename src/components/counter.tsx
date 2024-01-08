"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"


export default function Counter({
  dictionary,
}: {
  dictionary: {
    increment: string;
    decrement: string;
  };
}) {
  const [count, setCount] = useState(0);
  return (
    <p className="m-4 p-4 border rounded-md bg-green-300 font-bold">
      Client Component:
      <Button onClick={() => setCount((n) => n - 1)} variant="secondary">{dictionary.decrement}</Button>
      {/* <button
        
        className="bg-green-700 text-white rounded-md m-2 p-2"
      >
        
      </button> */}
      <span className="text-2xl">{count}</span>
      <button
        onClick={() => setCount((n) => n + 1)}
        className="bg-green-700 text-white rounded-md m-2 p-2"
      >
        {dictionary.increment}
      </button>
    </p>
  );
}
