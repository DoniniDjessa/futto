import {
  Home,
  CalendarDays,
  Plus,
  Users,
  Shield,
  Trophy,
  BarChart3,
  Newspaper,
  ShoppingBag,
  MessageCircle,
  Bell,
  Wallet,
  Medal,
  User,
  Settings,
  MapPin,
  Heart,
  HelpCircle,
  Info,
} from 'lucide-react'

export const navGroups = [
  {
    title: 'Jouer',
    items: [
      { href: '/', label: 'Accueil', icon: Home },
      { href: '/reserver', label: 'Réserver un terrain', icon: MapPin },
      { href: '/matchs', label: 'Matchs', icon: CalendarDays },
      { href: '/creer', label: 'Créer un match', icon: Plus },
    ],
  },
  {
    title: 'Communauté',
    items: [
      { href: '/joueurs', label: 'Joueurs', icon: Users },
      { href: '/amis', label: 'Mes amis', icon: Heart },
      { href: '/mon-equipe', label: 'Mon équipe', icon: Shield },
      { href: '/tournois', label: 'Tournois', icon: Trophy },
      { href: '/classement', label: 'Classement', icon: Medal },
      { href: '/feed', label: 'Feed', icon: Newspaper },
      { href: '/marketplace', label: 'Boutique', icon: ShoppingBag },
      { href: '/messages', label: 'Messages', icon: MessageCircle },
    ],
  },
  {
    title: 'Mon compte',
    items: [
      { href: '/notifications', label: 'Notifications', icon: Bell },
      { href: '/portefeuille', label: 'Portefeuille', icon: Wallet },
      { href: '/stats', label: 'Statistiques', icon: BarChart3 },
      { href: '/profil', label: 'Profil', icon: User },
      { href: '/parametres', label: 'Paramètres', icon: Settings },
      { href: '/aide', label: 'Aide', icon: HelpCircle },
      { href: '/a-propos', label: 'À propos', icon: Info },
    ],
  },
] as const
