'use client'

import Image from 'next/image'
import { MapPin } from 'lucide-react'
import type { Terrain } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export function MapView({
  terrains,
  activeId,
  onSelect,
  height = 200,
}: {
  terrains: Terrain[]
  activeId?: string
  onSelect?: (id: string) => void
  height?: number
}) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border"
      style={{ height }}
    >
      <Image
        src="/map-abidjan.png"
        alt="Carte des terrains à Abidjan"
        fill
        className="object-cover opacity-80"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />

      {terrains.map((t) => {
        const active = t.id === activeId
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => onSelect?.(t.id)}
            style={{ top: t.pin.top, left: t.pin.left }}
            className="absolute -translate-x-1/2 -translate-y-full"
            aria-label={t.name}
          >
            <span
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full border-2 border-background shadow-lg transition-transform',
                active
                  ? 'scale-125 bg-accent text-accent-foreground'
                  : 'bg-primary text-primary-foreground',
              )}
            >
              <MapPin className="h-4 w-4" />
            </span>
          </button>
        )
      })}

      <div className="absolute bottom-3 left-3 rounded-full bg-background/80 px-3 py-1 text-xs font-medium backdrop-blur">
        {terrains.length} terrains à proximité
      </div>
    </div>
  )
}
