import React from 'react'

export default class RulesLOL extends React.Component {
  render() {
    return (
      <div className="a-tournament-content">
        <p>Vous retrouverez sur cette page toutes les informations relatives au tournoi Fortnite. <strong>Attention</strong>, ces informations pourront évoluer,
        tenez vous informé via nos réseaux (<a href="https://www.facebook.com/UTTArena/">Facebook</a>/<a href="https://twitter.com/UTTArena">Twitter</a>).</p>
        <h1>Informations générales</h1>
        <p>L'inscription à l'UTT Arena est fixée à 15€ par joueur. La LAN se déroulera du Vendredi 7 Décembre 18h au Dimanche 9 Décembre à 18h <strong>sans interruption</strong>. 
        Les tournois commenceront le samedi à 10h. Sera mise à disposition une buvette, avec de la nourriture en continu et à prix réduit.</p>
        <h1>Tournoi Libre</h1>
        <p>En parallèle des tournois "Spotlights" (Lol, HS, CS:GO, Fortnite, SSBU) se déroulera un tournoi libre. Celui-ci sera composé de différents mini-tournois, sur des jeux divers et variés.
        <strong> Tout joueur de tournoi Spotlight éliminé rejoindra automatiquement le tournoi Libre.</strong> Il pourra ainsi profiter d'animations même s'il n'est plus dans la compétition.</p>
        <h1>Règlements</h1>
        <p>En participant à cette compétition, les joueurs acceptent, sans réticence ou interprétation, de respecter le règlement.
        Il est à noter que celui-ci est susceptible d’évoluer durant la LAN en fonction des besoins (retard, imprécision...). </p>
        <p>Par ailleurs, en cas de divergence d’interprétation de ce document, l’avis des administrateurs du tournoi a préséance sur celui des joueurs. Les joueurs doivent respecter les horaires
        donnés par les organisateurs et s’assurer d’être disponibles lorsqu’ils seront appelés avant le début du tournoi ainsi qu’à chaque fois que cela sera nécessaire, sous peine de disqualification. </p>
        
        <h2>Prérequis</h2>
        <p><strong> Les tournois commencent le samedi à 10h</strong>.</p>

        <h2>Règles générales</h2>
        <p>La participation au Tournoi est ouverte à toute personne disposant des éléments suivants :</p>
        <ul>
          <li>Un compte Epic Games</li>
          <li>D’un ordinateur et du jeu Fortnite sur PC à jour</li>
        </ul>
        <p>Les joueurs doivent avoir acceptés les conditions générales de Fortnite et d’Epic Games.</p>

        <h2>Déroulement d'un match</h2>
        <p><strong>Avant le match :</strong> si une équipe ne se présente pas dans le temps imparti, elle sera considérée comme déclarant forfait. La partie commencera donc sans elle.</p>
        <p><strong>Capitaine :</strong> pour créer une équipe sur le site, un joueur doit jouer le rôle de capitaine d'équipe, et les autres joueurs rejoindront son équipe. Ce capitaine
        le restera pendant toute la durée du tournoi, et sera donc le référent de l'équipe. Pour plus de simplicité, il est demandé à ce que ce soit majoritairement le capitaine qui rentre en relation avec
        le staff (en cas de problème, questions diverses, etc.). Le capitaine d’équipe sera donc la personne en charge de son équipe pendant le tournoi,
        il se chargera de la communication au sein de son équipe et devra reporter le résultat du match auprès des officiels du tournoi.</p>
        <p><strong>Interruption du match :</strong> si un match est involontairement interrompu (plantage, déconnexion, réseau…), la partie pourra recommencer. Nous nous excusons d'avance pour la gêne occasionée. En revanche, si
        un joueur possède des problèmes à répétition dûs à sa configuration, il pourra être disqualifié. Son équipe devra alors chercher un remplaçant (parmi des joueurs du tournoi libre) ou jouer sans lui, à moins qu'il ne trouve du matériel de remplacement.</p>
        <p><strong>Retard :</strong> tout retard de plus de 20 minutes entraînera le début de la partie sans l'équipe.</p>
        
        <h2>Format du tournoi</h2>
        <p><strong>Phase de placement :</strong></p>
        <p>2 groupes de 12 équipes:  2 poules A et B réparties aléatoirement - Matchs en BR4 
        </p>
        <p><strong>A l’issue de la phase de placement:</strong></p>
        <ul>
          <li>Poule A - Les équipes qui terminent en position 1 à 6 sont qualifiées pour le groupe «Elite» .</li>
          <li>Poule B - Les équipes qui terminent en position 7 à 12 sont qualifiées pour le groupe «Challenger » .</li>
        </ul>

        <h3>Tour 1</h3>
        <p>2 groupes de 12 équipes:  poules « Challenger » et  « Elite » - Matchs en BR4</p>
        <p>A l’issue du Tour 1 : Les équipes des groupes « Challenger  » terminant en position 1 à 6 
        dans leur groupe sont promus dans le groupe de niveau supérieur. </p>
        <p>Les équipes des groupes, « Elite » qui terminent en position 7 à 12 de leur groupe sont reléguées dans le 
        groupe de niveau inférieur.</p>
        <h3>Tour 2</h3>
        <p>2 groupes de 12 équipes:  poules « Challenger » et  « Elite » - Matchs en BR4</p>
        <p>A l’issue du Tour  2: Les équipes des groupes « Challenger » terminant en position 1 à 4 dans leur groupe 
        sont promus dans le groupe de niveau supérieur. </p>
        <p>Les équipes des groupes, «Elite» qui terminent en position 9 à 12 de leur groupe sont reléguées dans 
        le groupe de niveau inférieur.</p>
        <h3>Tour 3</h3>
        <p>2 groupes de 12 équipes:  poules « Challenger » et  « Elite » - Matchs en BR4</p>
        <p>A l’issue du Tour 3 : Les équipes des groupes « Elite » terminant en position 1 à 3 dans leur groupe sont 
        promus dans le groupe de niveau supérieur. Les équipes des groupes, «Challenger » terminant en position 10 à 
        12 de leur groupe sont reléguées dans le groupe de niveau inférieur.</p>
        <h3>Tour final</h3>
        <p>2 groupes de 12 équipes:  poules « Challenger » et  « Elite » - Matchs en BR6</p>
        <p>A l’issue de ce tour final, un classement des équipes est dressé suivant le système point en vigueur.</p>  

        <h2>Répartition des points</h2>
        <p>
          Top 1 : 90 points<br />
          Top 2 : 75 points<br />
          Top 3 : 65 points<br />
          Top 4 : 55 points<br />
          Top 5 : 45 points<br />
          Top 6 : 30 points<br />
          Top 7 : 25 points<br />
          Top 8 : 20 points<br />
          Top 9 : 15 points<br />
          Top 10 : 10 points<br />
          8 points / kill
        </p>

        <h2>Règles de bonne conduite</h2>
        <p>Tous les participants sont invités à se comporter de façon respectueuse envers les autres participants. Une équipe peut être réprimandée et recevoir un avertissement si un de ses joueurs :</p>
        <ul>
          <li>Utilise un langage et des gestes insultants ;</li>
          <li>Est coupable d’actes violents ;</li>
          <li>Arrive en retard à l’heure de convocation ;</li>
          <li>Laisse intentionnellement un adversaire remporter le match.</li>
        </ul>

        <p>Un manquement à ces règles pourra entraîner <strong>un avertissement, la perte d'une partie ou d'un match ou encore la disqualification de l’équipe.</strong> </p>
        
      </div>

    )
  }
}