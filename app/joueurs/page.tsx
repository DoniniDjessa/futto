'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Search, MapPin, UserPlus, Check } from 'lucide-react'
import { players } from '@/lib/mock-data'
import { ScreenHeader, Avatar, StarRating, Pill } from '@/components/ui-kit'
import { cn } from '@/lib/utils'

export default function JoueursPage() {
  const [query, setQuery] = useState('')
  const [invited, setInvited] = useState<string[]>([])

  const filtered = players.filter(
    (p) =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.position.toLowerCase().includes(query.toLowerCase()),
  )

  const toggle = (id: string) =>
    setInvited((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    )

  return (
    <div className="pb-6">
      <ScreenHeader
        title="Trouve des joueurs"
        subtitle="Près de chez toi, prêts à jouer"
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
        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un joueur ou un poste..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        <div className="mt-5 space-y-3">
          {filtered.map((p) => {
            const isInvited = invited.includes(p.id)
            return (
              <div
                key={p.id}
                className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3"
              >
                <Link href={`/joueurs/${p.id}`} className="flex min-w-0 flex-1 items-center gap-3">
                <Avatar initials={p.initials} color={p.color} size={48} />
                <div className="flex-1">
                  <p className="font-semibold leading-tight">{p.name}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{p.position}</span>
                    <Pill tone="gold">Niveau {p.level}</Pill>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <StarRating value={p.rating} size={12} />
                    <span className="flex items-center gap-0.5 text-[11px] text-muted-foreground">
                      <MapPin className="h-3 w-3" /> {p.distanceKm} km
                    </span>
                  </div>
                </div>
                </Link>
                <button
                  type="button"
                  onClick={() => toggle(p.id)}
                  className={cn(
                    'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                    isInvited
                      ? 'bg-secondary text-primary'
                      : 'bg-primary text-primary-foreground',
                  )}
                >
                  {isInvited ? (
                    <>
                      <Check className="h-4 w-4" /> Invité
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4" /> Inviter
                    </>
                  )}
                </button>
              </div>
            )
          })}
          {filtered.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Aucun joueur trouvé.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
