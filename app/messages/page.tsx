import Link from 'next/link'
import { ArrowLeft, Search } from 'lucide-react'
import { conversations } from '@/lib/mock-data'
import { ScreenHeader, Avatar } from '@/components/ui-kit'

export default function MessagesPage() {
  return (
    <div className="pb-6">
      <ScreenHeader
        title="Messages"
        right={
          <Link
            href="/"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary"
            aria-label="Retour"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
        }
      />

      <div className="px-5">
        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Rechercher une conversation...</span>
        </div>

        <div className="mt-4 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
          {conversations.map((c) => (
            <Link href={`/messages/${c.id}`} className="flex w-full items-center gap-3 p-3.5 text-left">
              <Avatar initials={c.initials} color={c.color} size={48} />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{c.name}</p>
                  <span className="text-[11px] text-muted-foreground">{c.time}</span>
                </div>
                <p className="truncate text-sm text-muted-foreground">{c.last}</p>
              </div>
              {c.unread > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                  {c.unread}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
