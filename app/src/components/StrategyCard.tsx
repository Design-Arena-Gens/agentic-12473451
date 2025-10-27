import { effortLabels, Strategy, timeToIncomeLabels } from "@/data/strategies";
import { cn } from "@/lib/utils";

type StrategyCardProps = {
  strategy: Strategy;
  highlight?: boolean;
};

export function StrategyCard({ strategy, highlight = false }: StrategyCardProps) {
  return (
    <article
      className={cn(
        "flex flex-col gap-4 rounded-3xl border border-zinc-100 bg-white/70 p-6 shadow-sm shadow-zinc-200/40 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-zinc-400/30 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-100",
        highlight && "border-indigo-400/60 shadow-lg shadow-indigo-300/30"
      )}
    >
      <header className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-indigo-500">
          {strategy.leverage.map((item) => (
            <span
              key={item}
              className="rounded-md bg-indigo-100 px-2 py-1 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-200"
            >
              {labelFromLeverage(item)}
            </span>
          ))}
        </div>
        <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
          {strategy.title}
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">{strategy.summary}</p>
      </header>

      <p className="rounded-2xl bg-zinc-900 text-sm text-white dark:bg-zinc-800 p-3">
        {strategy.whyItWorks}
      </p>

      <section className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
        <InfoBlock label="Impegno" value={effortLabels[strategy.effort]} />
        <InfoBlock
          label="Tempo per la prima entrata"
          value={timeToIncomeLabels[strategy.timeToFirstIncome]}
        />
        <InfoBlock
          label="Ore settimanali"
          value={`${strategy.weeklyHours}h`}
        />
        <InfoBlock
          label="Livello abilità"
          value={labelFromSkill(strategy.skillLevel)}
        />
      </section>

      <section className="space-y-2 text-sm">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Requisiti
        </h4>
        <ul className="space-y-1">
          {strategy.requirements.map((item) => (
            <li key={item} className="pl-4 text-zinc-600 dark:text-zinc-300">
              • {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2 text-sm">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Passi consigliati
        </h4>
        <ul className="space-y-2">
          {strategy.steps.map((step) => (
            <li
              key={step.title}
              className="rounded-2xl border border-zinc-100 bg-zinc-50/60 p-3 dark:border-zinc-700 dark:bg-zinc-800/50"
            >
              <p className="font-semibold text-zinc-800 dark:text-white">
                {step.title}
              </p>
              <p className="text-zinc-600 dark:text-zinc-300">{step.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-2 text-sm">
        <h4 className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
          Come scalare
        </h4>
        <ul className="space-y-1">
          {strategy.growthIdeas.map((idea) => (
            <li key={idea} className="pl-4 text-zinc-600 dark:text-zinc-300">
              • {idea}
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

type InfoBlockProps = {
  label: string;
  value: string;
};

function InfoBlock({ label, value }: InfoBlockProps) {
  return (
    <div className="rounded-2xl border border-zinc-100 bg-white px-3 py-2 text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-800/80 dark:text-zinc-100">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <p className="text-sm font-medium text-zinc-800 dark:text-white">{value}</p>
    </div>
  );
}

function labelFromLeverage(leverage: Strategy["leverage"][number]) {
  switch (leverage) {
    case "skills":
      return "Skill";
    case "time":
      return "Tempo";
    case "network":
      return "Network";
    case "content":
      return "Contenuti";
    case "automation":
      return "Automazione";
    default:
      return leverage;
  }
}

function labelFromSkill(level: Strategy["skillLevel"]) {
  if (level === "beginner") return "Principiante";
  if (level === "intermediate") return "Intermedio";
  return "Avanzato";
}
