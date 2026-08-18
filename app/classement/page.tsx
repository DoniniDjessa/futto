'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Crown, Target } from 'lucide-react'
import { rankings } from '@/lib/mock-data'
import { playerHref } from '@/lib/lookups'
import { ScreenHeader, Avatar, Pill } from '@/components/ui-kit'
import { cn } from '@/lib/utils'

const scopes = ['Abidjan', 'Côte d’Ivoire', 'Afrique'] as const

export default function ClassementPage() {
  const [scope, setScope] = useState<(typeof scopes)[number]>('Abidjan')
  const list = rankings[scope]
  const podium = list.slice(0, 3)
  const rest = list.slice(3)

  return (
    <div className="pb-6">
      <ScreenHeader
        title="Classement"
        subtitle="Les meilleurs joueurs"
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

      <div className="px-5">
        <div className="flex gap-2">
          {scopes.map((s) => (
            <button
              key={s}
              onClick={() => setScope(s)}
              className={cn(
                'flex-1 rounded-full border py-2 text-xs font-medium transition-colors',
                s === scope
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border bg-card text-muted-foreground',
              )}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Podium */}
        <div className="mt-6 flex items-end justify-center gap-3">
          {[podium[1], podium[0], podium[2]].map((p) => {
            const place = p.rank
            const isFirst = place === 1
            return (
              <Link
                key={p.rank}
                href={playerHref(p.name)}
                className="flex flex-1 flex-col items-center"
              >
                <div className="relative">
                  {isFirst && (
                    <Crown className="absolute -top-5 left-1/2 h-5 w-5 -translate-x-1/2 text-gold" />
                  )}
                  <Avatar
                    initials={p.initials}
                    color={p.color}
                    size={isFirst ? 64 : 52}
                    className={cn(
                      'border-2',
                      isFirst ? 'border-gold' : 'border-border',
                    )}
                  />
                </div>
                <p className="mt-2 truncate text-center text-xs font-semibold">
                  {p.name.split(' ')[0]}
                </p>
                <div
                  className={cn(
                    'mt-1 flex w-full flex-col items-center justify-end rounded-t-xl bg-gradient-to-t',
                    isFirst
                      ? 'from-gold/30 to-gold/10 h-20'
                      : 'from-secondary to-card h-14',
                  )}
                >
                  <span className="font-display text-2xl font-bold text-gold">
                    {place}
                  </span>
                </div>
                <span className="mt-1 text-[11px] text-muted-foreground">
                  {p.points} pts
                </span>
              </Link>
            )
          })}
        </div>

        {/* Rest of list */}
        <div className="mt-5 space-y-2">
          {rest.map((p) => {
            const isMe = p.name.includes('Koffi')
            return (
              <Link
                key={p.rank}
                href={playerHref(p.name)}
                className={cn(
                  'flex items-center gap-3 rounded-2xl border p-3',
                  isMe ? 'border-primary bg-primary/10' : 'border-border bg-card',
                )}
              >
                <span className="w-6 text-center font-display text-lg font-bold text-muted-foreground">
                  {p.rank}
                </span>
                <Avatar initials={p.initials} color={p.color} size={40} />
                <div className="flex-1">
                  <p className="font-semibold leading-tight">
                    {p.name} {isMe && <span className="text-primary">(toi)</span>}
                  </p>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Target className="h-3 w-3" /> {p.goals} buts
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-display font-bold">{p.points}</p>
                  <Pill tone="gold">{p.level}</Pill>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
