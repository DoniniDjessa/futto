// ============================================================================
// FUTTO — Données fictives (mock). Aucune connexion à une base de données.
// ============================================================================

export const currentUser = {
  name: 'Koffi N’Guessan',
  firstName: 'Koffi',
  city: 'Abidjan, Côte d’Ivoire',
  position: 'Milieu offensif',
  level: 'Niveau Or',
  rating: 4.7,
  matches: 34,
  wins: 21,
  losses: 8,
  goals: 47,
  initials: 'KN',
}

export type Terrain = {
  id: string
  name: string
  zone: string
  price: number
  rating: number
  reviews: number
  distanceKm: number
  image: string
  type: string
  pin: { top: string; left: string }
}

export const terrains: Terrain[] = [
  {
    id: 't1',
    name: 'Terrain Angré 8e Tranche',
    zone: 'Cocody, Abidjan',
    price: 15000,
    rating: 4.6,
    reviews: 32,
    distanceKm: 1.2,
    image: '/terrain-1.png',
    type: 'Gazon synthétique · 5v5',
    pin: { top: '32%', left: '58%' },
  },
  {
    id: 't2',
    name: 'Complexe Yopougon Niangon',
    zone: 'Yopougon, Abidjan',
    price: 10000,
    rating: 4.4,
    reviews: 18,
    distanceKm: 3.8,
    image: '/terrain-3.png',
    type: 'Gazon synthétique · 7v7',
    pin: { top: '54%', left: '24%' },
  },
  {
    id: 't3',
    name: 'Futsal Marcory Zone 4',
    zone: 'Marcory, Abidjan',
    price: 12000,
    rating: 4.7,
    reviews: 41,
    distanceKm: 2.5,
    image: '/terrain-2.png',
    type: 'Indoor futsal · 5v5',
    pin: { top: '68%', left: '62%' },
  },
  {
    id: 't4',
    name: 'Terrain Cocody Riviera 3',
    zone: 'Riviera, Abidjan',
    price: 16000,
    rating: 4.8,
    reviews: 55,
    distanceKm: 4.1,
    image: '/terrain-1.png',
    type: 'Gazon synthétique · 5v5',
    pin: { top: '40%', left: '76%' },
  },
]

export type Player = {
  id: string
  name: string
  position: string
  rating: number
  distanceKm: number
  level: string
  initials: string
  color: string
}

export const players: Player[] = [
  { id: 'p1', name: 'Moussa Traoré', position: 'Attaquant', rating: 4.8, distanceKm: 0.8, level: 'Or', initials: 'MT', color: '#00b14f' },
  { id: 'p2', name: 'Baba Yao', position: 'Milieu', rating: 4.6, distanceKm: 1.1, level: 'Argent', initials: 'BY', color: '#ff7a00' },
  { id: 'p3', name: 'Didié Kouassi', position: 'Gardien', rating: 4.7, distanceKm: 1.5, level: 'Or', initials: 'DK', color: '#006838' },
  { id: 'p4', name: 'Ismaël Coulibaly', position: 'Défenseur', rating: 4.3, distanceKm: 2.0, level: 'Argent', initials: 'IC', color: '#00b14f' },
  { id: 'p5', name: 'Yaya Touré', position: 'Milieu', rating: 4.9, distanceKm: 2.3, level: 'Diamant', initials: 'YT', color: '#ff7a00' },
  { id: 'p6', name: 'Serge Aka', position: 'Attaquant', rating: 4.2, distanceKm: 2.9, level: 'Bronze', initials: 'SA', color: '#006838' },
]

export type Match = {
  id: string
  title: string
  type: 'Amical' | 'Public' | 'Privé' | 'Tournoi'
  terrain: string
  zone: string
  date: string
  time: string
  format: string
  spotsTaken: number
  spotsTotal: number
  price: number
  host: string
}

export const matches: Match[] = [
  { id: 'm1', title: 'Match amical du samedi', type: 'Amical', terrain: 'Terrain Angré 8e', zone: 'Cocody', date: 'Sam 25 Mai', time: '16:00', format: '5 contre 5', spotsTaken: 8, spotsTotal: 10, price: 1500, host: 'Moussa T.' },
  { id: 'm2', title: 'Ligue des quartiers', type: 'Public', terrain: 'Futsal Marcory Z4', zone: 'Marcory', date: 'Dim 26 Mai', time: '10:30', format: '5 contre 5', spotsTaken: 6, spotsTotal: 10, price: 2000, host: 'Baba Y.' },
  { id: 'm3', title: 'Entre collègues', type: 'Privé', terrain: 'Yopougon Niangon', zone: 'Yopougon', date: 'Mer 29 Mai', time: '19:00', format: '7 contre 7', spotsTaken: 11, spotsTotal: 14, price: 1200, host: 'Didié K.' },
  { id: 'm4', title: 'Gros derby Riviera', type: 'Public', terrain: 'Cocody Riviera 3', zone: 'Riviera', date: 'Ven 31 Mai', time: '18:00', format: '5 contre 5', spotsTaken: 9, spotsTotal: 10, price: 2500, host: 'Yaya T.' },
]

export type Tournament = {
  id: string
  name: string
  date: string
  teams: number
  teamsMax: number
  prize: string
  fee: number
  location: string
  status: 'Inscriptions ouvertes' | 'Complet' | 'En cours'
}

export const tournaments: Tournament[] = [
  { id: 'tr1', name: 'FUTTO CUP 2024', date: '15 Juin 2024', teams: 24, teamsMax: 32, prize: '1 000 000 FCFA', fee: 25000, location: 'Abidjan', status: 'Inscriptions ouvertes' },
  { id: 'tr2', name: 'Tournoi Ramadan des quartiers', date: '22 Juin 2024', teams: 16, teamsMax: 16, prize: '500 000 FCFA', fee: 15000, location: 'Yopougon', status: 'Complet' },
  { id: 'tr3', name: 'Coupe Riviera Nights', date: '5 Juillet 2024', teams: 8, teamsMax: 16, prize: '750 000 FCFA', fee: 20000, location: 'Cocody', status: 'Inscriptions ouvertes' },
]

export type FeedPost = {
  id: string
  author: string
  initials: string
  color: string
  timeAgo: string
  content: string
  image?: string
  video?: string
  likes: number
  comments: number
  tag?: string
}

export const feedPosts: FeedPost[] = [
  {
    id: 'fv1',
    author: 'Moussa Traoré',
    initials: 'MT',
    color: '#00b14f',
    timeAgo: 'il y a 12 min',
    content:
      'Le geste qu’on veut reproduire samedi à Angré 🔥 Clip vertical, 16 secondes — voilà le format vidéo FUTTO.',
    video: 'https://v1.pinimg.com/videos/iht/720p/2d/1c/90/2d1c9077740c90d1d690adb38a48f641.mp4',
    image: 'https://i.pinimg.com/736x/7f/0d/24/7f0d249dffde0ba91bb0c535d53bdeb4.jpg',
    likes: 312,
    comments: 48,
    tag: 'Clip',
  },
  {
    id: 'f1',
    author: 'Moussa Traoré',
    initials: 'MT',
    color: '#00b14f',
    timeAgo: 'il y a 2 h',
    content: 'Quel but hier soir au Terrain Angré ! Reprise de volée en pleine lucarne 🔥 Merci les gars pour la passe.',
    image: '/feed-goal.png',
    likes: 128,
    comments: 24,
    tag: 'But de la semaine',
  },
  {
    id: 'f2',
    author: 'Yaya Touré',
    initials: 'YT',
    color: '#ff7a00',
    timeAgo: 'il y a 5 h',
    content: 'On cherche 2 joueurs pour le match de dimanche à Marcory. Niveau intermédiaire, ambiance garantie. Qui est chaud ?',
    likes: 42,
    comments: 17,
  },
  {
    id: 'f3',
    author: 'Didié Kouassi',
    initials: 'DK',
    color: '#006838',
    timeAgo: 'hier',
    content: 'Clean sheet ce week-end ! 3 arrêts décisifs. Le gant reste chaud 🧤',
    likes: 89,
    comments: 11,
    tag: 'Performance',
  },
]

export type Product = {
  id: string
  name: string
  category: string
  price: number
  oldPrice?: number
  image: string
  rating: number
}

export const products: Product[] = [
  { id: 'pr1', name: 'Maillot Éléphants Domicile', category: 'Maillots', price: 25000, oldPrice: 32000, image: '/product-jersey.png', rating: 4.7 },
  { id: 'pr2', name: 'Crampons Predator Turf', category: 'Chaussures', price: 45000, image: '/product-boots.png', rating: 4.5 },
  { id: 'pr3', name: 'Ballon Match Pro', category: 'Ballons', price: 18000, oldPrice: 22000, image: '/product-ball.png', rating: 4.8 },
  { id: 'pr4', name: 'Maillot FUTTO Édition', category: 'Maillots', price: 22000, image: '/product-jersey.png', rating: 4.6 },
  { id: 'pr5', name: 'Crampons Vitesse Elite', category: 'Chaussures', price: 52000, image: '/product-boots.png', rating: 4.4 },
  { id: 'pr6', name: 'Ballon Entraînement', category: 'Ballons', price: 12000, image: '/product-ball.png', rating: 4.3 },
]

export type Conversation = {
  id: string
  name: string
  initials: string
  color: string
  last: string
  time: string
  unread: number
}

export const conversations: Conversation[] = [
  { id: 'c1', name: 'Équipe Sangaré', initials: 'ES', color: '#00b14f', last: 'On se retrouve à 16h ?', time: '14:32', unread: 2 },
  { id: 'c2', name: 'Yaya Touré', initials: 'YT', color: '#ff7a00', last: 'Parfait, je réserve le terrain', time: '13:10', unread: 0 },
  { id: 'c3', name: 'Baba Yao', initials: 'BY', color: '#006838', last: 'Terrain réservé ! ✅', time: 'Hier', unread: 0 },
  { id: 'c4', name: 'Moussa Traoré', initials: 'MT', color: '#00b14f', last: 'Gros match hier bravo', time: 'Hier', unread: 0 },
]

export type Ranked = {
  rank: number
  name: string
  initials: string
  color: string
  points: number
  goals: number
  level: string
}

export const rankings: Record<'Abidjan' | 'Côte d’Ivoire' | 'Afrique', Ranked[]> = {
  Abidjan: [
    { rank: 1, name: 'Yaya Touré', initials: 'YT', color: '#ff7a00', points: 2840, goals: 92, level: 'Diamant' },
    { rank: 2, name: 'Moussa Traoré', initials: 'MT', color: '#00b14f', points: 2610, goals: 88, level: 'Or' },
    { rank: 3, name: 'Serge Aka', initials: 'SA', color: '#006838', points: 2390, goals: 74, level: 'Or' },
    { rank: 4, name: 'Koffi N’Guessan', initials: 'KN', color: '#00b14f', points: 2180, goals: 47, level: 'Or' },
    { rank: 5, name: 'Baba Yao', initials: 'BY', color: '#ff7a00', points: 1990, goals: 61, level: 'Argent' },
  ],
  'Côte d’Ivoire': [
    { rank: 1, name: 'Franck Kessié', initials: 'FK', color: '#00b14f', points: 4120, goals: 140, level: 'Légende' },
    { rank: 2, name: 'Yaya Touré', initials: 'YT', color: '#ff7a00', points: 3860, goals: 121, level: 'Diamant' },
    { rank: 3, name: 'Sébastien Haller', initials: 'SH', color: '#006838', points: 3540, goals: 118, level: 'Diamant' },
    { rank: 4, name: 'Moussa Traoré', initials: 'MT', color: '#00b14f', points: 3010, goals: 95, level: 'Or' },
    { rank: 5, name: 'Koffi N’Guessan', initials: 'KN', color: '#00b14f', points: 2760, goals: 47, level: 'Or' },
  ],
  Afrique: [
    { rank: 1, name: 'Sadio Mané', initials: 'SM', color: '#ff7a00', points: 6120, goals: 210, level: 'Légende' },
    { rank: 2, name: 'Mohamed Salah', initials: 'MS', color: '#00b14f', points: 5980, goals: 205, level: 'Légende' },
    { rank: 3, name: 'Franck Kessié', initials: 'FK', color: '#006838', points: 4990, goals: 160, level: 'Légende' },
    { rank: 4, name: 'Yaya Touré', initials: 'YT', color: '#ff7a00', points: 4210, goals: 133, level: 'Diamant' },
    { rank: 5, name: 'Koffi N’Guessan', initials: 'KN', color: '#00b14f', points: 2980, goals: 47, level: 'Or' },
  ],
}

// Buts marqués par mois (mini graphe des stats)
export const goalsByMonth = [
  { month: 'Jan', goals: 6 },
  { month: 'Fév', goals: 9 },
  { month: 'Mar', goals: 5 },
  { month: 'Avr', goals: 11 },
  { month: 'Mai', goals: 12 },
  { month: 'Juin', goals: 4 },
]

// ---------------------------------------------------------------------------
// Mon équipe
// ---------------------------------------------------------------------------
export type TeamMember = {
  id: string
  name: string
  position: string
  initials: string
  color: string
  role: 'Capitaine' | 'Titulaire' | 'Remplaçant'
  number: number
}

export const myTeam = {
  name: 'Les Éléphants d’Angré',
  tag: 'ELA',
  city: 'Cocody, Abidjan',
  color: '#00b14f',
  founded: '2023',
  wins: 18,
  draws: 4,
  losses: 6,
  rankCity: 4,
  members: [
    { id: 'tm1', name: 'Koffi N’Guessan', position: 'Milieu offensif', initials: 'KN', color: '#00b14f', role: 'Capitaine', number: 10 },
    { id: 'tm2', name: 'Moussa Traoré', position: 'Attaquant', initials: 'MT', color: '#ff7a00', role: 'Titulaire', number: 9 },
    { id: 'tm3', name: 'Didié Kouassi', position: 'Gardien', initials: 'DK', color: '#006838', role: 'Titulaire', number: 1 },
    { id: 'tm4', name: 'Ismaël Coulibaly', position: 'Défenseur', initials: 'IC', color: '#00b14f', role: 'Titulaire', number: 4 },
    { id: 'tm5', name: 'Baba Yao', position: 'Milieu', initials: 'BY', color: '#ff7a00', role: 'Titulaire', number: 8 },
    { id: 'tm6', name: 'Serge Aka', position: 'Attaquant', initials: 'SA', color: '#006838', role: 'Remplaçant', number: 11 },
  ] as TeamMember[],
}

// ---------------------------------------------------------------------------
// Notifications
// ---------------------------------------------------------------------------
export type Notification = {
  id: string
  type: 'match' | 'invite' | 'social' | 'wallet' | 'system'
  title: string
  body: string
  time: string
  unread: boolean
}

export const notifications: Notification[] = [
  { id: 'n1', type: 'invite', title: 'Invitation à un match', body: 'Yaya Touré t’invite au « Gros derby Riviera » vendredi 18:00.', time: 'il y a 12 min', unread: true },
  { id: 'n2', type: 'match', title: 'Match confirmé', body: 'Ton match amical du samedi à Angré 8e est confirmé (8/10 joueurs).', time: 'il y a 1 h', unread: true },
  { id: 'n3', type: 'social', title: 'Moussa a aimé ta publication', body: '« Clean sheet ce week-end ! » a reçu un nouveau like.', time: 'il y a 3 h', unread: true },
  { id: 'n4', type: 'wallet', title: 'Recharge réussie', body: 'Ton portefeuille a été crédité de 10 000 FCFA via Orange Money.', time: 'hier', unread: false },
  { id: 'n5', type: 'system', title: 'Nouveau niveau atteint', body: 'Félicitations ! Tu passes au Niveau Or. Continue comme ça.', time: 'hier', unread: false },
  { id: 'n6', type: 'match', title: 'Rappel de match', body: 'Ton match « Ligue des quartiers » commence dans 2 heures à Marcory.', time: 'il y a 2 j', unread: false },
]

// ---------------------------------------------------------------------------
// Portefeuille
// ---------------------------------------------------------------------------
export type Transaction = {
  id: string
  label: string
  method: string
  amount: number
  date: string
  kind: 'credit' | 'debit'
}

export const wallet = {
  balance: 27500,
  transactions: [
    { id: 'w1', label: 'Recharge Orange Money', method: 'Orange Money', amount: 10000, date: '24 Mai 2024', kind: 'credit' },
    { id: 'w2', label: 'Réservation Terrain Angré 8e', method: 'Portefeuille', amount: 15000, date: '22 Mai 2024', kind: 'debit' },
    { id: 'w3', label: 'Inscription match — Ligue des quartiers', method: 'Portefeuille', amount: 2000, date: '20 Mai 2024', kind: 'debit' },
    { id: 'w4', label: 'Recharge MTN Money', method: 'MTN Money', amount: 20000, date: '18 Mai 2024', kind: 'credit' },
    { id: 'w5', label: 'Achat Maillot FUTTO Édition', method: 'Portefeuille', amount: 22000, date: '15 Mai 2024', kind: 'debit' },
  ] as Transaction[],
}

export const paymentMethods = [
  { id: 'pm1', name: 'Orange Money', hint: '•••• 4821', color: '#ff7a00' },
  { id: 'pm2', name: 'MTN Money', hint: '•••• 7390', color: '#ffcc00' },
  { id: 'pm3', name: 'Wave', hint: '•••• 1157', color: '#00b0ff' },
]

export function formatFCFA(value: number) {
  return `${value.toLocaleString('fr-FR')} FCFA`
}
