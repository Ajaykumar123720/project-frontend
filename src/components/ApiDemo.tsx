import React from "react";
import { useQuery } from "@tanstack/react-query";
import api, { Fund } from "@/lib/api";

export default function ApiDemo() {
  const { data, error, isLoading } = useQuery<Fund[]>(["funds"], api.fetchFunds);

  if (isLoading) return <div>Loading funds…</div>;
  if (error) return <div>Error loading funds</div>;

  return (
    <div>
      <h2 className="text-lg font-semibold mb-2">Funds (demo)</h2>
      <ul>
        {data?.map((f) => (
          <li key={f.id} className="mb-1">{f.name} ({f.id})</li>
        ))}
      </ul>
    </div>
  );
}
