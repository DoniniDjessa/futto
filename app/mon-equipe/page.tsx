'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Shield, Crown, UserPlus, Check, Share2, Trophy } from 'lucide-react'
import { ScreenHeader, Avatar, Pill, Card } from '@/components/ui-kit'
import { myTeam, players } from '@/lib/mock-data'
import { playerHref } from '@/lib/lookups'
import { cn } from '@/lib/utils'

export default function MonEquipePage() {
  const [invited, setInvited] = useState<string[]>([])
  const [showInvite, setShowInvite] = useState(false)

  const played = myTeam.wins + myTeam.draws + myTeam.losses
  const winRate = Math.round((myTeam.wins / played) * 100)
  const suggestions = players.filter(
    (p) => !myTeam.members.some((m) => m.name === p.name),
  )

  return (
    <>
      <ScreenHeader
        title="Mon équipe"
        subtitle="Gère ton effectif et tes stats"
        right={
          <button
            aria-label="Partager l'équipe"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground"
          >
            <Share2 className="h-4 w-4" />
          </button>
        }
      />

      <div className="space-y-5 px-5 pb-6">
        {/* Team header */}
        <Card className="overflow-hidden p-0">
          <div className="flex items-center gap-4 bg-gradient-to-br from-primary/25 to-transparent p-4">
            <span
              className="flex h-16 w-16 items-center justify-center rounded-2xl font-display text-2xl font-bold text-white"
              style={{ backgroundColor: myTeam.color }}
            >
              {myTeam.tag}
            </span>
            <div>
              <h2 className="font-display text-xl font-bold leading-tight text-balance">
                {myTeam.name}
              </h2>
              <p className="text-sm text-muted-foreground">{myTeam.city}</p>
              <div className="mt-1 flex gap-2">
                <Pill tone="gold">
                  <Trophy className="h-3 w-3" /> #{myTeam.rankCity} à Abidjan
                </Pill>
                <Pill>Depuis {myTeam.founded}</Pill>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 divide-x divide-border border-t border-border text-center">
            <Stat label="Joués" value={played} />
            <Stat label="Victoires" value={myTeam.wins} accent />
            <Stat label="Nuls" value={myTeam.draws} />
            <Stat label="% Vict." value={`${winRate}%`} />
          </div>
        </Card>

        {/* Roster */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-display text-lg font-bold">
              <Shield className="h-5 w-5 text-primary" /> Effectif ({myTeam.members.length})
            </h3>
            <button
              onClick={() => setShowInvite((v) => !v)}
              className="flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
            >
              <UserPlus className="h-3.5 w-3.5" /> Inviter
            </button>
          </div>

          <div className="space-y-2">
            {myTeam.members.map((m) => (
              <Link
                key={m.id}
                href={playerHref(m.name)}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3"
              >
                <span className="w-6 text-center font-display text-lg font-bold text-muted-foreground">
                  {m.number}
                </span>
                <Avatar initials={m.initials} color={m.color} size={40} />
                <div className="flex-1">
                  <p className="flex items-center gap-1.5 font-semibold leading-tight">
                    {m.name}
                    {m.role === 'Capitaine' && (
                      <Crown className="h-3.5 w-3.5 text-gold" />
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground">{m.position}</p>
                </div>
                <Pill tone={m.role === 'Remplaçant' ? 'muted' : 'primary'}>
                  {m.role}
                </Pill>
              </Link>
            ))}
          </div>
        </div>

        {/* Invite panel */}
        {showInvite && (
          <div>
            <h3 className="mb-2 font-display text-lg font-bold">
              Inviter des joueurs
            </h3>
            <div className="space-y-2">
              {suggestions.map((p) => {
                const done = invited.includes(p.id)
                return (
                  <div
                    key={p.id}
                    className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3"
                  >
                    <Avatar initials={p.initials} color={p.color} size={38} />
                    <div className="flex-1">
                      <p className="font-semibold leading-tight">{p.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {p.position} · {p.distanceKm} km
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setInvited((prev) =>
                          prev.includes(p.id)
                            ? prev.filter((x) => x !== p.id)
                            : [...prev, p.id],
                        )
                      }
                      className={cn(
                        'rounded-full px-4 py-1.5 text-xs font-semibold transition-colors',
                        done
                          ? 'bg-secondary text-primary'
                          : 'bg-accent text-accent-foreground',
                      )}
                    >
                      {done ? (
                        <span className="flex items-center gap-1">
                          <Check className="h-3.5 w-3.5" /> Invité
                        </span>
                      ) : (
                        'Inviter'
                      )}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        <Link
          href="/joueurs"
          className="block rounded-xl border border-border bg-card py-3 text-center text-sm font-semibold text-muted-foreground hover:text-primary"
        >
          Découvrir plus de joueurs
        </Link>
      </div>
    </>
  )
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string
  value: string | number
  accent?: boolean
}) {
  return (
    <div className="py-3">
      <p
        className={cn(
          'font-display text-xl font-bold',
          accent ? 'text-primary' : 'text-foreground',
        )}
      >
        {value}
      </p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  )
}
