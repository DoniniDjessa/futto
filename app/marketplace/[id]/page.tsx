'use client'

import { use, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Check, ShoppingCart } from 'lucide-react'
import { BackHeader, StarRating } from '@/components/ui-kit'
import { products, formatFCFA } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const product = products.find((p) => p.id === id)
  const [bought, setBought] = useState(false)

  if (!product) notFound()

  return (
    <div className="pb-8">
      <BackHeader title="Article" backHref="/marketplace" />
      <div className="relative aspect-square bg-secondary/40">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="px-5 pt-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-accent">
          {product.category}
        </p>
        <h2 className="font-display text-2xl font-bold">{product.name}</h2>
        <div className="mt-1">
          <StarRating value={product.rating} showValue />
        </div>
        <p className="mt-2 font-display text-2xl font-bold text-accent">
          {formatFCFA(product.price)}
        </p>
        {product.oldPrice && (
          <p className="text-sm text-muted-foreground line-through">
            {formatFCFA(product.oldPrice)}
          </p>
        )}
        <button
          type="button"
          onClick={() => setBought(true)}
          className={cn(
            'mt-5 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold',
            bought ? 'bg-secondary text-primary' : 'bg-primary text-primary-foreground',
          )}
        >
          {bought ? (
            <>
              <Check className="h-4 w-4" /> Commande payée (démo)
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" /> Acheter maintenant
            </>
          )}
        </button>
        <Link href="/marketplace" className="mt-3 block text-center text-sm text-muted-foreground">
          Retour à la boutique
        </Link>
      </div>
    </div>
  )
}
