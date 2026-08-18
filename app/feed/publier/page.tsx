'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Check } from 'lucide-react'
import { BackHeader } from '@/components/ui-kit'

export default function PublierPage() {
  const router = useRouter()
  const [text, setText] = useState('')
  const [done, setDone] = useState(false)

  if (done) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-8 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Check className="h-8 w-8" />
        </span>
        <h1 className="mt-4 font-display text-2xl font-bold">Publié (démo)</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Ton post est prêt. Dans l’app réelle il apparaîtra sur le fil.
        </p>
        <button
          type="button"
          onClick={() => router.push('/feed')}
          className="mt-6 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground"
        >
          Retour au fil
        </button>
      </div>
    )
  }

  return (
    <div className="pb-8">
      <BackHeader title="Publier" backHref="/feed" />
      <form
        className="px-5 pt-2"
        onSubmit={(e) => {
          e.preventDefault()
          if (!text.trim()) return
          setDone(true)
        }}
      >
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={6}
          placeholder="Partage un but, une vidéo, un appel à jouer…"
          className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          className="mt-4 w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground"
        >
          Publier
        </button>
      </form>
    </div>
  )
}
