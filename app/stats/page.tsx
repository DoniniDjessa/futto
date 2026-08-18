'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, TrendingUp } from 'lucide-react'
import { currentUser, goalsByMonth } from '@/lib/mock-data'
import { ScreenHeader, StarRating } from '@/components/ui-kit'
import { cn } from '@/lib/utils'

const periods = ['Ce mois-ci', 'Cette saison', 'Tout'] as const

export default function StatsPage() {
  const [period, setPeriod] = useState<(typeof periods)[number]>('Ce mois-ci')
  const max = Math.max(...goalsByMonth.map((g) => g.goals))
  const winRate = Math.round((currentUser.wins / currentUser.matches) * 100)

  return (
    <div className="pb-6">
      <ScreenHeader
        title="Mes statistiques"
        right={
          <Link
            href="/profil"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary"
            aria-label="Retour"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
        }
      />

      <div className="px-5">
        {/* Period selector */}
        <div className="flex gap-2">
          {periods.map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                'flex-1 rounded-full border py-2 text-xs font-medium transition-colors',
                p === period
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground',
              )}
            >
              {p}
            </button>
          ))}
        </div>

        {/* Key numbers */}
        <div className="mt-5 grid grid-cols-3 gap-3">
          <Big value={currentUser.matches} label="Matchs" tone="foreground" />
          <Big value={currentUser.wins} label="Victoires" tone="primary" />
          <Big value={currentUser.losses} label="Défaites" tone="accent" />
        </div>

        {/* Goals chart */}
        <div className="mt-5 rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Buts marqués</p>
              <p className="font-display text-3xl font-bold">{currentUser.goals}</p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary">
              <TrendingUp className="h-3.5 w-3.5" /> +18%
            </span>
          </div>
          <div className="mt-4 flex h-32 items-end justify-between gap-2">
            {goalsByMonth.map((g) => (
              <div key={g.month} className="flex flex-1 flex-col items-center gap-1.5">
                <span className="text-[10px] font-semibold text-muted-foreground">
                  {g.goals}
                </span>
                <div
                  className="w-full rounded-t-md bg-gradient-to-t from-darkgreen to-primary"
                  style={{ height: `${(g.goals / max) * 100}%` }}
                />
                <span className="text-[10px] text-muted-foreground">{g.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Win rate + rating */}
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Taux de victoire</p>
            <p className="mt-1 font-display text-3xl font-bold text-primary">
              {winRate}%
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${winRate}%` }}
              />
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4">
            <p className="text-sm text-muted-foreground">Note moyenne</p>
            <p className="mt-1 font-display text-3xl font-bold text-gold">
              {currentUser.rating.toFixed(1)}
            </p>
            <div className="mt-2">
              <StarRating value={currentUser.rating} size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Big({
  value,
  label,
  tone,
}: {
  value: number
  label: string
  tone: 'foreground' | 'primary' | 'accent'
}) {
  const color = {
    foreground: 'text-foreground',
    primary: 'text-primary',
    accent: 'text-accent',
  }[tone]
  return (
    <div className="rounded-2xl border border-border bg-card py-4 text-center">
      <p className={cn('font-display text-3xl font-bold', color)}>{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  )
}
