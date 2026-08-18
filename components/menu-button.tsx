'use client'

import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useMenu } from './menu-context'

export function MenuButton() {
  const { setOpen } = useMenu()
  const pathname = usePathname()
  if (pathname === '/onboarding') return null

  return (
    <button
      type="button"
      aria-label="Menu"
      onClick={() => setOpen(true)}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary"
    >
      <Menu className="h-5 w-5" />
    </button>
  )
}
