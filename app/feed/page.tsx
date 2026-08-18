'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, MessageCircle, Share2, Plus, UserPlus } from 'lucide-react'
import { feedPosts } from '@/lib/mock-data'
import { ScreenHeader, Avatar, Pill } from '@/components/ui-kit'
import { FeedVideo } from '@/components/feed-video'
import { cn } from '@/lib/utils'

export default function FeedPage() {
  const [liked, setLiked] = useState<string[]>([])
  const [followed, setFollowed] = useState<string[]>([])

  return (
    <div className="pb-6">
      <ScreenHeader
        title="Le Fil FUTTO"
        subtitle="Le foot amateur ivoirien en direct"
        right={
          <Link
            href="/feed/publier"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground"
            aria-label="Publier"
          >
            <Plus className="h-5 w-5" />
          </Link>
        }
      />

      <div className="space-y-4 px-5">
        {feedPosts.map((post) => {
          const isLiked = liked.includes(post.id)
          const isFollowed = followed.includes(post.id)
          return (
            <article
              key={post.id}
              className="overflow-hidden rounded-2xl border border-border bg-card"
            >
              <div className="flex items-center gap-3 p-4">
                <Avatar initials={post.initials} color={post.color} size={44} />
                <div className="flex-1">
                  <p className="font-semibold leading-tight">{post.author}</p>
                  <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
                </div>
                <button
                  onClick={() =>
                    setFollowed((prev) =>
                      prev.includes(post.id)
                        ? prev.filter((x) => x !== post.id)
                        : [...prev, post.id],
                    )
                  }
                  className={cn(
                    'flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors',
                    isFollowed
                      ? 'bg-secondary text-muted-foreground'
                      : 'bg-primary/15 text-primary',
                  )}
                >
                  {!isFollowed && <UserPlus className="h-3.5 w-3.5" />}
                  {isFollowed ? 'Suivi' : 'Suivre'}
                </button>
              </div>

              <div className="px-4 pb-3">
                {post.tag && (
                  <div className="mb-2">
                    <Pill tone="accent">{post.tag}</Pill>
                  </div>
                )}
                <Link href={`/feed/${post.id}`} className="text-sm leading-relaxed">
                  {post.content}
                </Link>
              </div>

              {post.video ? (
                <FeedVideo src={post.video} poster={post.image} />
              ) : post.image ? (
                <Link href={`/feed/${post.id}`}>
                  <Image
                    src={post.image || '/placeholder.svg'}
                    alt="Publication"
                    width={400}
                    height={300}
                    className="h-56 w-full object-cover"
                  />
                </Link>
              ) : null}

              <div className="flex items-center gap-5 p-4">
                <button
                  onClick={() =>
                    setLiked((prev) =>
                      prev.includes(post.id)
                        ? prev.filter((x) => x !== post.id)
                        : [...prev, post.id],
                    )
                  }
                  className="flex items-center gap-1.5 text-sm"
                >
                  <Heart
                    className={cn(
                      'h-5 w-5 transition-colors',
                      isLiked ? 'fill-accent text-accent' : 'text-muted-foreground',
                    )}
                  />
                  <span className={isLiked ? 'text-accent' : 'text-muted-foreground'}>
                    {post.likes + (isLiked ? 1 : 0)}
                  </span>
                </button>
                <Link href={`/feed/${post.id}`} className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MessageCircle className="h-5 w-5" />
                  {post.comments}
                </Link>
                <button className="ml-auto text-muted-foreground" aria-label="Partager">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
