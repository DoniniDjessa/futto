'use client'

import { use, useState } from 'react'
import { notFound } from 'next/navigation'
import { Calendar, MapPin, Users, Check, Trophy } from 'lucide-react'
import { BackHeader, Pill } from '@/components/ui-kit'
import { tournaments, formatFCFA, type Tournament } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const statusTone: Record<Tournament['status'], 'primary' | 'accent' | 'muted'> = {
  'Inscriptions ouvertes': 'primary',
  'En cours': 'accent',
  Complet: 'muted',
}

export default function TournoiDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const t = tournaments.find((x) => x.id === id)
  const [registered, setRegistered] = useState(false)

  if (!t) notFound()

  const full = t.status === 'Complet'
  const calendar = [
    { when: `${t.date} · 10:00`, vs: 'Sicogi United', place: t.location },
    { when: `${t.date} · 16:00`, vs: 'Yop Lions', place: t.location },
  ]
  const results =
    t.status === 'Inscriptions ouvertes'
      ? [{ score: '—', vs: 'Pas encore joué' }]
      : [{ score: '3–1', vs: 'Marcory FC' }]

  return (
    <div className="pb-8">
      <BackHeader title="Tournoi" backHref="/tournois" />
      <div className="px-5 pt-2">
        <Pill tone={statusTone[t.status]}>{t.status}</Pill>
        <h2 className="mt-2 font-display text-3xl font-bold">{t.name}</h2>
        <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" /> {t.date}
          <MapPin className="h-4 w-4" /> {t.location}
        </p>
        <p className="mt-2 font-display text-lg font-semibold text-gold">{t.prize}</p>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <Users className="h-4 w-4" /> {t.teams}/{t.teamsMax} équipes · {formatFCFA(t.fee)}
        </p>

        <button
          type="button"
          disabled={full && !registered}
          onClick={() => setRegistered(true)}
          className={cn(
            'mt-4 w-full rounded-full py-3 text-sm font-semibold',
            registered
              ? 'bg-secondary text-primary'
              : full
                ? 'cursor-not-allowed bg-secondary text-muted-foreground'
                : 'bg-primary text-primary-foreground',
          )}
        >
          {registered ? (
            <span className="flex items-center justify-center gap-1.5">
              <Check className="h-4 w-4" /> Équipe inscrite
            </span>
          ) : full ? (
            'Complet'
          ) : (
            "S'inscrire et payer"
          )}
        </button>

        <h3 className="mt-6 font-display text-lg font-bold">Calendrier</h3>
        <ul className="mt-2 space-y-2">
          {calendar.map((g) => (
            <li key={g.when + g.vs} className="rounded-2xl border border-border bg-card p-3">
              <p className="font-semibold">{g.when}</p>
              <p className="text-xs text-muted-foreground">
                vs {g.vs} · {g.place}
              </p>
            </li>
          ))}
        </ul>

        <h3 className="mt-6 flex items-center gap-2 font-display text-lg font-bold">
          <Trophy className="h-5 w-5 text-gold" /> Résultats
        </h3>
        <ul className="mt-2 space-y-2">
          {results.map((r) => (
            <li key={r.vs} className="rounded-2xl border border-border bg-card p-3">
              <p className="font-semibold">{r.score}</p>
              <p className="text-xs text-muted-foreground">vs {r.vs}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
