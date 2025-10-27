"use client";

import { UserPreferences } from "@/data/strategies";
import { useState } from "react";

type PreferenceFormProps = {
  onChange: (preferences: UserPreferences) => void;
  initialPreferences?: UserPreferences;
};

const defaultPreferences: UserPreferences = {
  weeklyHours: 4,
  skillLevel: "beginner",
  leverage: ["skills", "time", "content"],
};

export function PreferenceForm({
  onChange,
  initialPreferences = defaultPreferences,
}: PreferenceFormProps) {
  const [preferences, setPreferences] = useState<UserPreferences>(initialPreferences);

  const updatePreferences = (next: Partial<UserPreferences>) => {
    const merged: UserPreferences = {
      ...preferences,
      ...next,
    };
    setPreferences(merged);
    onChange(merged);
  };

  return (
    <form className="grid gap-6 rounded-3xl border border-zinc-100 bg-white/70 p-6 shadow-md shadow-zinc-200/40 dark:border-zinc-800 dark:bg-zinc-900/70 dark:text-zinc-100">
      <section className="space-y-3">
        <header className="space-y-1">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Imposta la tua situazione attuale
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-300">
            Ti proponiamo strategie realistiche in base al tempo disponibile e alle leve che puoi usare subito.
          </p>
        </header>

        <label className="flex flex-col gap-2 text-sm">
          <span className="font-semibold text-zinc-700 dark:text-zinc-200">
            Ore disponibili a settimana
          </span>
          <input
            type="range"
            min={1}
            max={15}
            step={1}
            value={preferences.weeklyHours}
            onChange={(event) =>
              updatePreferences({ weeklyHours: Number(event.target.value) })
            }
            className="accent-indigo-500"
          />
          <span className="text-xs text-zinc-500">
            {preferences.weeklyHours} ore dedicate – scegli un valore sostenibile nel tempo.
          </span>
        </label>

        <div className="space-y-2 text-sm">
          <span className="font-semibold text-zinc-700 dark:text-zinc-200">
            Livello di abilità attuale
          </span>
          <div className="grid grid-cols-3 gap-2">
            {(["beginner", "intermediate", "advanced"] as const).map((level) => (
              <button
                key={level}
                type="button"
                className={`
                  rounded-xl border px-3 py-3 text-xs font-semibold uppercase tracking-wider transition
                  ${
                    preferences.skillLevel === level
                      ? "border-indigo-500 bg-indigo-500 text-white shadow-md shadow-indigo-300/50"
                      : "border-zinc-200 bg-white text-zinc-600 hover:border-indigo-200 hover:text-indigo-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                  }
                `}
                onClick={() => updatePreferences({ skillLevel: level })}
              >
                {labelFromSkill(level)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 text-sm">
          <span className="font-semibold text-zinc-700 dark:text-zinc-200">
            Leve che puoi usare senza investimenti
          </span>
          <div className="flex flex-wrap gap-2">
            {(["skills", "time", "network", "content", "automation"] as const).map(
              (lever) => {
                const active = preferences.leverage.includes(lever);
                return (
                  <button
                    key={lever}
                    type="button"
                    className={`
                      rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition
                      ${
                        active
                          ? "border-indigo-500 bg-indigo-50 text-indigo-600 dark:border-indigo-400 dark:bg-indigo-500/20 dark:text-indigo-100"
                          : "border-zinc-200 bg-white text-zinc-600 hover:border-indigo-200 hover:text-indigo-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                      }
                    `}
                    onClick={() =>
                      toggleLeverage(lever, preferences, updatePreferences)
                    }
                  >
                    {labelFromLever(lever)}
                  </button>
                );
              }
            )}
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Seleziona almeno due leve per combinare competenze, tempo e relazioni senza spese.
          </p>
        </div>
      </section>
    </form>
  );
}

function toggleLeverage(
  lever: UserPreferences["leverage"][number],
  preferences: UserPreferences,
  update: (prefs: Partial<UserPreferences>) => void
) {
  const alreadyActive = preferences.leverage.includes(lever);
  if (alreadyActive && preferences.leverage.length <= 1) {
    return;
  }
  const leverage = alreadyActive
    ? preferences.leverage.filter((value) => value !== lever)
    : [...preferences.leverage, lever];
  update({ leverage });
}

function labelFromSkill(level: UserPreferences["skillLevel"]) {
  switch (level) {
    case "beginner":
      return "Principiante";
    case "intermediate":
      return "Intermedio";
    case "advanced":
      return "Avanzato";
  }
}

function labelFromLever(lever: UserPreferences["leverage"][number]) {
  switch (lever) {
    case "skills":
      return "Competenze";
    case "time":
      return "Tempo";
    case "network":
      return "Network";
    case "content":
      return "Contenuti";
    case "automation":
      return "Automazioni";
  }
}
