'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Trophy, Calendar, MapPin, Users, Check } from 'lucide-react'
import { tournaments, formatFCFA, type Tournament } from '@/lib/mock-data'
import { ScreenHeader, Pill } from '@/components/ui-kit'
import { cn } from '@/lib/utils'

const statusTone: Record<Tournament['status'], 'primary' | 'accent' | 'muted'> = {
  'Inscriptions ouvertes': 'primary',
  'En cours': 'accent',
  Complet: 'muted',
}

export default function TournoisPage() {
  const [registered, setRegistered] = useState<string[]>([])

  return (
    <div className="pb-6">
      <ScreenHeader
        title="Tournois"
        subtitle="Participe aux compétitions"
        right={
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary"
            aria-label="Retour"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
        }
      />

      {/* Featured */}
      <div className="px-5">
        <Link href="/tournois/tr1" className="relative block overflow-hidden rounded-3xl border border-gold/30 bg-gradient-to-br from-accent/20 via-card to-card p-5">
          <Trophy className="absolute -right-4 -top-4 h-28 w-28 text-gold/15" />
          <Pill tone="gold">
            <Trophy className="h-3 w-3" /> Événement phare
          </Pill>
          <h2 className="mt-3 font-display text-3xl font-bold">FUTTO CUP</h2>
          <p className="text-sm text-muted-foreground">
            15 Juin 2024 · Abidjan · 32 équipes
          </p>
          <p className="mt-2 font-display text-lg font-semibold text-gold">
            1 000 000 FCFA à gagner
          </p>
        </Link>
      </div>

      <div className="mt-5 space-y-3 px-5">
        {tournaments.map((t) => {
          const isReg = registered.includes(t.id)
          const full = t.status === 'Complet'
          const pct = Math.round((t.teams / t.teamsMax) * 100)
          return (
            <div key={t.id} className="rounded-2xl border border-border bg-card p-4">
              <Link href={`/tournois/${t.id}`} className="block">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-display text-lg font-semibold leading-tight">
                    {t.name}
                  </p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" /> {t.date}
                    <span className="mx-1">·</span>
                    <MapPin className="h-3 w-3" /> {t.location}
                  </p>
                </div>
                <Pill tone={statusTone[t.status]}>{t.status}</Pill>
              </div>

              <div className="mt-3 flex items-center justify-between rounded-xl bg-secondary/60 px-3 py-2 text-sm">
                <span className="text-muted-foreground">Dotation</span>
                <span className="font-semibold text-gold">{t.prize}</span>
              </div>

              <div className="mt-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" /> {t.teams}/{t.teamsMax} équipes
                  </span>
                  <span>Frais : {formatFCFA(t.fee)}</span>
                </div>
                <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
              </Link>

              <button
                type="button"
                disabled={full && !isReg}
                onClick={() =>
                  setRegistered((prev) =>
                    prev.includes(t.id)
                      ? prev.filter((x) => x !== t.id)
                      : [...prev, t.id],
                  )
                }
                className={cn(
                  'mt-3 w-full rounded-full py-2.5 text-sm font-semibold transition-colors',
                  isReg
                    ? 'bg-secondary text-primary'
                    : full
                      ? 'cursor-not-allowed bg-secondary text-muted-foreground'
                      : 'bg-primary text-primary-foreground',
                )}
              >
                {isReg ? (
                  <span className="flex items-center justify-center gap-1.5">
                    <Check className="h-4 w-4" /> Équipe inscrite
                  </span>
                ) : full ? (
                  'Complet'
                ) : (
                  "Inscrire mon équipe"
                )}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
