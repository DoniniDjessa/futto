'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { Star, ChevronLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { MenuButton } from './menu-button'

export function BackHeader({
  title,
  backHref,
  right,
}: {
  title: string
  backHref: string
  right?: ReactNode
}) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-background/90 px-4 py-3 backdrop-blur">
      <Link
        href={backHref}
        aria-label="Retour"
        className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        <ChevronLeft className="h-5 w-5" />
      </Link>
      <h1 className="flex-1 truncate font-display text-lg font-bold tracking-wide">
        {title}
      </h1>
      {right}
    </header>
  )
}

export function Avatar({
  initials,
  color = '#00b14f',
  size = 44,
  className,
}: {
  initials: string
  color?: string
  size?: number
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center rounded-full font-display font-semibold text-white',
        className,
      )}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        fontSize: size * 0.4,
      }}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}

export function StarRating({
  value,
  size = 14,
  showValue = false,
}: {
  value: number
  size?: number
  showValue?: boolean
}) {
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i + 1 <= Math.round(value)
        return (
          <Star
            key={i}
            style={{ width: size, height: size }}
            className={filled ? 'fill-gold text-gold' : 'text-muted-foreground/40'}
          />
        )
      })}
      {showValue && (
        <span className="ml-1 text-xs font-semibold text-muted-foreground">
          {value.toFixed(1)}
        </span>
      )}
    </span>
  )
}

export function ScreenHeader({
  title,
  subtitle,
  right,
}: {
  title: string
  subtitle?: string
  right?: ReactNode
}) {
  return (
    <header className="flex items-start justify-between gap-3 px-5 pt-3 pb-4">
      <div className="flex min-w-0 flex-1 items-start gap-3">
        <MenuButton />
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-bold tracking-wide text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-0.5 text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>
      {right}
    </header>
  )
}

export function Pill({
  children,
  tone = 'muted',
  className,
}: {
  children: ReactNode
  tone?: 'muted' | 'primary' | 'accent' | 'gold'
  className?: string
}) {
  const tones = {
    muted: 'bg-secondary text-muted-foreground',
    primary: 'bg-primary/15 text-primary',
    accent: 'bg-accent/15 text-accent',
    gold: 'bg-gold/15 text-gold',
  }
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function Card({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-card p-4',
        className,
      )}
    >
      {children}
    </div>
  )
}
