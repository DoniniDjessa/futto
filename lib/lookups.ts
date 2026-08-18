import { currentUser, myTeam, players, rankings } from './mock-data'

export function slugName(name: string) {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export type PlayerView = {
  id: string
  name: string
  position: string
  rating: number
  distanceKm: number
  level: string
  initials: string
  color: string
  goals?: number
  points?: number
  isMe?: boolean
}

function fromRanked(name: string) {
  return Object.values(rankings)
    .flat()
    .find((r) => r.name === name)
}

export function findPlayer(id: string): PlayerView | undefined {
  if (id === 'me' || id === 'koffi' || id === slugName(currentUser.name)) {
    return {
      id: 'me',
      name: currentUser.name,
      position: currentUser.position,
      rating: currentUser.rating,
      distanceKm: 0,
      level: currentUser.level.replace('Niveau ', ''),
      initials: currentUser.initials,
      color: '#00b14f',
      goals: currentUser.goals,
      isMe: true,
    }
  }

  const byId = players.find((p) => p.id === id)
  if (byId) {
    const rank = fromRanked(byId.name)
    return { ...byId, goals: rank?.goals, points: rank?.points }
  }

  const member = myTeam.members.find((m) => m.id === id)
  if (member) return findPlayerByName(member.name)

  const ranked = Object.values(rankings)
    .flat()
    .find((r) => slugName(r.name) === id)
  if (ranked) {
    const known = players.find((p) => p.name === ranked.name)
    if (known) return findPlayer(known.id)
    if (ranked.name.includes('Koffi')) return findPlayer('me')
    return {
      id: slugName(ranked.name),
      name: ranked.name,
      position: 'Joueur',
      rating: 4.8,
      distanceKm: 0,
      level: ranked.level,
      initials: ranked.initials,
      color: ranked.color,
      goals: ranked.goals,
      points: ranked.points,
    }
  }
}

export function findPlayerByName(name: string): PlayerView | undefined {
  if (name.includes('Koffi')) return findPlayer('me')
  const first = name.replace(/\s+[A-Z]\.?$/, '').trim()
  const known = players.find(
    (p) => p.name === name || p.name.startsWith(first) || name.startsWith(p.name.split(' ')[0]),
  )
  if (known) return findPlayer(known.id)
  const ranked = Object.values(rankings)
    .flat()
    .find((r) => r.name === name || slugName(r.name) === slugName(name))
  if (ranked) return findPlayer(slugName(ranked.name))
}

export function playerHref(name: string) {
  const p = findPlayerByName(name)
  if (!p) return '/joueurs'
  return p.isMe ? '/profil' : `/joueurs/${p.id}`
}
