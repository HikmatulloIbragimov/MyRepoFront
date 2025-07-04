// src/routes/game/$gameSlug/index.tsx

import { createFileRoute, redirect } from "@tanstack/react-router";
import yaml from "js-yaml";
import { Game } from "../../../pages/game";

export const Route = createFileRoute("/game/$gameSlug/")({
  loader: async ({ params }) => {
    const { gameSlug } = params;
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + `/cdn/config/game/${gameSlug}.yaml`);
      if (!res.ok) throw new Error("config file not found");

      const text = await res.text();
      const parsed = yaml.load(text);
      return { gameData: parsed };
    } catch {
      throw redirect({ to: "/" });
    }
  },
  component: () => <Game />,
});
