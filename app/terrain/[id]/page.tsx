'use client'

import { use, useState } from 'react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Clock, Check, Star, Wifi, Car, ShowerHead, Shirt } from 'lucide-react'
import { BackHeader, StarRating, Card } from '@/components/ui-kit'
import { TerrainGallery } from '@/components/terrain-gallery'
import { terrains, formatFCFA } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const slots = ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00']
const durations = ['1h', '1h30', '2h']
const amenities = [
  { icon: Car, label: 'Parking' },
  { icon: ShowerHead, label: 'Douches' },
  { icon: Shirt, label: 'Vestiaires' },
  { icon: Wifi, label: 'Wi-Fi' },
]
const reviews = [
  { name: 'Moussa T.', rating: 5, text: 'Superbe pelouse, bien éclairé le soir. Je recommande !' },
  { name: 'Baba Y.', rating: 4, text: 'Bon terrain mais un peu excentré. Ambiance top.' },
]

export default function TerrainDetail({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const terrain = terrains.find((t) => t.id === id)
  const [slot, setSlot] = useState('18:00')
  const [duration, setDuration] = useState('1h')
  const [booked, setBooked] = useState(false)

  if (!terrain) notFound()

  const durationMult = duration === '2h' ? 2 : duration === '1h30' ? 1.5 : 1
  const total = Math.round(terrain.price * durationMult)
  const photos = [
    terrain.image,
    ...['/terrain-1.png', '/terrain-2.png', '/terrain-3.png'].filter(
      (src) => src !== terrain.image,
    ),
  ]

  return (
    <>
      <BackHeader title="Détail du terrain" backHref="/reserver" />

      <TerrainGallery images={photos} name={terrain.name} type={terrain.type} />

      <div className="space-y-5 px-5 py-4">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-primary" /> {terrain.zone} · {terrain.distanceKm} km
          </span>
          <StarRating value={terrain.rating} showValue />
        </div>

        <div className="grid grid-cols-4 gap-2">
          {amenities.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 rounded-xl border border-border bg-card py-3 text-center"
            >
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-[11px] text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>

        <div>
          <h3 className="mb-2 font-display text-lg font-bold">Choisir un créneau</h3>
          <div className="grid grid-cols-3 gap-2">
            {slots.map((s) => (
              <button
                key={s}
                onClick={() => setSlot(s)}
                className={cn(
                  'flex items-center justify-center gap-1 rounded-xl border py-2.5 text-sm font-semibold transition-colors',
                  slot === s
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-muted-foreground hover:border-primary/50',
                )}
              >
                <Clock className="h-3.5 w-3.5" /> {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 font-display text-lg font-bold">Durée</h3>
          <div className="flex gap-2">
            {durations.map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={cn(
                  'flex-1 rounded-xl border py-2.5 text-sm font-semibold transition-colors',
                  duration === d
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card text-muted-foreground hover:border-primary/50',
                )}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-2 font-display text-lg font-bold">Avis des joueurs</h3>
          <div className="space-y-2">
            {reviews.map((r) => (
              <Card key={r.name} className="p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold">{r.name}</span>
                  <span className="flex items-center gap-1 text-xs text-gold">
                    <Star className="h-3.5 w-3.5 fill-gold" /> {r.rating}.0
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{r.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <div className="sticky bottom-20 border-t border-border bg-background/95 px-5 py-3 backdrop-blur">
        {booked ? (
          <div className="flex items-center justify-center gap-2 rounded-xl bg-primary/15 py-3 text-sm font-semibold text-primary">
            <Check className="h-5 w-5" /> Réservé pour {slot} — {formatFCFA(total)}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div>
              <p className="text-xs text-muted-foreground">Total ({duration})</p>
              <p className="font-display text-xl font-bold text-primary">
                {formatFCFA(total)}
              </p>
            </div>
            <button
              onClick={() => setBooked(true)}
              className="flex-1 rounded-xl bg-primary py-3 text-center font-display text-base font-bold text-primary-foreground transition-transform active:scale-95"
            >
              Réserver à {slot}
            </button>
          </div>
        )}
        <Link
          href="/reserver"
          className="mt-2 block text-center text-xs text-muted-foreground"
        >
          Retour aux terrains
        </Link>
      </div>
    </>
  )
}
