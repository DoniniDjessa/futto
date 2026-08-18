'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Check, Users, Lock, Globe, Trophy } from 'lucide-react'
import { terrains, formatFCFA } from '@/lib/mock-data'
import { ScreenHeader } from '@/components/ui-kit'
import { cn } from '@/lib/utils'

const matchTypes = [
  { id: 'amical', label: 'Amical', icon: Users, desc: 'Entre potes, sans enjeu' },
  { id: 'public', label: 'Public', icon: Globe, desc: 'Ouvert à tous les joueurs' },
  { id: 'prive', label: 'Privé', icon: Lock, desc: 'Sur invitation uniquement' },
  { id: 'tournoi', label: 'Tournoi', icon: Trophy, desc: 'Compétition à plusieurs équipes' },
]

const formats = ['5 contre 5', '7 contre 7', '11 contre 11']
const dates = ['Sam 25', 'Dim 26', 'Lun 27', 'Mar 28']
const times = ['16:00', '18:00', '19:00', '20:00']

export default function CreerPage() {
  const [type, setType] = useState('amical')
  const [terrainId, setTerrainId] = useState(terrains[0].id)
  const [format, setFormat] = useState(formats[0])
  const [date, setDate] = useState(dates[0])
  const [time, setTime] = useState(times[0])
  const [price, setPrice] = useState(1500)
  const [done, setDone] = useState(false)

  if (done) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-8 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-10 w-10" />
        </span>
        <h1 className="mt-6 font-display text-2xl font-bold">Match publié !</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ton match {matchTypes.find((m) => m.id === type)?.label.toLowerCase()} est
          visible. Les joueurs peuvent maintenant le rejoindre.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setDone(false)}
            className="rounded-full border border-border px-5 py-2 text-sm font-semibold"
          >
            Créer un autre
          </button>
          <Link
            href="/matchs"
            className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
          >
            Voir les matchs
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-6">
      <ScreenHeader
        title="Créer un match"
        subtitle="Organise ta partie en quelques clics"
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
        {/* Type */}
        <div className="grid grid-cols-2 gap-3">
          {matchTypes.map(({ id, label, icon: Icon, desc }) => {
            const active = id === type
            return (
              <button
                key={id}
                type="button"
                onClick={() => setType(id)}
                className={cn(
                  'flex flex-col items-start gap-1 rounded-2xl border p-3 text-left transition-colors',
                  active ? 'border-primary bg-primary/10' : 'border-border bg-card',
                )}
              >
                <Icon className={cn('h-5 w-5', active ? 'text-primary' : 'text-muted-foreground')} />
                <span className="font-display font-semibold">{label}</span>
                <span className="text-[11px] leading-tight text-muted-foreground">
                  {desc}
                </span>
              </button>
            )
          })}
        </div>

        {/* Terrain select */}
        <Field label="Terrain">
          <select
            value={terrainId}
            onChange={(e) => setTerrainId(e.target.value)}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary"
          >
            {terrains.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} — {t.zone}
              </option>
            ))}
          </select>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Date">
            <select
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary"
            >
              {dates.map((d) => (
                <option key={d}>{d}</option>
              ))}
            </select>
          </Field>
          <Field label="Heure">
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm outline-none focus:border-primary"
            >
              {times.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
        </div>

        <Field label="Format">
          <div className="grid grid-cols-3 gap-2">
            {formats.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFormat(f)}
                className={cn(
                  'rounded-xl border px-2 py-2.5 text-sm font-medium transition-colors',
                  f === format
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border bg-card',
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </Field>

        <Field label={`Prix par joueur — ${formatFCFA(price)}`}>
          <input
            type="range"
            min={0}
            max={5000}
            step={500}
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full accent-[#00b14f]"
          />
        </Field>

        <button
          onClick={() => setDone(true)}
          className="w-full rounded-full bg-primary py-3.5 font-display text-base font-semibold text-primary-foreground"
        >
          Publier le match
        </button>
      </div>
    </div>
  )
}

function Field({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold">{label}</p>
      {children}
    </div>
  )
}
