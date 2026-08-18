'use client'

import { useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export function FeedVideo({
  src,
  poster,
}: {
  src: string
  poster?: string
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  return (
    <div className="relative bg-black">
      <video
        ref={ref}
        src={src}
        poster={poster}
        className="mx-auto max-h-[26rem] w-full object-contain"
        playsInline
        muted={muted}
        loop
        autoPlay
        preload="metadata"
        referrerPolicy="no-referrer"
      />
      <button
        type="button"
        aria-label={muted ? 'Activer le son' : 'Couper le son'}
        onClick={() => {
          const el = ref.current
          if (!el) return
          el.muted = !muted
          setMuted(!muted)
        }}
        className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur"
      >
        {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
      </button>
    </div>
  )
}
