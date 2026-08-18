import Link from 'next/link'
import {
  Settings,
  Trophy,
  Target,
  Award,
  BarChart3,
  CalendarCheck,
  ChevronRight,
} from 'lucide-react'
import { currentUser } from '@/lib/mock-data'
import { Avatar, StarRating, Pill } from '@/components/ui-kit'
import { MenuButton } from '@/components/menu-button'

const links = [
  { href: '/stats', label: 'Mes statistiques', icon: BarChart3 },
  { href: '/reserver', label: 'Mes réservations', icon: CalendarCheck },
  { href: '/classement', label: 'Mon classement', icon: Trophy },
]

export default function ProfilPage() {
  return (
    <div className="pb-6">
      {/* Cover + settings */}
      <div className="relative">
        <div className="h-28 bg-gradient-to-br from-darkgreen to-primary/40" />
        <div className="absolute left-5 top-4">
          <MenuButton />
        </div>
        <Link
          href="/parametres"
          className="absolute right-5 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-background/60 backdrop-blur"
          aria-label="Paramètres"
        >
          <Settings className="h-4 w-4" />
        </Link>
        <div className="-mt-12 flex flex-col items-center px-5">
          <Avatar
            initials={currentUser.initials}
            size={96}
            className="border-4 border-background"
          />
          <h1 className="mt-3 font-display text-2xl font-bold">
            {currentUser.name}
          </h1>
          <p className="text-sm text-muted-foreground">
            {currentUser.position} · {currentUser.city}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Pill tone="gold">
              <Award className="h-3 w-3" /> {currentUser.level}
            </Pill>
            <StarRating value={currentUser.rating} size={16} showValue />
          </div>
        </div>
      </div>

      {/* Player card */}
      <div className="mt-6 px-5">
        <div className="rounded-3xl border border-gold/30 bg-gradient-to-br from-card to-secondary/40 p-5">
          <p className="font-display text-sm font-semibold uppercase tracking-widest text-gold">
            Carte de joueur
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <Stat icon={CalendarCheck} value={currentUser.matches} label="Matchs" />
            <Stat icon={Target} value={currentUser.goals} label="Buts" />
            <Stat icon={Trophy} value={currentUser.wins} label="Victoires" />
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="mt-6 space-y-2 px-5">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3.5"
          >
            <Icon className="h-5 w-5 text-primary" />
            <span className="flex-1 font-medium">{label}</span>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        ))}
      </div>
    </div>
  )
}

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Trophy
  value: number
  label: string
}) {
  return (
    <div className="rounded-2xl bg-background/50 py-3">
      <Icon className="mx-auto h-5 w-5 text-primary" />
      <p className="mt-1 font-display text-2xl font-bold">{value}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  )
}
