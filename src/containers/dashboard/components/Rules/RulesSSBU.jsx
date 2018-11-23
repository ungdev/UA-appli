import React from 'react'

export default class RulesLOL extends React.Component {
  render() {
    return (
      <div className="a-tournament-content">
      <p>Vous retrouverez sur cette page toutes les informations relatives aux tournoi Super Smash Bros Ultimate. <strong>Attention</strong>, ces informations pourront évoluer,
      tenez vous informé via nos réseaux (<a href="https://www.facebook.com/UTTArena/">Facebook</a>/<a href="https://twitter.com/UTTArena">Twitter</a>).</p>
      <h1>Informations générales</h1>
      <p>L'inscription à l'UTT Arena est fixée à 15€ par joueur. La LAN se déroulera du Vendredi 7 Décembre 18h au Dimanche 9 Décembre à 18h <strong>sans interruption</strong>.
      Les tournois commenceront le samedi à 10h. Sera mise à disposition une buvette, avec de la nourriture en continu et à prix réduit.</p>
      <p>Lorsque les joueurs ne seront pas en train de jouer sur les Nintendo Switch mises à disposition, ils seront invités à attendre autour des consoles ou devant la scène.
      Aucune place assise ne sera attribuée aux joueurs de Super Smash Bros Ultimate et ils n'auront pas accès au réseau.</p>

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

      <h2>Règles générales du jeu</h2>
      <p><strong>Format :</strong> 1v1</p>
      <p><strong>Mode :</strong> Vie</p>
      <p><strong>Vies :</strong> 2</p>
      <p><strong>Combattants personnalisés :</strong> désactivé</p>
      <p><strong>Handicap :</strong> désactivé</p>
      <p><strong>Taux d'éjection :</strong> x1,0</p>
      <p><strong>Choix des objets :</strong> désactivés, aucun</p>
      <p><strong>Temps limite :</strong> 6 minutes</p>
      <p><strong>Affichage des dégâts :</strong> activé</p>
      <p><strong>Stage :</strong> Aléatoire parmi une sélection de stages faite par les organisateurs (sauf si les deux joueurs sont d'accords sur le choix du terrain, parmi les terrains sélectionnés)</p>
      <p><strong>Personnages :</strong> Une liste de personnages disponibles sera dévoilée au début du tournoi en fonction des personnages débloqués. Le jeu sortant le jour même, nous ne pouvons pas garantir la disponibilité de tous les personnages.</p>
      <p><strong>ATTENTION :</strong> le jeu sortant le jour même, nous ne pouvons pas vous garantir qu'il n'y ait pas de bug, ou que tous les personnages soient débloqués.</p>

      <h2>Déroulement d'un match</h2>
      <p><strong>Avant le match :</strong></p>
      <ul>
        <li>Tout retard de plus de 5 minutes entraînera le forfait automatique d'une partie.</li>
        <li>Les joueurs devront s'assurer que les règles soient lues et comprises.</li>
      </ul>
      <p><strong>Début du match :</strong></p>
      <ul>
        <li><strong>Pour les poules</strong> : Choix du terrain aléatoire parmi une sélection de stages faite par
        les organisateurs (sauf si les deux joueurs sont d'accords sur le choix du terrain, parmi les terrains sélectionnés)</li>
        <li><strong>À partir des quarts de finales (top 8)</strong> :  Première phase de striking :
          <ul>
            <li>Une manche de pierre-feuille-ciseaux (PFC) est jouée.</li>
            <li>Le gagnant élimine 1 stage dans la liste de terrains choisies par les organisateurs ;
            le perdant du PFC en élimine 2 autres ; puis le gagnant choisit parmi les deux terrains restants.</li>
            <li>Le match est joué.</li>
            <li>Le gagnant du match bannit 2 stages ; le perdant choisit dans ceux restants. </li>
            <li>Le gagnant peut changer de personnage, puis le perdant.</li>
            <li>Les deux étapes sont répétées jusqu’à la fin du set.</li>
          </ul>
        </li>
      </ul>
      <p><strong>Fin du temps imparti / mort subite :</strong></p>
      <ul>
        <li>Si temps est écoulé, le joueur ayant le pourcentage le plus bas l’emporte.</li>
        <li>Si les pourcentages sont égaux ou si la mort des deux joueurs est simultanée, un match de 1 vie et 3 minutes est joué avec les mêmes personnages sur le même stage.</li>
        <li>Si les pourcentages sont égaux ou si la mort des deux joueurs est simultanée lors du rematch, le vainqueur sera désigné par mort subite.</li>
        <li>Si un match est terminé par une attaque suicide (Bowsercide, Ganoncide, etc.), il est remporté par le gagnant affiché par l’écran de résultats.</li>
      </ul>

      <p><strong>Interruption du match :</strong></p>
      <ul>
        <li>Si un match est interrompu par un aléa extérieur, le match sera rejoué entièrement. (Ou partiellement en fonction des décisions des organisateurs). </li>
        <li>En cas d'interruption causée par un joueur, les organisateurs se réservent le droit de prendre une décision adaptée.</li>
      </ul>
      <h2>Format du tournoi</h2>
      <p>Il y a 64 joueurs au total.</p>
      <h3>1ère phase : PHASE DE POULE</h3>
      <p>64 joueurs répartis aléatoirement sur 16 poules Round Robin de 4 joueurs. Les matchs se déroulent en une partie. (BO1)</p>
      <p>Les deux premiers joueurs de chaque poules passent à la phase suivante.</p>
      <p>Les deux derniers joueurs de chaque poules, sont éliminés du tournoi.</p>
      <h3>2ème phase : ARBRE DOUBLE ÉLIMINATION :</h3>
      <p>32 joueurs répartis sur un arbre double élimination. Tous les joueurs qualifiées à cette phase commencent en Winners Bracket.</p>

      <p>16èmes et 8èmes (Winners) :</p>
      <ul>
        <li>Match en 2 manches gagnantes (BO3)</li>
        <li>Le choix des stages s'effectue comme en poules.</li>
      </ul>
      <p>Quarts de finales et demi-finales (Winners) :</p>
      <ul>
        <li>Match en 2 manches gagnantes (BO3).</li>
        <li>Le choix des stages s'effectue selon les règles citées dans la section "Déroulement d'un match" (Striking)</li>
      </ul>
      <p>Round 1 à 4 (Losers) :</p>
      <ul>
        <li>Match en une partie (BO1)</li>
        <li>Le choix des stages s'effectue comme en poules.</li>
      </ul>
      <p>Round 5 (Losers) jusqu'aux demi-finales (Losers) :</p>
      <ul>
        <li>Match en 2 manches gagnantes (BO3).</li>
        <li>Le choix des stages s'effectue selon les règles citées dans la section "Déroulement d'un match" (Striking)</li>
      </ul>
      <p>Winners Finals, Losers Finals et Grand Finals :</p>
      <ul>
        <li>Match en 3 manches gagnantes (BO5)</li>
        <li>Le choix des stages s'effectue selon les règles citées dans la section "Déroulement d'un match" (Striking)</li>
      </ul>
      <p>En cas de victoire du finaliste qui provient du Losers' Bracket, le BO5 est rejoué. (Première défaite de l'autre finaliste)</p>

      <p><strong>Matériel :</strong> <strong>4 consoles sont mises à disposition des joueurs. Il est vivement conseillé de ramener sa manette.</strong>
      Pour des soucis des connectivité, il est préférable de ramener une manette filaire comme la manette de GameCube mais les manettes sans-fil compatibles avec la Nintendo Switch seront tolérées.
      Sinon des manettes de Gamecube sont disponibles en prêt gratuit.</p>

      <h2>Règles de bonne conduite</h2>
      <p>Tous les participants sont invités à se comporter de façon respectueuse envers les autres participants. Un joueur peut être réprimandée et recevoir un avertissement si :</p>
      <ul>
        <li>Utilise un langage et des gestes insultants ;</li>
        <li>Est coupable d’actes violents ;</li>
        <li>Arrive en retard à l’heure de convocation ;</li>
        <li>Laisse intentionnellement un adversaire remporter le match.</li>
      </ul>

      <p>Un manquement à ces règles pourra entraîner <strong>un avertissement, la perte d'une partie ou d'un match ou encore la disqualification du joueur.</strong> </p>

      <h2>Finales sur scène</h2>
      <p>Cette année, les finalistes auront l'occasion de pouvoir jouer les finales sur la scène de l'événement, devant le public du festival.
      C'est une occasion unique de pouvoir montrer son skill devant tout le monde, mais quelques règles s'imposent.</p>
      <h3>Obligation</h3>
      <p>Jouer sur scène est <strong>obligatoire</strong>, tout refus entraînera la disqualification du joueur.</p>
      <p><strong>Tout retard de plus de 20 minutes dû à un joueur qui prendra trop de temps à s'installer entraînera le forfait automatique d'une partie.</strong></p>
    </div>

    )
  }
}