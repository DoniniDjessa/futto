'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ShoppingCart, Plus, Check } from 'lucide-react'
import { products, formatFCFA } from '@/lib/mock-data'
import { ScreenHeader, StarRating } from '@/components/ui-kit'
import { cn } from '@/lib/utils'

const categories = ['Tous', 'Maillots', 'Chaussures', 'Ballons'] as const

export default function MarketplacePage() {
  const [cat, setCat] = useState<(typeof categories)[number]>('Tous')
  const [cart, setCart] = useState<string[]>([])

  const list = products.filter((p) => cat === 'Tous' || p.category === cat)

  return (
    <div className="pb-6">
      <ScreenHeader
        title="Boutique"
        subtitle="Équipe-toi comme un pro"
        right={
          <div className="flex items-center gap-2">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-secondary">
              <ShoppingCart className="h-4 w-4" />
              {cart.length > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                  {cart.length}
                </span>
              )}
            </span>
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary"
              aria-label="Retour"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
        }
      />

      <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 pb-4">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCat(c)}
            className={cn(
              'whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
              c === cat
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-card text-muted-foreground',
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 px-5">
        {list.map((p) => {
          const inCart = cart.includes(p.id)
          return (
            <div
              key={p.id}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <Link href={`/marketplace/${p.id}`}>
                <div className="relative aspect-square bg-secondary/40">
                  <Image
                    src={p.image || '/placeholder.svg'}
                    alt={p.name}
                    fill
                    className="object-cover"
                  />
                  {p.oldPrice && (
                    <span className="absolute left-2 top-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-accent-foreground">
                      PROMO
                    </span>
                  )}
                </div>
                <div className="p-3 pb-0">
                  <p className="text-sm font-semibold leading-tight">{p.name}</p>
                  <div className="mt-1">
                    <StarRating value={p.rating} size={11} showValue />
                  </div>
                </div>
              </Link>
              <div className="p-3 pt-2">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="font-display font-bold text-accent">
                      {formatFCFA(p.price)}
                    </p>
                    {p.oldPrice && (
                      <p className="text-[11px] text-muted-foreground line-through">
                        {formatFCFA(p.oldPrice)}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() =>
                      setCart((prev) =>
                        prev.includes(p.id)
                          ? prev.filter((x) => x !== p.id)
                          : [...prev, p.id],
                      )
                    }
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-full transition-colors',
                      inCart
                        ? 'bg-secondary text-primary'
                        : 'bg-primary text-primary-foreground',
                    )}
                    aria-label="Ajouter au panier"
                  >
                    {inCart ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
