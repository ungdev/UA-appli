export default state => {
  const team = state.user.user.team

  if (!team) {
    return { status: 'Aucune équipe — Libre', theme: 'warning' }
  }

  const teamUsers = team.users
  const spotlight = team.spotlight

  if (team && !spotlight) {
    return { status: 'Équipe non inscrite — Libre', theme: 'error' }
  }

  const { isFull } = (state.spotlights.spotlights.find(s => s.id === state.user.user.team.spotlightId) || {})

  if (isFull) {
    return { status: 'Équipe en retard — tournoi plein', theme: 'error' }
  }

  const playerCount = teamUsers.size
  const playerPaidCount = teamUsers.filter(player => player.paid).length
  const maxPlayers = spotlight.perTeam

  if (playerCount < maxPlayers || playerPaidCount < maxPlayers) {
    return { status: 'Équipe incomplète', theme: 'warning' }
  }

  return { status: 'Équipe inscrite', theme: 'success' }
}
