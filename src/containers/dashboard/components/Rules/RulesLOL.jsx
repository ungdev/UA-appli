import React from 'react'

export default class RulesLOL extends React.Component {
  render() {
    return (
      <div>
        <h1>Règles du tournoi League of Legend</h1>

        <h2>Prérequis</h2>

        <p>Le tournoi est organisé sur les serveurs officiels de <strong>l’Europe de l’Ouest.</strong>  Les participants doivent donc disposer d’un compte d’invocateur et d’un client du jeu à jour pour pouvoir participer à l’évènement. </p>

        <h2>Règles générales du jeu</h2>

        <p><strong>Mode :</strong> Partie personnalisée « Tournament Draft Mode »</p>
        <p><strong>Map :</strong> Faille de l'invocateur (5c5)</p>
        <p><strong>Sélection des champions :</strong> Avant le début du match, une équipe sera tirée au sort. L’équipe en question, se retrouvera à gauche lors de la constitution du match. Les Bans et les picks devront respecter la procédure de draft habituelle.</p>
        <p><strong>ATTENTION :</strong> Les champions sortis 2 semaines avant le tournoi ne seront pas acceptés lors des matchs. Les équipes n’auront pas besoin de ban le ou les champions récemment sortis mais ne pourront pas le/les jouer.</p>

        <h2>Déroulement d'un match</h2>

        <p><strong>Avant le match :</strong> Le tournoi commence le samedi à 10h. Si une équipe ne se présente pas dans le temps imparti, elle sera considérée comme perdante.</p>
        <p><strong>Capitaine :</strong> Avant le lancement du premier match, chaque équipe devra élire un capitaine d’équipe qui restera le même durant toute la durée du tournoi. Le capitaine d’équipe est la personne en charge de son équipe pendant le tournoi, il se chargera de la communication au sein de son équipe et devra reporter le résultat du match auprès des officiels du tournoi.</p>
        <p><strong>Interruption du match :</strong> Si un match est involontairement interrompu (plantage, déconnexion, réseau, …), les équipes sont invitées à « pauser » la partie.</p>

        <h2>Format du tournoi</h2>

        <div><strong>La phase de poule</strong></div>
        <p>Le tournoi comporte 32 équipes de 5 joueurs : 8 poules de 4 équipes seront mises en place. Chaque équipe affrontera toutes les équipes adverses de sa poule et effectuera donc 3 matchs. Une victoire rapporte 1 point tandis qu’une défaite ne rapporte aucun point à l’équipe perdante. Une fois les 3 matchs joués, les poules seront divisés en deux. Une poule dite “Amateurs” dans laquelle se trouvera les 2 dernières équipes des 3 matchs effectués. Et une poule dite “Pro” dans laquelle figurera les 2 premières équipes des 3 matchs. Les équipes seront réparties dans 4 poules de 4 dans les 2 tournois en 3 matchs. Seules les 2 premières seront qualifiées en quart.</p>

        <div><strong>Quarts de finale : (BO3)</strong></div>
        <p>Dans chacune des poules (“Amateurs” et “Pro”) les 8 équipes devront s’affronter et seront tirés au sort par les responsables. Les équipes ayant finies premières lors de la phase de poule ne peuvent pas s’affronter en quart de finale.</p>

        <div><strong>Demi-finales et finales : BO3</strong></div>
        <p>Ces phases se dérouleront en format “BO3”. La première équipe remportant 2 games sera considérée comme gagnante du match.</p>

        <h2>Règles de bonne conduite</h2>
        <p>Tous les participants sont invités à se comporter de façon respectueuse envers les autres participants. Une équipe peut être réprimandée et recevoir un avertissement si un de ses joueurs :</p>
        <ul>
          <li>Utilise un langage et des gestes insultants</li>
          <li>Est coupable d’actes violents</li>
          <li>Arrive en retard à l’heure de convocation</li>
          <li>Laisse intentionnellement un adversaire remporter le match.</li>
        </ul>

        <p>Un manquement à ces règles pourra entraîner <strong>un avertissement, la perte du match ou encore la disqualification de l’équipe.</strong> </p>
      </div>

    )
  }
}