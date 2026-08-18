'use client'

import Link from 'next/link'
import { Suspense, useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { BackHeader, Avatar } from '@/components/ui-kit'
import { terrains, players, matches, tournaments, products } from '@/lib/mock-data'

export default function RecherchePage() {
  return (
    <Suspense fallback={<p className="px-5 text-sm text-muted-foreground">Recherche…</p>}>
      <Results />
    </Suspense>
  )
}

function Results() {
  const params = useSearchParams()
  const router = useRouter()
  const q = (params.get('q') ?? '').trim().toLowerCase()
  const [value, setValue] = useState(params.get('q') ?? '')
  const hit = (s: string) => !q || s.toLowerCase().includes(q)

  const tList = useMemo(() => terrains.filter((t) => hit(t.name) || hit(t.zone)), [q])
  const pList = useMemo(
    () => players.filter((p) => hit(p.name) || hit(p.position)),
    [q],
  )
  const mList = useMemo(() => matches.filter((m) => hit(m.title) || hit(m.terrain)), [q])
  const cups = useMemo(() => tournaments.filter((t) => hit(t.name) || hit(t.location)), [q])
  const shop = useMemo(() => products.filter((p) => hit(p.name) || hit(p.category)), [q])

  return (
    <div className="pb-8">
      <BackHeader title="Recherche" backHref="/" />
      <div className="space-y-5 px-5 pt-2">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            router.replace(`/recherche?q=${encodeURIComponent(value.trim())}`)
          }}
          className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-3"
        >
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Terrain, joueur, match, tournoi…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </form>
        <Block title="Terrains">
          {tList.map((t) => (
            <Link key={t.id} href={`/terrain/${t.id}`} className="block rounded-2xl border border-border bg-card p-3">
              {t.name}
            </Link>
          ))}
        </Block>
        <Block title="Joueurs">
          {pList.map((p) => (
            <Link
              key={p.id}
              href={`/joueurs/${p.id}`}
              className="flex items-center gap-2 rounded-2xl border border-border bg-card p-3"
            >
              <Avatar initials={p.initials} color={p.color} size={36} />
              {p.name}
            </Link>
          ))}
        </Block>
        <Block title="Matchs">
          {mList.map((m) => (
            <Link key={m.id} href={`/matchs/${m.id}`} className="block rounded-2xl border border-border bg-card p-3">
              {m.title}
            </Link>
          ))}
        </Block>
        <Block title="Tournois">
          {cups.map((t) => (
            <Link key={t.id} href={`/tournois/${t.id}`} className="block rounded-2xl border border-border bg-card p-3">
              {t.name}
            </Link>
          ))}
        </Block>
        <Block title="Boutique">
          {shop.map((p) => (
            <Link key={p.id} href={`/marketplace/${p.id}`} className="block rounded-2xl border border-border bg-card p-3">
              {p.name}
            </Link>
          ))}
        </Block>
      </div>
    </div>
  )
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {title}
      </h2>
      <div className="space-y-2">{children}</div>
    </section>
  )
}
