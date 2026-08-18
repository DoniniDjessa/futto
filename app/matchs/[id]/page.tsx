'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, CalendarDays, Clock, Users, Check, Share2 } from 'lucide-react'
import { BackHeader, Avatar, Pill, Card } from '@/components/ui-kit'
import { matches, players, formatFCFA } from '@/lib/mock-data'
import { playerHref } from '@/lib/lookups'
import { cn } from '@/lib/utils'

const toneByType = {
  Amical: 'primary',
  Public: 'accent',
  Privé: 'muted',
  Tournoi: 'gold',
} as const

export default function MatchDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const match = matches.find((m) => m.id === id)
  const [joined, setJoined] = useState(false)

  if (!match) notFound()

  const spotsTaken = match.spotsTaken + (joined ? 1 : 0)
  const full = spotsTaken >= match.spotsTotal
  const roster = players.slice(0, Math.min(match.spotsTaken, players.length))
  const perTeam = Math.ceil(match.spotsTotal / 2)
  const teamA = roster.slice(0, perTeam)
  const teamB = roster.slice(perTeam)

  return (
    <>
      <BackHeader
        title="Détail du match"
        backHref="/matchs"
        right={
          <button
            aria-label="Partager"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground"
          >
            <Share2 className="h-4 w-4" />
          </button>
        }
      />

      <div className="space-y-5 px-5 py-4">
        <div>
          <Pill tone={toneByType[match.type]}>{match.type}</Pill>
          <h2 className="mt-2 font-display text-2xl font-bold text-balance">
            {match.title}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Organisé par {match.host}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Card className="p-3">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <CalendarDays className="h-3.5 w-3.5 text-primary" /> Date
            </span>
            <p className="mt-1 font-semibold">{match.date}</p>
          </Card>
          <Card className="p-3">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3.5 w-3.5 text-primary" /> Heure
            </span>
            <p className="mt-1 font-semibold">{match.time}</p>
          </Card>
          <Card className="p-3">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 text-primary" /> Terrain
            </span>
            <p className="mt-1 font-semibold">{match.terrain}</p>
            <p className="text-xs text-muted-foreground">{match.zone}</p>
          </Card>
          <Card className="p-3">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="h-3.5 w-3.5 text-primary" /> Format
            </span>
            <p className="mt-1 font-semibold">{match.format}</p>
          </Card>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-display text-lg font-bold">Joueurs inscrits</h3>
            <span className="text-sm font-semibold text-muted-foreground">
              {spotsTaken}/{match.spotsTotal}
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${(spotsTaken / match.spotsTotal) * 100}%` }}
            />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { label: 'Équipe A', list: teamA, color: '#00b14f' },
              { label: 'Équipe B', list: teamB, color: '#ff7a00' },
            ].map((team) => (
              <div key={team.label}>
                <p
                  className="mb-2 text-xs font-bold uppercase tracking-wider"
                  style={{ color: team.color }}
                >
                  {team.label}
                </p>
                <div className="space-y-2">
                  {team.list.map((p) => (
                    <Link key={p.id} href={playerHref(p.name)} className="flex items-center gap-2">
                      <Avatar initials={p.initials} color={p.color} size={30} />
                      <div className="min-w-0">
                        <p className="truncate text-xs font-semibold">{p.name}</p>
                        <p className="text-[10px] text-muted-foreground">
                          {p.position}
                        </p>
                      </div>
                    </Link>
                  ))}
                  {joined && team.label === 'Équipe A' && (
                    <div className="flex items-center gap-2">
                      <Avatar initials="KN" size={30} />
                      <p className="text-xs font-semibold text-primary">Toi</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky bottom-20 border-t border-border bg-background/95 px-5 py-3 backdrop-blur">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-xs text-muted-foreground">Participation</p>
            <p className="font-display text-xl font-bold text-primary">
              {formatFCFA(match.price)}
            </p>
          </div>
          <button
            disabled={full && !joined}
            onClick={() => setJoined((v) => !v)}
            className={cn(
              'flex flex-1 items-center justify-center gap-2 rounded-xl py-3 font-display text-base font-bold transition-transform active:scale-95',
              joined
                ? 'bg-primary/15 text-primary'
                : full
                  ? 'cursor-not-allowed bg-secondary text-muted-foreground'
                  : 'bg-primary text-primary-foreground',
            )}
          >
            {joined ? (
              <>
                <Check className="h-5 w-5" /> Inscrit — quitter
              </>
            ) : full ? (
              'Complet'
            ) : (
              'Rejoindre le match'
            )}
          </button>
        </div>
        <Link
          href="/matchs"
          className="mt-2 block text-center text-xs text-muted-foreground"
        >
          Voir tous les matchs
        </Link>
      </div>
    </>
  )
}
