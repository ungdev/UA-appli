import React from 'react'

export default class RulesHS extends React.Component {
  render() {
    return (
      <div>
        <h1>Règles du tournoi Hearthstone</h1>

        <p>Le tournoi se fera en mode Standard de Hearthstone (seulement les cartes du jeu de base et des extensions sorties les deux dernières années sont autorisées).</p>

        <p>Le format du tournoi est le mode « Conquest ». Pour gagner une confrontation, il faudra gagner une partie avec chacun des decks retenus. Quand un deck a été validé, on ne peut plus le rejouer pendant cet affrontement.</p>

        <p>Le système de classement sera le système de rondes suisse. Au début du tournoi, les joueurs auront chacun adversaire choisi au hasard dans l’ensemble des compétiteurs.</p>

        <p>Après ce premier tour de jeu, les joueurs vainqueurs gagnent tous un point. Le score des joueurs ayant été défaits ne change pas. Une nouvelle phase de jeu commence alors, les joueurs affrontent d’autres joueurs ayant le même score qu’eux. Il y aura au total 7 rondes. Il pourra y avoir d’autres matchs départageant d’éventuels ex-aequo.</p>

        <p>Après ces 8 phases de tournoi, les quatres joueurs les mieux classés s’affrontent en demi-finale. (1er contre 4ème, 2ème contre 3ème). Les vainqueurs de la demi-finale s’affrontent dans la grande finale. Les deux autres joueurs s’affrontent dans la petite finale pour la 3ème place.</p>

        <p>Tous les matchs se joueront en BO5. A chaques match, les deux joueurs choisiront un des decks de l’autre joueur, qui ne sera pas utilisé dans ce match. Si les deux joueurs ont le même nombre de point, le joueur qui choisit en premier le deck banni est tiré au hasard. Dans le cas contraire, celui qui a le moins de points commence.</p>

        <p>Les joueurs doivent envoyer la liste des decks qu’ils ont l'intention de jouer (avec la liste des cartes) aux organisateurs le vendredi, premier jour de l'événement. Les joueurs doivent soumettre obligatoirement 4 decklists, de 4 classes différentes. Une fois cette liste envoyée, aucun changement ne sera possible. Les decks listes doivent être envoyé sous forme d'image, une capture d'écran des cartes (elles doivent toutes être visible).</p>

        <h2>Règles de bonne conduite</h2>

        <p>Tous les participants sont invités à se comporter de façon respectueuse envers les autres participants. Une équipe peut être réprimandée et recevoir un avertissement si un de ses joueurs :</p>

        <ul>
          <li>Utilise un langage et des gestes insultants</li>
          <li>Est coupable d’actes violents</li>
          <li>Arrive en retard à l’heure de convocation</li>
          <li>Laisse intentionnellement un adversaire remporter le match.</li>
        </ul>

        <p>Un manquement à ces règles pourra entraîner <strong>un avertissement, la perte du match ou encore la disqualification de l’équipe</strong></p>

      </div>

    )
  }
}