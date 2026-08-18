'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar } from './ui-kit'
import { currentUser } from '@/lib/mock-data'
import { navGroups } from '@/lib/nav'
import { useMenu } from './menu-context'

export function AppDrawer() {
  const { open, setOpen } = useMenu()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setOpen(false)
  }, [pathname, setOpen])

  if (!open || pathname === '/onboarding') return null

  return (
    <div className="absolute inset-0 z-50 flex">
      <button
        type="button"
        className="absolute inset-0 bg-black/60"
        aria-label="Fermer le menu"
        onClick={() => setOpen(false)}
      />
      <aside className="relative flex h-full w-[82%] max-w-[300px] flex-col bg-background pt-3 shadow-2xl">
        <Link
          href="/profil"
          onClick={() => setOpen(false)}
          className="flex items-center gap-3 px-4 pb-4"
        >
          <Avatar initials={currentUser.initials} size={56} />
          <div className="min-w-0">
            <p className="truncate text-base font-semibold leading-tight">{currentUser.name}</p>
            <p className="text-sm text-accent">{currentUser.level}</p>
            <p className="text-xs text-muted-foreground">{currentUser.city}</p>
          </div>
        </Link>
        <div className="mx-4 h-px bg-border" />
        <nav className="min-h-0 flex-1 overflow-y-auto py-1">
          {navGroups.map((group, gi) => (
            <div key={group.title}>
              {gi > 0 ? <div className="mx-4 my-2 h-px bg-border" /> : null}
              <p className="px-4 pb-1 pt-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">
                {group.title}
              </p>
              {group.items.map(({ href, label, icon: Icon }) => {
                const active = href === '/' ? pathname === '/' : pathname.startsWith(href)
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center gap-3 px-4 py-2.5 text-base',
                      active ? 'bg-primary/15 font-semibold text-primary' : 'text-foreground/80',
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {label}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>
        <div className="mx-4 h-px bg-border" />
        <button
          type="button"
          className="flex items-center gap-3 px-4 py-4 text-left text-base text-muted-foreground"
          onClick={() => {
            setOpen(false)
            router.push('/onboarding')
          }}
        >
          <LogOut className="h-4 w-4" />
          Se déconnecter
        </button>
      </aside>
    </div>
  )
}
