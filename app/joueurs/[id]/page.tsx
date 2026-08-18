'use client'

import Link from 'next/link'
import { use } from 'react'
import { notFound, useRouter } from 'next/navigation'
import { MapPin, MessageCircle, UserPlus, Check } from 'lucide-react'
import { useState } from 'react'
import { BackHeader, Avatar, StarRating, Pill } from '@/components/ui-kit'
import { findPlayer } from '@/lib/lookups'
import { conversations } from '@/lib/mock-data'

export default function JoueurDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const player = findPlayer(id)
  const router = useRouter()
  const [invited, setInvited] = useState(false)
  const [followed, setFollowed] = useState(false)

  if (!player) notFound()

  const chat = conversations.find((c) => c.name === player.name)

  return (
    <div className="pb-8">
      <BackHeader title="Carte joueur" backHref="/joueurs" />
      <div className="flex flex-col items-center px-5 pt-6 text-center">
        <Avatar initials={player.initials} color={player.color} size={96} />
        <h2 className="mt-3 font-display text-2xl font-bold">{player.name}</h2>
        <p className="text-sm text-muted-foreground">{player.position}</p>
        <div className="mt-2 flex items-center gap-2">
          <Pill tone="gold">Niveau {player.level}</Pill>
          <StarRating value={player.rating} showValue />
        </div>
        <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" /> {player.distanceKm} km
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 px-5 text-center">
        <div className="rounded-2xl border border-border bg-card py-3">
          <p className="text-[11px] uppercase text-muted-foreground">Buts</p>
          <p className="font-display text-2xl font-bold">{player.goals ?? '—'}</p>
        </div>
        <div className="rounded-2xl border border-border bg-card py-3">
          <p className="text-[11px] uppercase text-muted-foreground">Points</p>
          <p className="font-display text-2xl font-bold">{player.points ?? '—'}</p>
        </div>
      </div>

      <div className="mt-6 space-y-2 px-5">
        {player.isMe ? (
          <Link
            href="/profil"
            className="block rounded-full bg-primary py-3 text-center text-sm font-semibold text-primary-foreground"
          >
            Voir mon profil
          </Link>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setInvited(true)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground"
            >
              {invited ? (
                <>
                  <Check className="h-4 w-4" /> Invité
                </>
              ) : (
                <>
                  <UserPlus className="h-4 w-4" /> Inviter au match
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => router.push(chat ? `/messages/${chat.id}` : '/messages')}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card py-3 text-sm font-semibold"
            >
              <MessageCircle className="h-4 w-4" /> Envoyer un message
            </button>
            <button
              type="button"
              onClick={() => setFollowed((v) => !v)}
              className="w-full py-2 text-sm font-semibold text-primary"
            >
              {followed ? 'Ne plus suivre' : 'Suivre'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
