'use client'

import { use, useState } from 'react'
import { notFound } from 'next/navigation'
import { BackHeader, Avatar } from '@/components/ui-kit'
import { conversations, currentUser } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const thread = conversations.find((c) => c.id === id)
  const [draft, setDraft] = useState('')
  const [extra, setExtra] = useState<{ from: 'me' | 'them'; text: string; time: string }[]>([])

  if (!thread) notFound()

  const lines = [
    { from: 'them' as const, text: thread.last, time: thread.time },
    ...extra,
  ]

  return (
    <div className="flex min-h-[70vh] flex-col pb-4">
      <BackHeader title={thread.name} backHref="/messages" />
      <div className="flex-1 space-y-2 px-5 pt-3">
        {lines.map((m, i) => (
          <div key={i} className={cn('flex', m.from === 'me' ? 'justify-end' : 'justify-start')}>
            {m.from === 'them' ? (
              <Avatar
                initials={thread.initials}
                color={thread.color}
                size={32}
                className="mr-2 self-end"
              />
            ) : null}
            <div
              className={cn(
                'max-w-[75%] rounded-2xl px-3 py-2 text-sm',
                m.from === 'me' ? 'bg-primary text-primary-foreground' : 'bg-card border border-border',
              )}
            >
              <p>{m.text}</p>
              <p
                className={cn(
                  'mt-1 text-[10px]',
                  m.from === 'me' ? 'text-primary-foreground/60' : 'text-muted-foreground',
                )}
              >
                {m.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      <form
        className="mt-4 flex gap-2 px-5"
        onSubmit={(e) => {
          e.preventDefault()
          const text = draft.trim()
          if (!text) return
          setExtra((xs) => [...xs, { from: 'me', text, time: 'maintenant' }])
          setDraft('')
        }}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="w-full rounded-full border border-border bg-card px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
          placeholder={`Message à ${thread.name}…`}
        />
        <button
          type="submit"
          className="shrink-0 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground"
        >
          Envoyer
        </button>
      </form>
      <p className="mt-1 px-5 text-[10px] text-muted-foreground">
        Tu écris en tant que {currentUser.firstName}
      </p>
    </div>
  )
}
