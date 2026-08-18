'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, CalendarDays, Plus, Newspaper, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const items = [
  { href: '/', label: 'Accueil', icon: Home },
  { href: '/matchs', label: 'Matchs', icon: CalendarDays },
  { href: '/creer', label: 'Créer', icon: Plus, primary: true },
  { href: '/feed', label: 'Feed', icon: Newspaper },
  { href: '/profil', label: 'Profil', icon: User },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="absolute inset-x-0 bottom-0 z-30 h-14 border-t border-border bg-background/95 backdrop-blur md:rounded-b-[2rem]">
      <ul className="flex h-full items-center justify-around px-2">
        {items.map(({ href, label, icon: Icon, primary }) => {
          const active = pathname === href
          if (primary) {
            return (
              <li key={href} className="relative flex h-full flex-1 items-end justify-center pb-1.5">
                <Link
                  href={href}
                  className="flex flex-col items-center"
                  aria-label={label}
                >
                  <span className="absolute left-1/2 top-0 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/30">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-[10px] font-medium text-muted-foreground">
                    {label}
                  </span>
                </Link>
              </li>
            )
          }
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                className={cn(
                  'flex flex-col items-center gap-0.5 text-[10px] font-medium transition-colors',
                  active ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                <Icon className="h-5 w-5" />
                {label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
