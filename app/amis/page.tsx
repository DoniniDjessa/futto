import Link from 'next/link'
import { players } from '@/lib/mock-data'
import { playerHref } from '@/lib/lookups'
import { ScreenHeader, Avatar, StarRating } from '@/components/ui-kit'

export default function AmisPage() {
  return (
    <div>
      <ScreenHeader title="Mes amis" subtitle="Ton cercle FUTTO" />
      <ul className="px-5 pb-6">
        {players.map((p) => (
          <li key={p.id}>
            <Link
              href={playerHref(p.name)}
              className="flex items-center gap-3 border-b border-border py-3"
            >
              <Avatar initials={p.initials} color={p.color} size={48} />
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{p.name}</p>
                <p className="text-xs text-muted-foreground">
                  {p.position} · {p.level}
                </p>
              </div>
              <StarRating value={p.rating} size={12} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
