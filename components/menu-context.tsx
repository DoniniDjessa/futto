'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

const MenuCtx = createContext<{
  open: boolean
  setOpen: (v: boolean) => void
} | null>(null)

export function MenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return <MenuCtx.Provider value={{ open, setOpen }}>{children}</MenuCtx.Provider>
}

export function useMenu() {
  const ctx = useContext(MenuCtx)
  if (!ctx) throw new Error('useMenu hors MenuProvider')
  return ctx
}
