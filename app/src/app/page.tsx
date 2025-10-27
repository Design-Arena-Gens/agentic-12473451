'use client';

import Link from "next/link";
import { useMemo, useState } from "react";
import { PreferenceForm } from "@/components/PreferenceForm";
import { PlanSummary } from "@/components/PlanSummary";
import { StrategyCard } from "@/components/StrategyCard";
import { UserPreferences } from "@/data/strategies";
import { getMatchingStrategies } from "@/lib/recommendation";

const defaultPreferences: UserPreferences = {
  weeklyHours: 4,
  skillLevel: "beginner",
  leverage: ["skills", "time", "content"],
};

export default function Home() {
  const [preferences, setPreferences] =
    useState<UserPreferences>(defaultPreferences);

  const matchingStrategies = useMemo(
    () => getMatchingStrategies(preferences),
    [preferences]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-indigo-50 dark:from-zinc-950 dark:via-zinc-950 dark:to-indigo-950">
      <Hero />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 pb-24">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <PlanSummary preferences={preferences} strategies={matchingStrategies} />
          <PreferenceForm onChange={setPreferences} />
        </div>

        <section className="space-y-4">
          <header className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">
              Implementazione guidata
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-300">
              Ogni strategia parte da zero, sfrutta piattaforme gratuite e crea asset digitali che continuano a generare entrate.
            </p>
          </header>
          <div className="grid gap-6 md:grid-cols-2">
            {matchingStrategies.map((strategy, index) => (
              <StrategyCard
                key={strategy.id}
                strategy={strategy}
                highlight={index === 0}
              />
            ))}
          </div>
        </section>

        <section className="space-y-6 rounded-3xl bg-white/70 p-8 shadow-inner shadow-zinc-200/70 dark:bg-zinc-900/80 dark:shadow-black/30">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Come trasformare il piano in routine
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {routineBlocks.map((block) => (
              <div
                key={block.title}
                className="flex flex-col gap-2 rounded-2xl border border-zinc-200 bg-white/70 p-4 text-sm text-zinc-600 shadow-sm dark:border-zinc-700 dark:bg-zinc-950/40 dark:text-zinc-300"
              >
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-500">
                  {block.tag}
                </span>
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                  {block.title}
                </h3>
                <p>{block.description}</p>
                <ul className="space-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {block.tips.map((tip) => (
                    <li key={tip}>• {tip}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 rounded-3xl border border-indigo-100 bg-indigo-50/60 p-8 text-indigo-900 shadow-md dark:border-indigo-400/40 dark:bg-indigo-900/30 dark:text-indigo-100">
          <header className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-[0.3em]">
              Strumenti utili gratuiti
            </span>
            <h2 className="text-2xl font-semibold">Toolkit zero budget</h2>
            <p className="text-sm text-indigo-800/80 dark:text-indigo-100/80">
              Piattaforme che puoi adottare subito per validare idee, automatizzare follow-up e monitorare metriche.
            </p>
          </header>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {toolkit.map((tool) => (
              <div
                key={tool.name}
                className="flex flex-col gap-2 rounded-2xl border border-indigo-200/60 bg-white/80 p-4 text-sm text-indigo-900 shadow-sm dark:border-indigo-500/20 dark:bg-indigo-950/40 dark:text-indigo-100"
              >
                <div>
                  <h3 className="text-lg font-semibold">{tool.name}</h3>
                  <p className="text-xs uppercase tracking-wider text-indigo-500">
                    {tool.category}
                  </p>
                </div>
                <p className="text-sm">{tool.description}</p>
                <ul className="space-y-1 text-xs text-indigo-700/80 dark:text-indigo-200/80">
                  {tool.uses.map((use) => (
                    <li key={use}>• {use}</li>
                  ))}
                </ul>
                <Link
                  href={tool.url}
                  className="mt-auto text-sm font-semibold text-indigo-600 underline underline-offset-2 hover:text-indigo-800 dark:text-indigo-200 dark:hover:text-white"
                >
                  Visita
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 rounded-3xl border border-zinc-200 bg-white/70 p-8 text-sm text-zinc-600 shadow-sm dark:border-zinc-700 dark:bg-zinc-950/60 dark:text-zinc-300">
          <header className="space-y-2">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              Roadmap di 90 giorni senza investimento
            </h2>
            <p>
              Suddividi il tuo percorso in sprint settimanali. I checkpoint garantiscono progressi costanti
              anche con orari ridotti.
            </p>
          </header>
          <div className="grid gap-4 md:grid-cols-3">
            {roadmap.map((phase) => (
              <div
                key={phase.title}
                className="flex flex-col gap-3 rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-900/60"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    {phase.tag}
                  </p>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
                    {phase.title}
                  </h3>
                </div>
                <ul className="space-y-1 text-xs text-zinc-500 dark:text-zinc-400">
                  {phase.steps.map((step) => (
                    <li key={step}>• {step}</li>
                  ))}
                </ul>
                <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                  Checkpoint: {phase.checkpoint}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 rounded-3xl border border-zinc-200 bg-white/70 p-8 text-sm text-zinc-600 shadow-sm dark:border-zinc-700 dark:bg-zinc-950/60 dark:text-zinc-300">
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Domande frequenti
          </h2>
          <div className="space-y-3">
            {faq.map((item) => (
              <details
                key={item.question}
                className="group rounded-2xl border border-zinc-200 bg-white/60 p-4 transition-colors open:border-indigo-200 open:bg-indigo-50/60 dark:border-zinc-700 dark:bg-zinc-900/60 dark:open:border-indigo-500/40 dark:open:bg-indigo-900/30"
              >
                <summary className="cursor-pointer text-sm font-semibold text-zinc-900 dark:text-white">
                  {item.question}
                </summary>
                <p className="mt-2 text-xs text-zinc-600 dark:text-zinc-300">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function Hero() {
  return (
    <header className="relative isolate flex flex-col gap-6 px-4 py-24">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-200/60 via-white to-transparent blur-3xl dark:from-indigo-900/40 dark:via-zinc-950" />
      </div>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600 dark:text-indigo-300">
          Entrate reali senza capitale
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-5xl">
          Costruisci entrate passive con il tuo talento, non con il budget
        </h1>
        <p className="mx-auto max-w-2xl text-sm text-zinc-600 dark:text-zinc-300 md:text-base">
          Imposta un piano sostenibile che sfrutta strumenti gratuiti, automazioni leggere e asset digitali. Ti guidiamo a costruire il primo flusso di cassa in meno di 90 giorni.
        </p>
      </div>
    </header>
  );
}

const routineBlocks = [
  {
    tag: "Rituale settimanale",
    title: "Sessione di focus da 90 minuti",
    description:
      "Blocca il tempo per creare asset o contenuti ad alto valore e automatizza tutto il resto.",
    tips: [
      "Pianifica in anticipo l'output della sessione",
      "Usa template riutilizzabili per non ricominciare da zero",
      "Archivia risultati e metriche in uno spazio condiviso",
    ],
  },
  {
    tag: "Follow-up",
    title: "Automazioni no-code essenziali",
    description:
      "Attiva workflow gratuiti che nutrono contatti e ampliano l'impatto dei tuoi asset.",
    tips: [
      "Integra moduli con Zapier o Make sfruttando i piani free",
      "Invia sequenze email di 3 messaggi tramite piattaforme freemium",
      "Tagga i contatti per sapere cosa ha portato i risultati migliori",
    ],
  },
  {
    tag: "Ottimizzazione",
    title: "Retrospettiva mensile",
    description:
      "Analizza cosa ha prodotto entrate e sposta il tempo su ciò che scala meglio.",
    tips: [
      "Classifica le attività con la matrice impatto vs. tempo",
      "Rimuovi azioni senza leva o impatto",
      "Sperimenta nuove call-to-action ogni mese",
    ],
  },
];

const toolkit = [
  {
    name: "Substack",
    category: "Newsletter",
    description:
      "Pubblica newsletter gratuitamente, con possibilità di attivare abbonamenti e sponsorizzazioni.",
    uses: [
      "Gestire iscrizioni senza costi",
      "Inviare sequenze automatiche",
      "Monetizzare con referral o abbonamenti",
    ],
    url: "https://substack.com",
  },
  {
    name: "Gumroad",
    category: "Marketplace digitali",
    description:
      "Vendi template, guide o automazioni pagando solo una fee su ciascuna vendita.",
    uses: [
      "Ospitare prodotti digitali",
      "Raccogliere email dei clienti",
      "Upsell con bundle e pacchetti",
    ],
    url: "https://gumroad.com",
  },
  {
    name: "Canva",
    category: "Creazione asset",
    description:
      "Crea grafiche, slide e PDF professionali con funzionalità gratuite e template pronti.",
    uses: [
      "Progettare lead magnet",
      "Costruire template rivendibili",
      "Produrre contenuti per social",
    ],
    url: "https://www.canva.com",
  },
  {
    name: "Notion",
    category: "Gestione conoscenza",
    description:
      "Organizza processi, modelli e risorse condivisibili con community o clienti.",
    uses: [
      "Creare hub di risorse",
      "Gestire roadmap e retrospettive",
      "Documentare i playbook",
    ],
    url: "https://www.notion.so",
  },
  {
    name: "Make",
    category: "Automazioni",
    description:
      "Automatizza flussi tra app con un piano gratuito generoso, perfetto per follow-up e notifiche.",
    uses: [
      "Inviare reminder automatizzati",
      "Aggiornare dashboard sui risultati",
      "Centralizzare lead da form gratuiti",
    ],
    url: "https://www.make.com",
  },
  {
    name: "Metricool",
    category: "Analisi",
    description:
      "Programma contenuti e misura performance dei canali con un piano free sufficiente per iniziare.",
    uses: [
      "Pianificare post cross-platform",
      "Analizzare engagement settimanale",
      "Identificare i contenuti con più conversioni",
    ],
    url: "https://metricool.com",
  },
];

const roadmap = [
  {
    tag: "Mese 1",
    title: "Validazione veloce",
    steps: [
      "Definisci persona e problema urgente",
      "Lancia un MVP con strumenti free",
      "Raccogli feedback da 10 utenti reali",
    ],
    checkpoint: "Primi segnali di interesse e lista contatti attiva.",
  },
  {
    tag: "Mese 2",
    title: "Costruzione asset",
    steps: [
      "Produci contenuti riutilizzabili e scalabili",
      "Imposta automazioni per follow-up",
      "Testa diverse call-to-action",
    ],
    checkpoint: "Asset pubblicati e prime entrate generate.",
  },
  {
    tag: "Mese 3",
    title: "Scalabilità",
    steps: [
      "Ottimizza canali che portano conversioni",
      "Aggiungi partnership o programmi referral",
      "Crea una routine di miglioramento continuo",
    ],
    checkpoint: "Entrate ricorrenti e flussi automatizzati.",
  },
];

const faq = [
  {
    question: "È davvero possibile iniziare senza investire denaro?",
    answer:
      "Sì. Le strategie proposte sfruttano piattaforme con piani gratuiti e si basano su asset digitali che puoi produrre con strumenti no-cost. Il capitale è sostituito da tempo, creatività e capacità di costruire relazioni.",
  },
  {
    question: "Quanto tempo serve per vedere i primi risultati?",
    answer:
      "Molti creator ottengono le prime vendite in 30-45 giorni se rispettano le attività settimanali. Il fattore chiave è la consistenza: pochi asset ad alto valore che rimangono online e lavorano per te.",
  },
  {
    question: "Serve un sito web personale?",
    answer:
      "Non è obbligatorio. Puoi ospitare newsletter, prodotti digitali e automazioni su piattaforme di terze parti. Quando il flusso diventa stabile puoi investire in un tuo dominio.",
  },
  {
    question: "Come evitare di diventare un lavoro a tempo pieno?",
    answer:
      "Imposta limiti di tempo settimanali, segmenta ciò che puoi automatizzare e costruisci asset riutilizzabili. Il sistema privilegia attività che crescono anche mentre non sei operativo.",
  },
];
