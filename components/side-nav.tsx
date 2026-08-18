'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Avatar } from './ui-kit'
import { currentUser } from '@/lib/mock-data'
import { navGroups } from '@/lib/nav'

export function SideNav() {
  const pathname = usePathname()

  return (
    <aside className="no-scrollbar hidden h-[860px] w-72 shrink-0 flex-col overflow-y-auto rounded-l-3xl border border-r-0 border-border bg-card/60 lg:flex">
      <div className="flex items-center gap-3 px-5 pt-6 pb-4">
        <Image
          src="/futto-logo.jpg"
          alt="Logo FUTTO"
          width={44}
          height={44}
          className="rounded-xl"
        />
        <div>
          <p className="font-display text-2xl font-bold leading-none tracking-wide">
            FUTTO
          </p>
          <p className="text-[11px] font-semibold text-accent">LE FOOT NOUS UNIT</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-2">
        {navGroups.map((group, gi) => (
          <div key={group.title} className="mb-3">
            {gi > 0 ? <div className="mx-3 mb-3 h-px bg-border" /> : null}
            <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
              {group.title}
            </p>
            <ul className="flex flex-col gap-0.5">
              {group.items.map(({ href, label, icon: Icon }) => {
                const active =
                  href === '/' ? pathname === '/' : pathname.startsWith(href)
                return (
                  <li key={href}>
                    <Link
                      href={href}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors',
                        active
                          ? 'bg-primary/15 text-primary'
                          : 'text-muted-foreground hover:bg-secondary hover:text-foreground',
                      )}
                    >
                      <Icon className="shrink-0" style={{ width: 18, height: 18 }} />
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      <Link
        href="/profil"
        className="m-3 flex items-center gap-3 rounded-2xl border border-border bg-background/60 p-3 transition-colors hover:bg-secondary"
      >
        <Avatar initials={currentUser.initials} size={40} />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{currentUser.name}</p>
          <p className="text-xs text-primary">{currentUser.level}</p>
        </div>
      </Link>
    </aside>
  )
}
