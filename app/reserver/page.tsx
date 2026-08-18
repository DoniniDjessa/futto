'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Check, Clock, CalendarDays } from 'lucide-react'
import { terrains, formatFCFA } from '@/lib/mock-data'
import { MapView } from '@/components/map-view'
import { ScreenHeader, StarRating, Pill } from '@/components/ui-kit'
import { cn } from '@/lib/utils'

const dates = ['Sam 25', 'Dim 26', 'Lun 27', 'Mar 28', 'Mer 29']
const times = ['16:00', '17:00', '18:00', '19:00', '20:00', '21:00']
const durations = [
  { label: '1 h', value: 1 },
  { label: '1 h 30', value: 1.5 },
  { label: '2 h', value: 2 },
]

export default function ReserverPage() {
  const [terrainId, setTerrainId] = useState(terrains[0].id)
  const [date, setDate] = useState(dates[0])
  const [time, setTime] = useState(times[0])
  const [duration, setDuration] = useState(durations[0].value)
  const [done, setDone] = useState(false)

  const terrain = useMemo(
    () => terrains.find((t) => t.id === terrainId)!,
    [terrainId],
  )
  const total = terrain.price * duration

  if (done) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-8 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-10 w-10" />
        </span>
        <h1 className="mt-6 font-display text-2xl font-bold">Réservation confirmée !</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {terrain.name} · {date} à {time} ({durations.find((d) => d.value === duration)?.label})
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Paiement de {formatFCFA(total)} effectué (démo).
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setDone(false)}
            className="rounded-full border border-border px-5 py-2 text-sm font-semibold"
          >
            Nouvelle réservation
          </button>
          <Link
            href="/"
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
          >
            Accueil
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-6">
      <ScreenHeader
        title="Réserver un terrain"
        subtitle="Choisis, paie, joue"
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

      <div className="space-y-5 px-5">
        <MapView terrains={terrains} activeId={terrainId} onSelect={setTerrainId} />

        {/* Terrain list */}
        <div className="space-y-3">
          {terrains.map((t) => {
            const active = t.id === terrainId
            return (
              <div
                key={t.id}
                className={cn(
                  'rounded-2xl border bg-card p-3 transition-colors',
                  active ? 'border-primary' : 'border-border',
                )}
              >
                <button
                  type="button"
                  onClick={() => setTerrainId(t.id)}
                  className="flex w-full gap-3 text-left"
                >
                  <Image
                    src={t.image || '/placeholder.svg'}
                    alt={t.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold leading-tight">{t.name}</p>
                      {active && <Check className="h-4 w-4 text-primary" />}
                    </div>
                    <p className="text-xs text-muted-foreground">{t.type}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <StarRating value={t.rating} size={12} />
                      <span className="text-sm font-semibold text-accent">
                        {formatFCFA(t.price)}/h
                      </span>
                    </div>
                  </div>
                </button>
                <Link
                  href={`/terrain/${t.id}`}
                  className="mt-2 block border-t border-border pt-2 text-center text-xs font-medium text-muted-foreground hover:text-primary"
                >
                  Voir la fiche du terrain
                </Link>
              </div>
            )
          })}
        </div>

        {/* Date */}
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
            <CalendarDays className="h-4 w-4 text-primary" /> Date
          </p>
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {dates.map((d) => (
              <Chip key={d} active={d === date} onClick={() => setDate(d)}>
                {d}
              </Chip>
            ))}
          </div>
        </div>

        {/* Time */}
        <div>
          <p className="mb-2 flex items-center gap-1.5 text-sm font-semibold">
            <Clock className="h-4 w-4 text-primary" /> Heure
          </p>
          <div className="grid grid-cols-3 gap-2">
            {times.map((t) => (
              <Chip key={t} active={t === time} onClick={() => setTime(t)} full>
                {t}
              </Chip>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <p className="mb-2 text-sm font-semibold">Durée</p>
          <div className="grid grid-cols-3 gap-2">
            {durations.map((d) => (
              <Chip
                key={d.value}
                active={d.value === duration}
                onClick={() => setDuration(d.value)}
                full
              >
                {d.label}
              </Chip>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{terrain.name}</span>
            <Pill tone="primary">{date} · {time}</Pill>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <span className="text-sm text-muted-foreground">Total à payer</span>
            <span className="font-display text-2xl font-bold text-accent">
              {formatFCFA(total)}
            </span>
          </div>
        </div>

        <button
          onClick={() => setDone(true)}
          className="w-full rounded-full bg-primary py-3.5 font-display text-base font-semibold text-primary-foreground"
        >
          Payer et réserver
        </button>
      </div>
    </div>
  )
}

function Chip({
  children,
  active,
  onClick,
  full,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
  full?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors',
        full ? 'w-full' : '',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-card text-foreground',
      )}
    >
      {children}
    </button>
  )
}
