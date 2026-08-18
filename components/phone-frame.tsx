'use client'

import type { ReactNode } from 'react'
import { Signal, Wifi, BatteryFull } from 'lucide-react'
import { BottomNav } from './bottom-nav'
import { SideNav } from './side-nav'
import { MenuProvider } from './menu-context'
import { AppDrawer } from './app-drawer'

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <MenuProvider>
      <div className="flex min-h-svh w-full items-center justify-center bg-[#060606] md:p-8">
        <SideNav />

        <div className="relative h-svh w-full overflow-hidden bg-background md:h-[860px] md:w-[400px] md:rounded-[2.75rem] md:border-[10px] md:border-[#1c1c1c] md:shadow-2xl md:shadow-black/60 lg:rounded-l-none lg:border-l-0">
          <div className="flex items-center justify-between px-6 pt-3 pb-1 text-xs font-semibold">
            <span>9:41</span>
            <div className="flex items-center gap-1.5">
              <Signal className="h-3.5 w-3.5" />
              <Wifi className="h-3.5 w-3.5" />
              <BatteryFull className="h-4 w-4" />
            </div>
          </div>

          <div className="no-scrollbar h-[calc(100%-2rem)] overflow-y-auto pb-20">
            {children}
          </div>

          <BottomNav />
          <AppDrawer />
        </div>
      </div>
    </MenuProvider>
  )
}
