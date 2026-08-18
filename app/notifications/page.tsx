'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Bell,
  CalendarCheck,
  UserPlus,
  Heart,
  Wallet,
  Sparkles,
  CheckCheck,
} from 'lucide-react'
import { ScreenHeader } from '@/components/ui-kit'
import { notifications as seed, type Notification } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

const iconByType = {
  match: { icon: CalendarCheck, color: 'text-primary', bg: 'bg-primary/15' },
  invite: { icon: UserPlus, color: 'text-accent', bg: 'bg-accent/15' },
  social: { icon: Heart, color: 'text-gold', bg: 'bg-gold/15' },
  wallet: { icon: Wallet, color: 'text-primary', bg: 'bg-primary/15' },
  system: { icon: Sparkles, color: 'text-accent', bg: 'bg-accent/15' },
} as const

const hrefById: Record<string, string> = {
  n1: '/matchs/m4',
  n2: '/matchs/m1',
  n3: '/feed',
  n4: '/portefeuille',
  n5: '/profil',
  n6: '/matchs/m2',
}

export default function NotificationsPage() {
  const [items, setItems] = useState<Notification[]>(seed)
  const unread = items.filter((n) => n.unread).length

  const markAll = () =>
    setItems((prev) => prev.map((n) => ({ ...n, unread: false })))
  const toggle = (id: string) =>
    setItems((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n)),
    )

  return (
    <>
      <ScreenHeader
        title="Notifications"
        subtitle={unread > 0 ? `${unread} non lues` : 'Tout est à jour'}
        right={
          <button
            onClick={markAll}
            className="flex items-center gap-1 rounded-full bg-secondary px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-primary"
          >
            <CheckCheck className="h-4 w-4" /> Tout lire
          </button>
        }
      />

      <div className="space-y-2 px-5 pb-6">
        {items.map((n) => {
          const { icon: Icon, color, bg } = iconByType[n.type]
          return (
            <Link
              key={n.id}
              href={hrefById[n.id] ?? '/notifications'}
              onClick={() => toggle(n.id)}
              className={cn(
                'flex w-full items-start gap-3 rounded-2xl border p-3 text-left transition-colors',
                n.unread
                  ? 'border-primary/40 bg-card'
                  : 'border-border bg-card/50',
              )}
            >
              <span
                className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
                  bg,
                )}
              >
                <Icon className={cn('h-5 w-5', color)} />
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-semibold leading-tight">{n.title}</p>
                  {n.unread && (
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  )}
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">{n.body}</p>
                <p className="mt-1 text-[11px] text-muted-foreground/70">{n.time}</p>
              </div>
            </Link>
          )
        })}

        <div className="flex flex-col items-center gap-1 pt-6 text-center text-muted-foreground">
          <Bell className="h-6 w-6" />
          <p className="text-xs">Tu es à jour. Reviens plus tard !</p>
        </div>
      </div>
    </>
  )
}
