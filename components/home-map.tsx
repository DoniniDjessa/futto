'use client'

import { useRouter } from 'next/navigation'
import { MapView } from '@/components/map-view'
import type { Terrain } from '@/lib/mock-data'

export function HomeMap({ terrains }: { terrains: Terrain[] }) {
  const router = useRouter()
  return (
    <MapView terrains={terrains} onSelect={(id) => router.push(`/terrain/${id}`)} />
  )
}
