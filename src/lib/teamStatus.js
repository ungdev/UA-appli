export default state => {
  const { team } = state.user.user

  if (!team) {
    return { status: 'Aucune équipe — Libre', theme: 'warning' }
  }

  const teamUsers = team.users
  const { tournament } = team

  if (team && !tournament) {
    return { status: 'Équipe non inscrite — Libre', theme: 'error' }
  }

  const { isFull } =
    state.tournaments.tournaments.find(s => s.id === state.user.user.team.tournamentId) || {}

  if (isFull) {
    return { status: 'Équipe en retard — tournoi plein', theme: 'error' }
  }

  const playerCount = teamUsers.size
  const playerPaidCount = teamUsers.filter(player => player.paid).length
  const maxPlayers = tournament.perTeam

  if (playerCount < maxPlayers || playerPaidCount < maxPlayers) {
    return { status: 'Équipe incomplète', theme: 'warning' }
  }

  return { status: 'Équipe inscrite', theme: 'success' }
}
