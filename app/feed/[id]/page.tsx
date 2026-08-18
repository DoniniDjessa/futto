'use client'

import { use, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Heart } from 'lucide-react'
import { BackHeader, Avatar, Pill } from '@/components/ui-kit'
import { FeedVideo } from '@/components/feed-video'
import { feedPosts, currentUser } from '@/lib/mock-data'
import { playerHref } from '@/lib/lookups'
import { cn } from '@/lib/utils'

export default function PostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const post = feedPosts.find((p) => p.id === id)
  const [liked, setLiked] = useState(false)
  const [text, setText] = useState('')
  const [extra, setExtra] = useState<{ author: string; text: string; time: string }[]>([])

  if (!post) notFound()

  const seed = [
    { author: 'Baba Yao', text: 'Force à toi 🔥', time: 'il y a 40 min' },
    { author: 'Serge Aka', text: 'On remet ça samedi ?', time: 'il y a 20 min' },
  ].slice(0, Math.min(2, post.comments))

  return (
    <div className="pb-8">
      <BackHeader title="Publication" backHref="/feed" />
      <article className="px-5 pt-2">
        <div className="flex items-center gap-3">
          <Link href={playerHref(post.author)}>
            <Avatar initials={post.initials} color={post.color} size={44} />
          </Link>
          <div>
            <Link href={playerHref(post.author)} className="font-semibold leading-tight">
              {post.author}
            </Link>
            <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
          </div>
        </div>
        {post.tag && (
          <div className="mt-3">
            <Pill tone="accent">{post.tag}</Pill>
          </div>
        )}
        <p className="mt-3 text-sm leading-relaxed">{post.content}</p>
        {post.video ? (
          <div className="mt-3 overflow-hidden rounded-2xl">
            <FeedVideo src={post.video} poster={post.image} />
          </div>
        ) : post.image ? (
          <Image
            src={post.image}
            alt=""
            width={400}
            height={240}
            className="mt-3 h-48 w-full rounded-2xl object-cover"
          />
        ) : null}
        <button
          type="button"
          onClick={() => setLiked((v) => !v)}
          className="mt-3 flex items-center gap-1.5 text-sm"
        >
          <Heart className={cn('h-5 w-5', liked ? 'fill-accent text-accent' : 'text-muted-foreground')} />
          <span className={liked ? 'text-accent' : 'text-muted-foreground'}>
            {post.likes + (liked ? 1 : 0)}
          </span>
        </button>

        <h3 className="mt-6 font-display text-lg font-bold">Commentaires</h3>
        <ul className="mt-2 space-y-2">
          {[...seed, ...extra].map((c, i) => (
            <li key={i} className="rounded-2xl border border-border bg-card p-3">
              <p className="text-sm font-semibold">{c.author}</p>
              <p className="text-sm text-muted-foreground">{c.text}</p>
              <p className="mt-1 text-[10px] text-muted-foreground">{c.time}</p>
            </li>
          ))}
        </ul>
        <form
          className="mt-4 flex gap-2"
          onSubmit={(e) => {
            e.preventDefault()
            const t = text.trim()
            if (!t) return
            setExtra((xs) => [...xs, { author: currentUser.name, text: t, time: 'à l’instant' }])
            setText('')
          }}
        >
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full rounded-full border border-border bg-card px-4 py-3 text-sm outline-none placeholder:text-muted-foreground"
            placeholder="Écrire un commentaire…"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground"
          >
            OK
          </button>
        </form>
      </article>
    </div>
  )
}
