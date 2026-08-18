'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  User,
  Bell,
  Globe,
  Moon,
  MapPin,
  Shield,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronRight,
} from 'lucide-react'
import { ScreenHeader, Avatar } from '@/components/ui-kit'
import { currentUser } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: () => void
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={cn(
        'relative h-6 w-11 shrink-0 rounded-full transition-colors',
        checked ? 'bg-primary' : 'bg-secondary',
      )}
    >
      <span
        className={cn(
          'absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform',
          checked ? 'translate-x-5' : 'translate-x-0.5',
        )}
      />
    </button>
  )
}

export default function ParametresPage() {
  const [toggles, setToggles] = useState({
    notifs: true,
    darkMode: true,
    location: true,
  })
  const flip = (k: keyof typeof toggles) =>
    setToggles((prev) => ({ ...prev, [k]: !prev[k] }))

  return (
    <>
      <ScreenHeader title="Paramètres" subtitle="Gère ton compte et l'app" />

      <div className="space-y-5 px-5 pb-6">
        {/* Profile summary */}
        <Link
          href="/profil"
          className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4"
        >
          <Avatar initials={currentUser.initials} size={52} />
          <div className="flex-1">
            <p className="font-display text-lg font-bold leading-tight">
              {currentUser.name}
            </p>
            <p className="text-sm text-primary">{currentUser.level}</p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Link>

        {/* Preferences with toggles */}
        <Section title="Préférences">
          <ToggleRow
            icon={Bell}
            label="Notifications push"
            checked={toggles.notifs}
            onChange={() => flip('notifs')}
          />
          <ToggleRow
            icon={Moon}
            label="Mode sombre"
            checked={toggles.darkMode}
            onChange={() => flip('darkMode')}
          />
          <ToggleRow
            icon={MapPin}
            label="Partager ma position"
            checked={toggles.location}
            onChange={() => flip('location')}
          />
        </Section>

        {/* Account links */}
        <Section title="Compte">
          <LinkRow icon={User} label="Modifier le profil" href="/profil" />
          <LinkRow icon={CreditCard} label="Portefeuille & paiements" href="/portefeuille" />
          <LinkRow icon={Shield} label="Confidentialité & sécurité" />
          <LinkRow icon={Globe} label="Langue" value="Français" />
        </Section>

        <Section title="Assistance">
          <LinkRow icon={HelpCircle} label="Centre d'aide" href="/aide" />
        </Section>

        <Link
          href="/onboarding"
          className="flex items-center justify-center gap-2 rounded-2xl border border-destructive/40 bg-destructive/10 py-3 text-sm font-semibold text-destructive"
        >
          <LogOut className="h-4 w-4" /> Se déconnecter
        </Link>

        <p className="text-center text-xs text-muted-foreground">
          FUTTO · Démo v1.0 — 100% Ivoirien, 100% Foot
        </p>
      </div>
    </>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <p className="mb-2 px-1 text-xs font-bold uppercase tracking-wider text-muted-foreground/70">
        {title}
      </p>
      <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
        {children}
      </div>
    </div>
  )
}

function ToggleRow({
  icon: Icon,
  label,
  checked,
  onChange,
}: {
  icon: typeof Bell
  label: string
  checked: boolean
  onChange: () => void
}) {
  return (
    <div className="flex items-center gap-3 p-4">
      <Icon className="h-5 w-5 text-primary" />
      <span className="flex-1 text-sm font-medium">{label}</span>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  )
}

function LinkRow({
  icon: Icon,
  label,
  href,
  value,
}: {
  icon: typeof Bell
  label: string
  href?: string
  value?: string
}) {
  const inner = (
    <div className="flex items-center gap-3 p-4">
      <Icon className="h-5 w-5 text-primary" />
      <span className="flex-1 text-sm font-medium">{label}</span>
      {value && <span className="text-sm text-muted-foreground">{value}</span>}
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </div>
  )
  return href ? <Link href={href}>{inner}</Link> : <button className="w-full text-left">{inner}</button>
}
