import Link from 'next/link'
import Image from 'next/image'
import {
  Bell,
  Search,
  MapPin,
  CalendarPlus,
  Users,
  Trophy,
  BarChart3,
  ShoppingBag,
  MessageSquare,
  ChevronRight,
} from 'lucide-react'
import {
  currentUser,
  terrains,
  matches,
  players,
  tournaments,
  products,
  formatFCFA,
} from '@/lib/mock-data'
import { HomeMap } from '@/components/home-map'
import { Avatar, StarRating, Pill } from '@/components/ui-kit'
import { MenuButton } from '@/components/menu-button'

const quickActions = [
  { href: '/reserver', label: 'Réserver', icon: MapPin },
  { href: '/creer', label: 'Créer', icon: CalendarPlus },
  { href: '/joueurs', label: 'Joueurs', icon: Users },
  { href: '/tournois', label: 'Tournois', icon: Trophy },
  { href: '/classement', label: 'Classement', icon: BarChart3 },
  { href: '/marketplace', label: 'Boutique', icon: ShoppingBag },
  { href: '/stats', label: 'Stats', icon: BarChart3 },
  { href: '/messages', label: 'Messages', icon: MessageSquare },
]

export default function HomePage() {
  const upcoming = matches[0]

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="px-5 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MenuButton />
            <Link href="/profil" className="flex items-center gap-3">
            <Avatar initials={currentUser.initials} size={44} />
            <div>
              <p className="font-display text-xl font-semibold leading-tight">
                Bonjour {currentUser.firstName}
              </p>
              <p className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" /> {currentUser.city}
              </p>
            </div>
            </Link>
          </div>
          <Link
            href="/notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-secondary"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent" />
          </Link>
        </div>

        <Link
          href="/recherche"
          className="mt-4 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-3"
        >
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Rechercher un terrain, un joueur...
          </span>
        </Link>
      </header>

      {/* Map */}
      <section className="px-5">
        <HomeMap terrains={terrains} />
      </section>

      {/* Quick actions */}
      <section className="px-5">
        <div className="grid grid-cols-4 gap-3">
          {quickActions.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card py-3 text-center transition-colors hover:border-primary/50"
            >
              <Icon className="h-5 w-5 text-primary" />
              <span className="text-[11px] font-medium">{label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Upcoming match */}
      <section className="px-5">
        <div className="overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-darkgreen/40 to-card p-4">
          <div className="flex items-center justify-between">
            <Pill tone="primary">Prochain match</Pill>
            <span className="text-xs text-muted-foreground">{upcoming.date}</span>
          </div>
          <p className="mt-2 font-display text-lg font-semibold">{upcoming.title}</p>
          <p className="text-sm text-muted-foreground">
            {upcoming.terrain} · {upcoming.time} · {upcoming.format}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-primary">
              {upcoming.spotsTaken}/{upcoming.spotsTotal} joueurs
            </span>
            <Link
              href={`/matchs/${upcoming.id}`}
              className="rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground"
            >
              Voir
            </Link>
          </div>
        </div>
      </section>

      {/* Terrains */}
      <section className="px-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Terrains à proximité</h2>
          <Link href="/reserver" className="text-xs font-medium text-primary">
            Voir tout
          </Link>
        </div>
        <div className="space-y-3">
          {terrains.slice(0, 3).map((t) => (
            <Link
              key={t.id}
              href={`/terrain/${t.id}`}
              className="flex gap-3 rounded-2xl border border-border bg-card p-3 transition-colors hover:border-primary/50"
            >
              <Image
                src={t.image || '/placeholder.svg'}
                alt={t.name}
                width={72}
                height={72}
                className="h-[72px] w-[72px] rounded-xl object-cover"
              />
              <div className="flex flex-1 flex-col justify-center">
                <p className="font-semibold leading-tight">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.zone}</p>
                <div className="mt-1 flex items-center gap-2">
                  <StarRating value={t.rating} size={12} />
                  <span className="text-[11px] text-muted-foreground">
                    {t.distanceKm} km
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold text-accent">
                  {formatFCFA(t.price)}
                  <span className="text-xs font-normal text-muted-foreground">
                    {' '}
                    / h
                  </span>
                </p>
              </div>
              <ChevronRight className="h-5 w-5 self-center text-muted-foreground" />
            </Link>
          ))}
        </div>
      </section>

      {/* Matchs du moment */}
      <section className="px-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Matchs du moment</h2>
          <Link href="/matchs" className="text-xs font-medium text-primary">
            Voir tout
          </Link>
        </div>
        <div className="space-y-2">
          {matches
            .filter((m) => m.type !== 'Privé')
            .map((m) => (
              <Link
                key={m.id}
                href={`/matchs/${m.id}`}
                className="block rounded-2xl border border-border bg-card p-3"
              >
                <p className="font-semibold">{m.title}</p>
                <p className="text-xs text-muted-foreground">
                  {m.date} · {m.time} · {m.format} · {m.spotsTaken}/{m.spotsTotal}
                </p>
              </Link>
            ))}
        </div>
      </section>

      {/* Joueurs disponibles */}
      <section className="px-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Joueurs disponibles</h2>
          <Link href="/joueurs" className="text-xs font-medium text-primary">
            Voir tout
          </Link>
        </div>
        <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5">
          {players.map((p) => (
            <Link
              key={p.id}
              href={`/joueurs/${p.id}`}
              className="w-28 shrink-0 rounded-2xl border border-border bg-card p-3 text-center"
            >
              <Avatar initials={p.initials} color={p.color} size={56} className="mx-auto" />
              <p className="mt-2 truncate text-xs font-semibold">{p.name.split(' ')[0]}</p>
              <p className="text-[10px] text-muted-foreground">{p.position}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Tournois */}
      <section className="px-5">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Tournois</h2>
          <Link href="/tournois" className="text-xs font-medium text-primary">
            Voir tout
          </Link>
        </div>
        <div className="space-y-2">
          {tournaments.map((t) => (
            <Link
              key={t.id}
              href={`/tournois/${t.id}`}
              className="block rounded-2xl border border-border bg-card p-3"
            >
              <p className="font-display text-xl font-semibold">{t.name}</p>
              <p className="text-xs text-muted-foreground">
                {t.date} · {t.teams}/{t.teamsMax} équipes
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Marketplace */}
      <section className="px-5 pb-4">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Marketplace</h2>
          <Link href="/marketplace" className="text-xs font-medium text-primary">
            Voir tout
          </Link>
        </div>
        <div className="no-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5">
          {products.map((p) => (
            <Link
              key={p.id}
              href={`/marketplace/${p.id}`}
              className="w-36 shrink-0 overflow-hidden rounded-2xl border border-border bg-card"
            >
              <Image
                src={p.image || '/placeholder.svg'}
                alt={p.name}
                width={144}
                height={96}
                className="h-24 w-full object-cover"
              />
              <div className="p-2">
                <p className="truncate text-xs font-semibold">{p.name}</p>
                <p className="text-[11px] font-semibold text-accent">{formatFCFA(p.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
