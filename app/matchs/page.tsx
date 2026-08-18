'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Clock, Users, Check } from 'lucide-react'
import { matches, formatFCFA, type Match } from '@/lib/mock-data'
import { ScreenHeader, Pill } from '@/components/ui-kit'
import { cn } from '@/lib/utils'

const filters = ['Tous', 'Amical', 'Public', 'Privé'] as const

const typeTone: Record<Match['type'], 'primary' | 'accent' | 'gold' | 'muted'> = {
  Amical: 'primary',
  Public: 'accent',
  Privé: 'muted',
  Tournoi: 'gold',
}

export default function MatchsPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('Tous')
  const [joined, setJoined] = useState<string[]>([])

  const list = matches.filter((m) => filter === 'Tous' || m.type === filter)

  return (
    <div className="pb-6">
      <ScreenHeader
        title="Rejoindre un match"
        subtitle="Aucun ami dispo ? Rejoins une partie ouverte"
        right={
          <Link
            href="/creer"
            className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            + Créer
          </Link>
        }
      />

      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-4">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              'whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
              f === filter
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground',
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3 px-5">
        {list.map((m) => {
          const isJoined = joined.includes(m.id)
          const full = m.spotsTaken >= m.spotsTotal
          const pct = Math.round((m.spotsTaken / m.spotsTotal) * 100)
          return (
            <div key={m.id} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-start justify-between">
                <Link href={`/matchs/${m.id}`} className="min-w-0">
                  <p className="font-display text-lg font-semibold leading-tight hover:text-primary">
                    {m.title}
                  </p>
                  <p className="text-xs text-muted-foreground">Organisé par {m.host}</p>
                </Link>
                <Pill tone={typeTone[m.type]}>{m.type}</Pill>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-primary" /> {m.terrain}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-primary" /> {m.date} · {m.time}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-3.5 w-3.5 text-primary" /> {m.format}
                </span>
                <span className="font-semibold text-accent">
                  {formatFCFA(m.price)} / joueur
                </span>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">
                    {m.spotsTaken + (isJoined ? 1 : 0)}/{m.spotsTotal} joueurs
                  </span>
                  {full && !isJoined && (
                    <span className="text-destructive">Complet</span>
                  )}
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${Math.min(100, pct + (isJoined ? 10 : 0))}%` }}
                  />
                </div>
              </div>

              <button
                type="button"
                disabled={full && !isJoined}
                onClick={() =>
                  setJoined((prev) =>
                    prev.includes(m.id)
                      ? prev.filter((x) => x !== m.id)
                      : [...prev, m.id],
                  )
                }
                className={cn(
                  'mt-3 w-full rounded-full py-2.5 text-sm font-semibold transition-colors',
                  isJoined
                    ? 'bg-secondary text-primary'
                    : full
                      ? 'cursor-not-allowed bg-secondary text-muted-foreground'
                      : 'bg-primary text-primary-foreground',
                )}
              >
                {isJoined ? (
                  <span className="flex items-center justify-center gap-1.5">
                    <Check className="h-4 w-4" /> Tu as rejoint
                  </span>
                ) : full ? (
                  'Complet'
                ) : (
                  'Rejoindre le match'
                )}
              </button>

              <Link
                href={`/matchs/${m.id}`}
                className="mt-2 block text-center text-xs font-medium text-muted-foreground hover:text-primary"
              >
                Voir la compo & les détails
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
