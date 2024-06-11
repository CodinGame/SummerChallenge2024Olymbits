<!-- LEAGUES level1 level2 level3 -->
<div id="statement_back" class="statement_back" style="display: none"></div>
<div class="statement-body">
  <!-- BEGIN level1 level2 -->
  <!-- LEAGUE ALERT -->
  <div style="color: #7cc576; 
    background-color: rgba(124, 197, 118,.1);
    padding: 20px;
    margin-right: 15px;
    margin-left: 15px;
    margin-bottom: 10px;
    text-align: left;">
    <div style="text-align: center; margin-bottom: 6px">
      <img src="//cdn.codingame.com/smash-the-code/statement/league_wood_04.png" />
    </div>
    <p style="text-align: center; font-weight: 700; margin-bottom: 6px;">
      Ce challenge est basé sur un système de <b>leagues</b>.
    </p>
    <div class="statement-league-alert-content">
      Pour ce challenge, plusieurs ligues pour le même jeu seront disponibles. Quand vous aurez prouvé votre valeur
      contre le premier Boss, vous accéderez à la ligue supérieure et débloquerez de nouveaux adversaires.
      <br><br>
            <b>NOUVEAU:</b> En ligue bois, votre bot se battera uniquement avec le Boss une fois dans l'arène. Gagnez plus souvent que lui pour avancer.
    </div>
  </div>
  <!-- END -->
  <!-- GOAL -->
  <div class="statement-section statement-goal">
    <h2 style="font-size: 20px;">
      <span class="icon icon-goal">&nbsp;</span>
      <span>Objectif</span>
    </h2>
    Terminez le jeu avec un <b>score</b> plus élevé que votre adversaire.
    <!-- BEGIN level2 level3 -->
    <p>Trois joueurs s'affrontent dans les <b>olympiades de l'arcade</b>.</p>
    Chaque joueur contrôle un agent dans <b>quatre</b> mini-jeux <b>simultanément</b>. Gagnez un maximum de <b>médailles</b> dans les quatre jeux pour obtenir le score le plus élevé.
    <!-- END -->
  </div>
  <!-- RULES -->
  <div class="statement-section statement-rules">
    <h2 style="font-size: 20px;">
      <span class="icon icon-rules">&nbsp;</span>
      <span>Règles</span>
    </h2>
    <div class="statement-rules-content">
      <!-- BEGIN level1 -->
      Jouez plusieurs parties du <b>mini-jeu de la course de haies</b> contre deux autres joueurs.
      <br>
      Pour jouer, écrivez sur la sortie standard soit 
      <action>LEFT</action>, 
      <action>DOWN</action>, 
      <action>RIGHT</action>, 
      <action>UP</action> à chaque tour.

 <div class="statement-example-container">

					<div class="statement-example statement-example-small">
						<img src="https://static.codingame.com/servlet/fileservlet?id=124844809885360" />
						<div class="legend">
							<div class="description">
								 <action>LEFT</action>&nbsp;: avancer d'<const>1</const> case.
							</div>
						</div>
					</div>
                    <div class="statement-example statement-example-small">
						<img src="https://static.codingame.com/servlet/fileservlet?id=124844827843502" />
						<div class="legend">
							<div class="description">
<action>DOWN</action>&nbsp;: avancer de <const>2</const> cases.
							</div>
						</div>
					</div>
                    <div class="statement-example statement-example-small">
						<img src="https://static.codingame.com/servlet/fileservlet?id=124844865074081" />
						<div class="legend">
							<div class="description">
 <action>RIGHT</action>&nbsp;: avancer de <const>3</const>cases.
							</div>
						</div>
					</div>
					<div class="statement-example statement-example-small">
						<img src="https://static.codingame.com/servlet/fileservlet?id=124844849560684" />
						<div class="legend">
							<div class="description">
							<action>UP</action>&nbsp;: sauter par-dessus une case pour passer une haie, en avançant de 
          <const>2</const>
          cases au total.
							</div>
						</div>
					</div>
				</div>

      <br>

      <p>
        Si vous heurtez un obstacle sans sauter par-dessus, votre agent sera <b>étourdi</b> <const>3</const> tours et ne pourra plus avancer.
      </p>
      <br>
      <p>
        La piste de course fait 
        <const>30</const>
        cases de long, les agents commencent sur la case <const>0</const>. Lorsqu'un agent atteint la dernière case, la course se termine. Deux choses se produiront alors&nbsp;:
      <ul>
        <li>Selon la position dans la course de leur agent, chaque joueur reçoit une médaille <b>d'or</b>, <b>d'argent</b> ou <b>de bronze</b>.</li>
        <li>Le mini-jeu <b>se réinitialise</b>, ce qui signifie que pendant un tour, toutes les entrées sont ignorées.</li>
      </ul>
      </p>
      <p>
        Après 
        <const>100</const>
        tours, votre <b>score global</b> est
        <const>nb_medailles_or * 3 + nb_medailles_argent</const>.
        <br><br>
      <p>Le mini-jeu fonctionne sur une <b>vieille console de jeu</b>. Votre programme recevra en entrée les <const>8</const> <b>registres</b> utilisés en interne par la console&nbsp;: <var>GPU</var>, contenant une chaîne de caractères, et <var>reg0</var> à <var>reg6</var> contenant des entiers. Ce que ces valeurs représentent est spécifique au jeu en cours. <br><br>Dans ce cas&nbsp;:</p>
      <!-- END -->
      <!-- BEGIN level2 level3 -->
      <p>
        Chaque joueur est connecté à <b>quatre</b> console de jeux différentes, et chacune de ces consoles exécute
        <!-- BEGIN level2 -->
        le <b>mini-jeu de la course de haies</b>.
        <!-- END -->
        <!-- BEGIN level3 -->
        un <b>mini-jeu</b> différent.
        <!-- END -->
        Votre code peut lire les 8 <b>registres</b> utilisés en interne par les consoles&nbsp;: <var>GPU</var>, contenant une chaîne de caractères, et <var>reg0</var> à <var>reg6</var> contenant des entiers. Ce que ces valeurs représentent est différent pour chaque jeu.
      </p>
      <p>
        Le jeu se joue en tours. À chaque tour, les trois joueurs effectuent l'une des quatre actions possibles&nbsp;: 
        <action>UP</action>
        ,
        <action>DOWN</action>
        , 
        <action>LEFT</action>
        ou 
        <action>RIGHT</action>
        .
      </p>
      <p>Lorsqu'une action est effectuée par un joueur, son agent dans <b>chaque</b> mini-jeu effectue la même action, car leur manette a été connectée aux 4 machines en même temps.</p>
      <h3 style="font-size: 16px;
        font-weight: 700;
        padding-top: 20px;
        color: #838891;
        padding-bottom: 15px;">
        Gagner des médailles
      </h3>
      <p>Les quatre mini-jeux se jouent en boucle tout au long du jeu. À chaque manche d'un mini-jeu, vous pouvez obtenir une médaille d'or, d'argent ou de bronze.
        Entre les manches, il y a un tour de <b>réinitialisation</b> où le mini-jeu est inactif.
      </p>
      <p>À la fin du jeu, le score de chaque joueur pour chaque mini-jeu est calculé en fonction du nombre total de médailles gagnées, avec cette formule&nbsp;:</p>
      <p>
        <const>score_mini_jeu = nb_medailles_argent + nb_medailles_or * 3</const>
      </p>
      <p>
        Les scores des <b>quatre</b> mini-jeux sont <b>multipliés ensemble</b> pour déterminer le <b>score global</b>.
      </p>
      <p>
        Pendant un tour de réinitialisation, le registre <var>GPU</var> affichera 
        <const>"GAME_OVER"</const>
        .
      </p>
      <p>
        En cas d'égalité dans un mini-jeu, les joueurs ex æquo remporteront la même médaille la plus haute. Par exemple, si deux joueurs sont à égalité pour la première place, ils recevront tous les deux une médaille d'or et le troisième joueur recevra une médaille <b>de bronze</b>.
      </p>
      <h3 style="font-size: 16px;
        font-weight: 700;
        padding-top: 20px;
        color: #838891;
        padding-bottom: 15px;">
        Mini-jeu 1&nbsp;: Course de Haies
      </h3>
      <p>Ce mini-jeu est une course entre les trois agents.
        Chaque agent est sur la même piste de course générée aléatoirement.
      </p>
      <p>
        La piste de course est composée de <b>30 cases</b>, les agents commencent sur la première case, et la dernière case est la ligne d'arrivée.
        Une case peut contenir une <b>haie</b> que les agents doivent <b>sauter</b> sinon ils <b>heurteront</b> celle-ci et seront <b>étourdis</b> pour les 
        <const>3</const>
        prochains tours. Un agent étourdi ne bougera pas quelle que soit l'action effectuée.
      </p>
      <p>À chaque tour, les agents peuvent effectuer l'une des actions suivantes&nbsp;:
      <ul>
        <li>
          <action>UP</action>
         &nbsp;: sauter par-dessus une case, en ignorant toute haie sur la case suivante et en avançant de 
          <const>2</const>
          cases au total.
        </li>
        <li>
          <action>LEFT</action>: avancer d'<const>1</const> case.
        </li>
        <li>
          <action>DOWN</action>&nbsp;: avancer de <const>2</const> cases.
        </li>
        <li>
          <action>RIGHT</action>&nbsp;: avancer de <const>3</const>cases.
        </li>
      </ul>
      </p>
      <p>Heurter une haie interrompra le mouvement de l'agent, l'arrêtant sur la même case que la haie.</p>
      <p>
        Lorsque l'un des agents atteint la <b>ligne d'arrivée</b>, la manche se termine. Les joueurs reçoivent une médaille en fonction de la position dans la course de leur agent, et la manche suivante commence après un tour de <b>réinitialisation</b>.
      </p>
      <!-- END -->
      <table style="margin-top: 20px; margin-bottom: 30px">
        <thead>
          <tr>
            <th style="text-align: center; padding: 5px; outline: 1px solid #838891;">Registre</th>
            <th style="text-align: center; padding: 5px; outline: 1px solid #838891;">Description</th>
            <th style="text-align: center; padding: 5px; outline: 1px solid #838891;">Exemple</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">GPU</td>
            <td style="padding: 5px; outline: 1px solid #838891;">
              Représentation ASCII de la piste de course. 
              <const>.</const>
              pour un espace vide. 
              <const>#</const>
              pour une haie.
            </td>
            <td style="padding: 5px; outline: 1px solid #838891;">
              <const>.....#...#...#................</const>
            </td>
          </tr>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">reg0</td>
            <td style="padding: 5px; outline: 1px solid #838891;">position de l'agent du joueur 1</td>
            <td style="padding: 5px; outline: 1px solid #838891;"> 0 </td>
          </tr>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">reg1</td>
            <td style="padding: 5px; outline: 1px solid #838891;">position de l'agent du joueur 2</td>
            <td style="padding: 5px; outline: 1px solid #838891;"> 6 </td>
          </tr>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">reg2</td>
            <td style="padding: 5px; outline: 1px solid #838891;">position de l'agent du joueur 3</td>
            <td style="padding: 5px; outline: 1px solid #838891;"> 12 </td>
          </tr>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">reg3</td>
            <td style="padding: 5px; outline: 1px solid #838891;">décompte  d'étourdissement pour le joueur 1</td>
            <td style="padding: 5px; outline: 1px solid #838891;"> 1 </td>
          </tr>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">reg4</td>
            <td style="padding: 5px; outline: 1px solid #838891;">décompte d'étourdissement pour le joueur 2</td>
            <td style="padding: 5px; outline: 1px solid #838891;"> 0 </td>
          </tr>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">reg5</td>
            <td style="padding: 5px; outline: 1px solid #838891;">décompte d'étourdissement pour le joueur 3</td>
            <td style="padding: 5px; outline: 1px solid #838891;"> 2 </td>
          </tr>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">reg6</td>
            <td style="padding: 5px; outline: 1px solid #838891;"><em>non utilisé</em></td>
            <td style="padding: 5px; outline: 1px solid #838891;"> </td>
          </tr>
        </tbody>
      </table>
      <p>
        Le <b>décompte d'étourdissement</b> est le nombre de tours restants en étant étourdi (<const>3</const>
        , puis 
        <const>2</const>
        , puis 
        <const>1</const>). 
        <const>0</const>
        signifie que l'agent n'est pas étourdi.
      </p>
      <!-- BEGIN level1 -->
      <p>
        Pendant un tour de <b>réinitialisation</b>, le registre <var>GPU</var> affichera 
        <const>"GAME_OVER"</const>.
      </p>
      <!-- END -->
      <!-- BEGIN level3 -->
      <h3 style="font-size: 16px;
        font-weight: 700;
        padding-top: 20px;
        color: #838891;
        padding-bottom: 15px;">
        Mini-jeu 2&nbsp;: Tir à l'arc
      </h3>
      Chaque joueur contrôle un curseur avec une coordonnée x et une coordonnée y. À chaque tour, les joueurs choisissent une direction, puis le curseur se déplace dans cette direction selon la force actuelle du <b>vent</b>. Après 
      <const>10</const>
      tours, les joueurs remportent des médailles en fonction de leur proximité avec la coordonnée 
      <const>(0,0)</const>
      en distance euclidienne.
      <table style="margin-top: 20px; margin-bottom: 30px">
        <thead>
          <tr>
            <th style="text-align: center; padding: 5px; outline: 1px solid #838891;">Registre</th>
            <th style="text-align: center; padding: 5px; outline: 1px solid #838891;">Description</th>
            <th style="text-align: center; padding: 5px; outline: 1px solid #838891;">Exemple</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">GPU</td>
            <td style="padding: 5px; outline: 1px solid #838891;">
              Une série d'entiers, indiquant la puissance du vent pour les tours à venir. L'entier à l'index 
              <const>0</const>
              est la force du vent actuelle.
            </td>
            <td style="padding: 5px; outline: 1px solid #838891;">
              <const>9914113315261</const>
            </td>
          </tr>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">reg0</td>
            <td style="padding: 5px;outline: 1px solid #838891;">Coordonnée x pour le joueur 1</td>
            <td style="padding: 5px; outline: 1px solid #838891;"> 0 </td>
          </tr>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">reg1</td>
            <td style="padding: 5px;outline: 1px solid #838891;">Coordonnée y pour le joueur 1</td>
            <td style="padding: 5px; outline: 1px solid #838891;"> -10 </td>
          </tr>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">reg2</td>
            <td style="padding: 5px;outline: 1px solid #838891;">Coordonnée x pour le joueur 2</td>
            <td style="padding: 5px; outline: 1px solid #838891;"> 5 </td>
          </tr>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">reg3</td>
            <td style="padding: 5px;outline: 1px solid #838891;">Coordonnée y pour le joueur 2</td>
            <td style="padding: 5px; outline: 1px solid #838891;"> 8 </td>
          </tr>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">reg4</td>
            <td style="padding: 5px;outline: 1px solid #838891;">Coordonnée x pour le joueur 3</td>
            <td style="padding: 5px; outline: 1px solid #838891;"> -2 </td>
          </tr>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">reg5</td>
            <td style="padding: 5px;outline: 1px solid #838891;">Coordonnée y pour le joueur 3</td>
            <td style="padding: 5px; outline: 1px solid #838891;"> 20 </td>
          </tr>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">reg6</td>
            <td style="padding: 5px;outline: 1px solid #838891;"><em>inutilisé</em></td>
            <td style="padding: 5px; outline: 1px solid #838891;"> </td>
          </tr>
        </tbody>
      </table>
      <h3 style="font-size: 16px;
        font-weight: 700;
        padding-top: 20px;
        color: #838891;
        padding-bottom: 15px;">
        Mini-jeu 3&nbsp;: Roller de vitesse
      </h3>
      <p>
        Les joueurs courent sur une piste cyclique longue de 
        <const>10</const>
        cases. Chaque joueur aura un attribut de <var>risk</var> allant de <const>0</const> à <const>5</const>.
      </p>
      <p>
        À chaque tour, une liste des <const>4</const> actions sera fournie dans un ordre aléatoire dans le <var>GPU</var>, par exemple 
        <const>ULDR</const> (pour <const>UP</const>,<const>LEFT</const>,<const>DOWN</const>,<const>RIGHT</const>), cela s'appelle l'<b>ordre de risque</b>.
        Effectuer l'action à un indice plus élevé déplacera le joueur vers l'avant sur plus de cases. Mais choisir le mouvement le plus rapide n'est pas sans risque... 
      </p>
      <ul>
        <li>
          L'action à l'index 
          <const>0</const>
          déplacera votre joueur d'une case et <b>diminuera</b> votre <var>risk</var> de 
          <const>1</const>
        </li>
        <li>
          L'action à l'index 
          <const>1</const>
          déplacera votre joueur de 
          <const>2</const> cases
        </li>
        <li>
          L'action à l'index 
          <const>2</const>
          déplacera votre joueur de 
          <const>2</const>
          cases mais augmentera votre <var>risk</var> de 
          <const>1</const>
        </li>
        <li>
          L'action à l'index 
          <const>3</const>
          déplacera votre joueur de 
          <const>3</const>
          cases mais augmentera votre <var>risk</var> de 
          <const>2</const>
        </li>
      </ul>
      <p>
        De plus, si après un mouvement un joueur se retrouve sur le même espace qu'un adversaire, leur <var>risk</var> à tous les deux est augmenté de <const>2</const> !
        Si le risque d'un joueur atteint 
        <const>5</const>
        ou plus, le joueur est <b>étourdi</b> pour les 
        <const>3</const>
        prochains tours et son <var>risk</var> est réinitialisé à 
        <const>0</const>.
      </p>
      <table style="margin-top: 20px; margin-bottom: 30px">
        <thead>
          <tr>
            <th style="text-align: center; padding: 5px; outline: 1px solid #838891;">Registre</th>
            <th style="text-align: center; padding: 5px; outline: 1px solid #838891;">Description</th>
            <th style="text-align: center; padding: 5px; outline: 1px solid #838891;">Exemple</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">GPU</td>
            <td style="padding: 5px; outline: 1px solid #838891;">Ordre de risque pour ce tour</td>
            <td style="padding: 5px; outline: 1px solid #838891;">
              <const>URLD</const>
            </td>
          </tr>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">reg0</td>
            <td style="padding: 5px; outline: 1px solid #838891;">cases parcourues par le joueur 1</td>
            <td style="padding: 5px; outline: 1px solid #838891;"> 2 </td>
          </tr>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">reg1</td>
            <td style="padding: 5px; outline: 1px solid #838891;">cases parcourues par le joueur 2</td>
            <td style="padding: 5px; outline: 1px solid #838891;"> 9 </td>
          </tr>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">reg2</td>
            <td style="padding: 5px; outline: 1px solid #838891;">cases parcourues par le joueur 3</td>
            <td style="padding: 5px; outline: 1px solid #838891;"> 21 </td>
          </tr>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">reg3</td>
            <td style="padding: 5px;outline: 1px solid #838891;">risque du joueur 1 ou décompte d'étourdissement en nombre négatif s'il est étourdi</td>
            <td style="padding: 5px; outline: 1px solid #838891;"> 4 </td>
          </tr>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">reg4</td>
            <td style="padding: 5px;outline: 1px solid #838891;">risque du joueur 2 ou décompte d'étourdissement en nombre négatif s'il est étourdi</td>
            <td style="padding: 5px; outline: 1px solid #838891;"> -1 </td>
          </tr>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">reg5</td>
            <td style="padding: 5px;outline: 1px solid #838891;">risque du joueur 3 ou décompte d'étourdissement en nombre négatif s'il est étourdi</td>
            <td style="padding: 5px; outline: 1px solid #838891;"> 0 </td>
          </tr>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">reg6</td>
            <td style="padding: 5px;outline: 1px solid #838891;">tours restants</td>
            <td style="padding: 5px; outline: 1px solid #838891;"> 14 </td>
          </tr>
        </tbody>
      </table>
      Vous pouvez déterminer si deux joueurs partagent une case en comparant leurs <const>cases parcourues modulo 10</const>
<br><br>

      <h3 style="font-size: 16px;
        font-weight: 700;
        padding-top: 20px;
        color: #838891;
        padding-bottom: 15px;">
        Mini-jeu 4&nbsp;: Plongée artistique
      </h3>
      <p>
        Les joueurs doivent réaliser une série de figures correspondante à la séquence de directions donnée au début de chaque partie.
        On appele cette série l'<b>objectif</b>.
      </p>
      <p>
        À chaque tour où l'action d'un joueur correspond à la direction de l'objectif de ce tour, le joueur gagnera des points égaux à leur <b>multiplicateur de combo</b> actuel. Le multiplicateur de combo commence à 
        <const>1</const>
        et augmente de 
        <const>1</const>
        pour chaque tour consécutif où l'action du joueur correspond à l'objectif. Il <b>se réinitialise</b> à 
        <const>1</const>
        lorsque l'action du joueur ne correspond pas à l'objectif.
      </p>
      <table style="margin-top: 20px; margin-bottom: 30px">
        <thead>
          <tr>
            <th style="text-align: center; padding: 5px; outline: 1px solid #838891;">Registre</th>
            <th style="text-align: center; padding: 5px; outline: 1px solid #838891;">Description</th>
            <th style="text-align: center; padding: 5px; outline: 1px solid #838891;">Exemple</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">GPU</td>
            <td style="padding: 5px;outline: 1px solid #838891;">Objectif de plongée de cette partie</td>
            <td style="padding: 5px; outline: 1px solid #838891;">
              <const>UUUDDLLLULDRLL</const>
            </td>
          </tr>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">reg0</td>
            <td style="padding: 5px;outline: 1px solid #838891;">points du joueur 1</td>
            <td style="padding: 5px; outline: 1px solid #838891;"> 7 </td>
          </tr>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">reg1</td>
            <td style="padding: 5px;outline: 1px solid #838891;">points du joueur 2</td>
            <td style="padding: 5px; outline: 1px solid #838891;"> 4 </td>
          </tr>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">reg2</td>
            <td style="padding: 5px;outline: 1px solid #838891;">points du joueur 3</td>
            <td style="padding: 5px; outline: 1px solid #838891;"> 0 </td>
          </tr>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">reg3</td>
            <td style="padding: 5px;outline: 1px solid #838891;">combo du joueur 1</td>
            <td style="padding: 5px; outline: 1px solid #838891;"> 1 </td>
          </tr>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">reg4</td>
            <td style="padding: 5px;outline: 1px solid #838891;">combo du joueur 2</td>
            <td style="padding: 5px; outline: 1px solid #838891;"> 0 </td>
          </tr>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">reg5</td>
            <td style="padding: 5px;outline: 1px solid #838891;">combo du joueur 3</td>
            <td style="padding: 5px; outline: 1px solid #838891;"> 9 </td>
          </tr>
          <tr>
            <td style="padding: 5px; outline: 1px solid #838891;">reg6</td>
            <td style="padding: 5px;outline: 1px solid #838891;"><em>inutilisé</em></td>
            <td style="padding: 5px; outline: 1px solid #838891;">  </td>
          </tr>
        </tbody>
      </table>
      <!-- END -->
      <!-- Conditions de victoire -->
      <div class="statement-victory-conditions">
        <div class="icon victory"></div>
        <div class="blk">
          <div class="title">Condition de victoire</div>
          <div class="text">
            Vous avez un <b>score global</b> plus élevé après 
            <const>100</const>
            tours.
          </div>
        </div>
      </div>
      <!-- Conditions de défaite -->
      <div class="statement-lose-conditions">
        <div class="icon lose"></div>
        <div class="blk">
          <div class="title">Condition de défaite</div>
          <div class="text">
              Votre programme ne fournit pas une commande dans le temps imparti ou fournit une commande non reconnue.
          </div>
        </div>
      </div>
    </div>
    <br>
    <h3 style="font-size: 16px;
      font-weight: 700;
      padding-top: 20px;
      color: #838891;
      padding-bottom: 15px;">
      🐞 Conseils de débogage
    </h3>
    <ul>
      <!--
        <li>Passez le curseur sur une tuile pour voir des informations supplémentaires à son sujet, y compris la
            <var>force</var> du balise.
        </li>
        
        <li>Utilisez la commande <action>MESSAGE</action> pour afficher un texte sur votre côté de l'interface
            utilisateur.
        </li>
        -->
      <li>Appuyez sur l'icône d'engrenage sur le visualiseur pour accéder à des options d'affichage
        supplémentaires.
      </li>
      <li>Utilisez le clavier pour contrôler l'action&nbsp;: espace pour jouer/pause, flèches pour avancer d'une
        trame à la fois.
      </li>
    </ul>
    <br>
  </div>
  <!-- PROTOCOL -->
  <div class="statement-section statement-protocol">
    <h2 style="font-size: 20px;">
      <span class="icon icon-protocol">&nbsp;</span>
      <span>Protocole de Jeu</span>
    </h2>
    <!-- Protocol block -->
    <div class="blk">
      <div class="title">Entrées d'Initialisation</div>
      <span class="statement-lineno">Première ligne&nbsp;:</span> <var>playerIdx</var> un entier pour indiquer quel agent vous contrôlez dans les mini-jeux.<br>
      <span class="statement-lineno">Ligne suivante&nbsp;:</span>
      le nombre de mini-jeux fonctionnant simultanément. Pour cette ligue, c'est 
      <!-- BEGIN level1 -->
      <const>1</const>
      .
      <!-- END -->
      <!-- BEGIN level2 level3 -->
      <const>4</const>
      .
      <!-- END -->
    </div>
    <div class="blk">
      <div class="title">Entrées pour Un Tour de Jeu</div>
      <span class="statement-lineno">
        Les 
        <const>3</const>
        premières lignes&nbsp;:
      </span>
      une ligne par joueur, ordonnée par <var>playerIdx</var>. Une chaîne de caractères <var>scoreInfo</var> contenant une répartition du score global de chaque joueur. 
      <!-- BEGIN level1 -->
      Dans cette ligue, elle contient 
      <const>4</const>
      entiers.
      <!-- END -->
      <!-- BEGIN level2 level3 -->
      Elle contient 
      <const>10</const>
      entiers.
      <!-- END -->
      Le premier entier représentant le <b>score global</b> actuel du joueur suivi
      <!-- BEGIN level1 -->
      par&nbsp;:
      <!-- END -->
      <!-- BEGIN level2 level3 -->
      par trois entiers par mini-jeu&nbsp;: 
      <!-- END -->
      <var>nb_medailles_or</var>, <var>nb_medailles_argent</var>, <var>nb_medailles_bronze</var>.<br><br>
      <span class="statement-lineno">Les <var>nbGames</var> lignes suivantes&nbsp;:</span> une ligne pour chaque mini-jeu, contenant les huit registres séparés par des espaces&nbsp;:
      <ul>
        <li><var>gpu</var> une chaîne de caractères</li>
        <li><var>reg0</var> un entier</li>
        <li><var>reg1</var> un entier</li>
        <li><var>reg2</var> un entier</li>
        <li><var>reg3</var> un entier</li>
        <li><var>reg4</var> un entier</li>
        <li><var>reg5</var> un entier</li>
        <li><var>reg6</var> un entier</li>
      </ul>
      <!-- BEGIN level3 -->
      Leurs valeurs dépendront du jeu. 
      <!-- END -->
      Les registres non utilisés seront toujours 
      <const>-1</const>.
    </div>
    <div class="blk">
      <div class="title">Sortie</div>
      <div class="text">
        L'une des chaînes suivantes&nbsp;:
        <ul>
          <li>
            <action>UP</action>
          </li>
          <li>
            <action>RIGHT</action>
          </li>
          <li>
            <action>DOWN</action>
          </li>
          <li>
            <action>LEFT</action>
          </li>
        </ul>
        <!-- BEGIN level3 -->
        L'effet dépendra du jeu.
        <!-- END -->
      </div>
    </div>
    <div class="blk">
      <div class="title">Contraintes</div>
      <div class="text">
        <const>0</const> ≤ <var>playerIdx</var> ≤ <const>2</const>
        <br>
        <const>1</const> ≤ <var>nbGames</var> ≤ <const>4</const>
        <em>(dans toutes les ligues)</em><br>
        <br>
        Temps de réponse par tour ≤ <const>50</const>ms<br>
        Temps de réponse pour le premier tour ≤ <const>1000</const>ms
      </div>
    </div>
  </div>
  <!-- LEAGUE ALERT -->
  <!-- BEGIN level1 level2 -->
  <div style="color: #7cc576; 
    background-color: rgba(124, 197, 118,.1);
    padding: 20px;
    margin-top: 10px;
    text-align: left;">
    <div style="text-align: center; margin-bottom: 6px"><img
      src="//cdn.codingame.com/smash-the-code/statement/league_wood_04.png" /></div>
    <div style="text-align: center; font-weight: 700; margin-bottom: 6px;">
      Qu'est-ce qui m'attend dans les ligues suivantes ?
    </div>
    <ul>
      <!-- BEGIN level1 -->
      <li>4 mini-jeux de course de haies seront joués simultanément</li>
      <!-- END -->
      <li>4 mini-jeux totalement différents seront joués simultanément !</li>
    </ul>
  </div>
  <!-- END -->

    <!-- STORY -->
    <div class="statement-story-background">
        <div class="statement-story-cover"
            style="background-size: cover; background-image: url(/servlet/fileservlet?id=103881564349131)">
            <div class="statement-story" style="min-height: 300px; position: relative">
                <h2><span style="color: #b3b9ad">Code source</span></h2>
                <div class="story-text">
                    <p>Vous pouvez voir le code source de ce jeu sur <a rel="nofollow" style="color: #f2bb13; border-bottom: 1px dotted #f2bb13;" target="_blank"
                    href="https://github.com/CGjupoulton/SummerChallenge2024Olymbits">ce repo GitHub</a>.</p>
                </div>
            </div>
        </div>
    </div>

</div>
<!-- SHOW_SAVE_PDF_BUTTON -->