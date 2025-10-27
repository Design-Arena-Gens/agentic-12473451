import { Strategy, UserPreferences } from "@/data/strategies";

type PlanSummaryProps = {
  preferences: UserPreferences;
  strategies: Strategy[];
};

export function PlanSummary({ preferences, strategies }: PlanSummaryProps) {
  if (strategies.length === 0) {
    return (
      <section className="rounded-3xl border border-dashed border-zinc-300 bg-white/40 p-6 text-center text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-300">
        Nessuna combinazione trovata. Amplia le leve o aumenta leggermente le ore disponibili.
      </section>
    );
  }

  const primary = strategies[0];

  return (
    <section className="flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-gradient-to-br from-white/80 via-white to-indigo-50/70 p-6 text-zinc-800 shadow-xl dark:border-zinc-800 dark:from-zinc-900/80 dark:via-zinc-900 dark:to-indigo-950/30 dark:text-zinc-100">
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-300">
          Piano consigliato
        </p>
        <h2 className="text-2xl font-semibold">{primary.title}</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">{primary.summary}</p>
      </header>

      <section className="grid grid-cols-1 gap-4 rounded-2xl border border-indigo-100 bg-white/70 p-4 text-sm dark:border-indigo-400/20 dark:bg-zinc-900/70">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-indigo-500">
          Perché è coerente con te
        </h3>
        <ul className="space-y-2">
          <li>
            • Richiede circa {primary.weeklyHours} ore a settimana: tu ne hai{" "}
            {preferences.weeklyHours}.
          </li>
          <li>
            • Livello consigliato {translateSkill(primary.skillLevel)} e tu hai impostato{" "}
            {translateSkill(preferences.skillLevel)}.
          </li>
          <li>
            • Valorizza le leve {primary.leverage.map(translateLever).join(", ")} che hai selezionato.
          </li>
        </ul>
      </section>

      {strategies.length > 1 && (
        <section className="space-y-2 rounded-2xl border border-zinc-200 bg-white/70 p-4 text-sm dark:border-zinc-700 dark:bg-zinc-900/70">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
            Altre idee compatibili
          </h3>
          <ul className="space-y-1">
            {strategies.slice(1).map((strategy) => (
              <li key={strategy.id} className="text-zinc-600 dark:text-zinc-300">
                • {strategy.title} – {strategy.summary}
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
}

function translateSkill(level: Strategy["skillLevel"]) {
  switch (level) {
    case "beginner":
      return "Principiante";
    case "intermediate":
      return "Intermedio";
    case "advanced":
      return "Avanzato";
  }
}

function translateLever(lever: Strategy["leverage"][number]) {
  switch (lever) {
    case "skills":
      return "competenze";
    case "time":
      return "tempo";
    case "network":
      return "network";
    case "content":
      return "contenuti";
    case "automation":
      return "automazioni";
  }
}

