'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Lock, User, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Mode = 'intro' | 'login' | 'signup'

export default function OnboardingPage() {
  const [mode, setMode] = useState<Mode>('intro')

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-[#060606] md:p-8">
      <div className="relative h-svh w-full overflow-hidden bg-background md:h-[860px] md:w-[400px] md:rounded-[2.75rem] md:border-[10px] md:border-[#1c1c1c] md:shadow-2xl md:shadow-black/60">
        {/* Hero background */}
        <div className="absolute inset-0">
          <Image
            src="/terrain-1.png"
            alt=""
            fill
            className="object-cover opacity-40"
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background" />
        </div>

        <div className="relative flex h-full flex-col px-7 pb-8 pt-16">
          {/* Logo */}
          <div className="flex flex-1 flex-col items-center justify-center text-center">
            <Image
              src="/futto-logo.jpg"
              alt="Logo FUTTO"
              width={96}
              height={96}
              className="rounded-3xl shadow-lg"
            />
            <h1 className="mt-5 font-display text-5xl font-bold tracking-wide">
              FUTTO
            </h1>
            <p className="mt-1 font-display text-lg font-semibold text-accent">
              LE FOOT NOUS UNIT
            </p>
            <p className="mt-3 max-w-[16rem] text-sm leading-relaxed text-muted-foreground">
              Réserve ton terrain, trouve des joueurs et vis ta passion du foot à
              Abidjan.
            </p>
          </div>

          {/* Forms */}
          <div className="space-y-3">
            {mode === 'intro' && (
              <>
                <button
                  onClick={() => setMode('signup')}
                  className="w-full rounded-xl bg-primary py-3.5 font-display text-base font-bold text-primary-foreground transition-transform active:scale-95"
                >
                  Créer un compte
                </button>
                <button
                  onClick={() => setMode('login')}
                  className="w-full rounded-xl border border-border bg-card/70 py-3.5 font-display text-base font-bold backdrop-blur transition-transform active:scale-95"
                >
                  Se connecter
                </button>
                <div className="flex items-center gap-3 py-1">
                  <span className="h-px flex-1 bg-border" />
                  <span className="text-xs text-muted-foreground">ou</span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <Link
                  href="/"
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card/70 py-3 text-sm font-semibold backdrop-blur"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-[#4285F4]">
                    G
                  </span>
                  Continuer avec Google
                </Link>
              </>
            )}

            {mode !== 'intro' && (
              <form
                onSubmit={(e) => e.preventDefault()}
                className="space-y-3 rounded-2xl border border-border bg-card/80 p-4 backdrop-blur"
              >
                <div className="flex gap-2">
                  <TabButton active={mode === 'login'} onClick={() => setMode('login')}>
                    Connexion
                  </TabButton>
                  <TabButton active={mode === 'signup'} onClick={() => setMode('signup')}>
                    Inscription
                  </TabButton>
                </div>

                {mode === 'signup' && (
                  <Field icon={User} placeholder="Nom complet" />
                )}
                <Field icon={Mail} placeholder="Adresse e-mail" type="email" />
                <Field icon={Lock} placeholder="Mot de passe" type="password" />

                <Link
                  href="/"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-display text-base font-bold text-primary-foreground"
                >
                  {mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <button
                  type="button"
                  onClick={() => setMode('intro')}
                  className="w-full text-center text-xs text-muted-foreground"
                >
                  Retour
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function TabButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex-1 rounded-lg py-2 text-sm font-semibold transition-colors',
        active ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground',
      )}
    >
      {children}
    </button>
  )
}

function Field({
  icon: Icon,
  placeholder,
  type = 'text',
}: {
  icon: typeof Mail
  placeholder: string
  type?: string
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3">
      <Icon className="h-4 w-4 text-muted-foreground" />
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground"
      />
    </div>
  )
}
