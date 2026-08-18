'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Pill } from '@/components/ui-kit'
import { cn } from '@/lib/utils'

export function TerrainGallery({
  images,
  name,
  type,
}: {
  images: string[]
  name: string
  type: string
}) {
  const scroller = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const slides = images.length ? images : ['/placeholder.svg']

  const go = (next: number) => {
    const el = scroller.current
    if (!el) return
    const i = ((next % slides.length) + slides.length) % slides.length
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' })
    setIndex(i)
  }

  return (
    <div>
      <div className="relative h-64 overflow-hidden bg-secondary">
        <div
          ref={scroller}
          onScroll={(e) => {
            const el = e.currentTarget
            const i = Math.round(el.scrollLeft / Math.max(el.clientWidth, 1))
            if (i !== index) setIndex(i)
          }}
          className="no-scrollbar flex h-full snap-x snap-mandatory overflow-x-auto touch-pan-x"
        >
          {slides.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="relative h-full shrink-0 snap-center"
              style={{ flex: '0 0 100%' }}
            >
              <Image
                src={src}
                alt={`${name} — photo ${i + 1}`}
                fill
                sizes="400px"
                className="object-cover"
                priority={i === 0}
              />
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />

        {slides.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Photo précédente"
              onClick={() => go(index - 1)}
              className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Photo suivante"
              onClick={() => go(index + 1)}
              className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/55 text-white backdrop-blur"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        <div className="absolute bottom-3 left-4 right-4 z-10">
          <Pill tone="primary">{type}</Pill>
          <h2 className="mt-1 font-display text-2xl font-bold text-balance">{name}</h2>
          {slides.length > 1 && (
            <div className="mt-2 flex items-center gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Photo ${i + 1}`}
                  onClick={() => go(i)}
                  className={cn(
                    'h-1.5 rounded-full transition-all',
                    i === index ? 'w-5 bg-primary' : 'w-1.5 bg-white/50',
                  )}
                />
              ))}
              <span className="ml-auto text-[11px] font-medium text-white/90">
                {index + 1}/{slides.length}
              </span>
            </div>
          )}
        </div>
      </div>

      {slides.length > 1 && (
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pt-3">
          {slides.map((src, i) => (
            <button
              key={`thumb-${src}-${i}`}
              type="button"
              onClick={() => go(i)}
              aria-label={`Voir la photo ${i + 1}`}
              className={cn(
                'relative h-14 w-[4.5rem] shrink-0 overflow-hidden rounded-xl border-2',
                i === index ? 'border-primary' : 'border-transparent opacity-70',
              )}
            >
              <Image src={src} alt="" fill sizes="72px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
