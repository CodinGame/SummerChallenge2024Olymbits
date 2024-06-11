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
            This is a <b>league based</b> challenge.
        </p>
        <div class="statement-league-alert-content">
            For this challenge, multiple leagues for the same game are available. Once you have proven yourself
            against the
            first Boss, you will access a higher league and harder opponents will be available.<br><br>
            <b>NEW:</b> In wood leagues, your submission will only fight the boss in the arena. Win a best-of-five to advance.
            <br>
        </div>
    </div>
    <!-- END -->


    <!-- GOAL -->
    <div class="statement-section statement-goal">
        <h2 style="font-size: 20px;">
            <span class="icon icon-goal">&nbsp;</span>
            <span>Goal</span>
        </h2>
        End the game with a higher <b>score</b> than your opponent.
        
<!-- BEGIN level2 level3 -->

        <p>Three players are pitted against one another in the <b>arcade olympics</b>.</p> Each player controls a character in <b>four</b> mini-games <b>simultaneously</b>. Earn a maximum of <b>medals</b> in all four games to acquire the highest <b>score</b>.

<!-- END -->


    </div>



    <!-- RULES -->
    <div class="statement-section statement-rules">
        <h2 style="font-size: 20px;">
            <span class="icon icon-rules">&nbsp;</span>
            <span>Rules</span>
        </h2>
        <div class="statement-rules-content">

            <!-- BEGIN level1 -->
        Play multiple runs of the <b>Hurdle Race mini-game</b> against two other players.
        <br>
        To play, print either <action>LEFT</action>, <action>DOWN</action>, <action>RIGHT</action>, <action>UP</action> on each turn.

        <div class="statement-example-container">

					<div class="statement-example statement-example-small">
						<img src="https://static.codingame.com/servlet/fileservlet?id=124844809885360" />
						<div class="legend">
							<div class="description">
								<action>LEFT</action>: move forward by <const>1</const> space.
							</div>
						</div>
					</div>
                    <div class="statement-example statement-example-small">
						<img src="https://static.codingame.com/servlet/fileservlet?id=124844827843502" />
						<div class="legend">
							<div class="description">
								<action>DOWN</action>: move forward by <const>2</const> spaces.
							</div>
						</div>
					</div>
                    <div class="statement-example statement-example-small">
						<img src="https://static.codingame.com/servlet/fileservlet?id=124844865074081" />
						<div class="legend">
							<div class="description">
								<action>RIGHT</action>: move forward by <const>3</const> spaces.
							</div>
						</div>
					</div>
					<div class="statement-example statement-example-small">
						<img src="https://static.codingame.com/servlet/fileservlet?id=124844849560684" />
						<div class="legend">
							<div class="description">
								<action>UP</action>: jump over one space, ignoring any hurdle on the next space and moving by <const>2</const> spaces total.
							</div>
						</div>
					</div>
				</div>

                <br>

<p>        Jump over hurdles or you will <b>collide</b> with them, causing your agent to be <b>stunned</b> for <const>3</const> turns.
</p>
<br>
   <p>
       The race track is <const>30</const> spaces long, players begin on space <const>0</const>. When a player reaches the end, the race ends. Two things will then occur:
       <ul>
           <li>According to their position on the race track, each player is awarded a <b>gold</b>, <b>silver</b> or <b>bronze</b> medal.</li>
           <li>The mini-game <b>resets</b>, this means that for one turn all input is ignored.</li>
           </ul> 
    </p>

    <p>After <const>100</const> turns, your <b>final score</b> is
    <const>nb_silver_medals + nb_gold_medals * 3</const>.

    <br><br>
                    <p>The mini-game is running on an <b>old arcade machine</b>. Your program will receive the <const>8</const> <b>registers</b> used internally by the machine: <var>GPU</var>, containing a string and <var>reg0</var> to <var>reg6</var> containing integers. What those values represent specific to the game being played. <br><br>In this case:</p>
        <!-- END -->

        <!-- BEGIN level2 level3 -->

                <p>Each player is hooked up to <b>four</b> different arcade machines, and each of these machines is running
                <!-- BEGIN level2 -->
                 the Hurdle Race <b>mini-game</b>.
                 <!-- END -->
                 <!-- BEGIN level3 -->
                 a different <b>mini-game</b>.
                 <!-- END -->
                  Your code can read the 8 <b>registers</b> used internally by the machines: <var>GPU</var>, containing a string and <var>reg0</var> to <var>reg6</var> containing integers. What those values represent is different for each game.</p>

                <p>The game is played in turns. On each turn, all three players perform one of four possible actions: <action>UP</action>,
                <action>DOWN</action>, <action>LEFT</action>, or <action>RIGHT</action>.</p>

                <p>When an action is performed by a player, their agent in <b>each</b> mini-game performs that same action, because the controls have been wired to all 4 machines at once.</p>
        

                <h3 style="font-size: 16px;
    font-weight: 700;
    padding-top: 20px;
    color: #838891;
    padding-bottom: 15px;">
                    Earning medals</h3>

                <p>The four mini-games play on loop throughout the game. In each run of a mini-game you may acquire a gold, silver or bronze <b>medal</b>.
                In between runs is a <b>reset</b> turn where the mini-game is inactive.</p>
                
                <p>At the end of the game, each player's score for each mini-game is calculated based on the number of medals earned in total, with this formula:</p>

                <p><const>mini_game_score = nb_silver_medals + nb_gold_medals * 3 </const></p>

                <p>
                    The scores for all <b>four</b> mini-games are <b>multiplied together</b> to determine the <b>final score</b>.
                </p>

                <p>
                    During a reset turn, the <var>GPU</var> register will show <const>"GAME_OVER"</const>.
                </p>

                <p>
                    If there are ties in a mini-game, tied players will win the same highest medal. For instance, if two players tie for first place, they will both win gold and the third player will receive <b>bronze</b>.
                </p>

                <h3 style="font-size: 16px;
    font-weight: 700;
    padding-top: 20px;
    color: #838891;
    padding-bottom: 15px;">
                    Mini-game 1: Hurdle Race</h3>

              <p>This mini-game is a race between the three agents.
                Each agent is on the same randomly generated race track.
               
                
                The racetrack is composed of <b>30 spaces</b>, agents start on the first space, and the last space is the finish line.
                A space may contain a <b>hurdle</b> which the agents must <b>jump</b> over or else they will <b>collide</b> with it and be <b>stunned</b> for the next <const>3</const> turns. A stunned agent will not move regardless of the action performed.
                </p>
                <p>On each turn, the agents can perform one of the following actions:
                    <ul>
                        <li>
                            <action>UP</action>: jump over one space, ignoring any hurdle on the next space and moving by <const>2</const> spaces total.
                        </li>
                        <li>
                            <action>LEFT</action>: move forward by <const>1</const> space.
                        </li>
                        <li>
                            <action>DOWN</action>: move forward by <const>2</const> spaces.
                        </li>
                        <li>
                            <action>RIGHT</action>: move forward by <const>3</const> spaces.
                        </li>
                    </ul>
                </p>

                <p>Moving into a hurdle will interrupt the agent's movement, stopping on the same space as the hurdle.</p>

                <p>
                    When either agent reaches the <b>finish</b>, the run ends. The players are awarded a medal based on their positions in the race, and the next run begins after a <b>reset</b> turn.
                </p>
<!-- END -->


                <table style="margin-top: 20px; margin-bottom: 30px">
                    <thead>
                        <tr>
                            <th style="text-align: center; padding: 5px; outline: 1px solid #838891;">Register</th>
                            <th style="text-align: center; padding: 5px; outline: 1px solid #838891;">Description</th>
                            <th style="text-align: center; padding: 5px; outline: 1px solid #838891;">Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 5px; outline: 1px solid #838891;">GPU</td>
                            <td style="padding: 5px; outline: 1px solid #838891;">ASCII representation of the racetrack. <const>.</const> for empty space. <const>#</const> for hurdle.</td>
                            <td style="padding: 5px; outline: 1px solid #838891;"> <const>.....#...#...#................</const> </td>
                        </tr>
                        <tr>
                            <td style="padding: 5px; outline: 1px solid #838891;">reg0</td>
                            <td style="padding: 5px; outline: 1px solid #838891;">position of player 1</td>
                            <td style="padding: 5px; outline: 1px solid #838891;"> 0 </td>
                        </tr>
                        <tr>
                            <td style="padding: 5px; outline: 1px solid #838891;">reg1</td>
                            <td style="padding: 5px; outline: 1px solid #838891;">position of player 2</td>
                            <td style="padding: 5px; outline: 1px solid #838891;"> 6 </td>
                        </tr>
                        <tr>
                            <td style="padding: 5px; outline: 1px solid #838891;">reg2</td>
                            <td style="padding: 5px; outline: 1px solid #838891;">position of player 3</td>
                            <td style="padding: 5px; outline: 1px solid #838891;"> 12 </td>
                        </tr>
                        <tr>
                            <td style="padding: 5px; outline: 1px solid #838891;">reg3</td>
                            <td style="padding: 5px; outline: 1px solid #838891;">stun timer for player 1</td>
                            <td style="padding: 5px; outline: 1px solid #838891;"> 1 </td>
                        </tr>
                        <tr>
                            <td style="padding: 5px; outline: 1px solid #838891;">reg4</td>
                            <td style="padding: 5px; outline: 1px solid #838891;">stun timer for player 2</td>
                            <td style="padding: 5px; outline: 1px solid #838891;"> 0 </td>
                        </tr>
                        <tr>
                            <td style="padding: 5px; outline: 1px solid #838891;">reg5</td>
                            <td style="padding: 5px; outline: 1px solid #838891;">stun timer for player 3</td>
                            <td style="padding: 5px; outline: 1px solid #838891;"> 2 </td>
                        </tr>
                        <tr>
                            <td style="padding: 5px; outline: 1px solid #838891;">reg6</td>
                            <td style="padding: 5px; outline: 1px solid #838891;"><em>unused</em></td>
                            <td style="padding: 5px; outline: 1px solid #838891;">  </td>
                        </tr>
                        
                    </tbody>
                </table>

                <p>The <b>stun timer</b> is the number of turns remaining of being stunned (<const>3</const>, then <const>2</const>, then <const>1</const>). <const>0</const> means the agent is not stunned.</p>

                <!-- BEGIN level1 -->
                <p>
                    During a <b>reset</b> turn, the <var>GPU</var> register will show <const>"GAME_OVER"</const>.
                </p>
                <!-- END -->
                

        <!-- BEGIN level3 -->


                <h3 style="font-size: 16px;
    font-weight: 700;
    padding-top: 20px;
    color: #838891;
    padding-bottom: 15px;">
                    Mini-game 2: Archery</h3>

                    Each player controls a cursor with an x coordinate and a y coordinate. Each turn, players pick a direction, then move their cursor in by the current <b>wind strength</b> in that direction. After <const>10</const> turns, the players win medals according to how close they are to coordinate <const>(0,0)</const> in Euclidean distance.
               
                    <table style="margin-top: 20px; margin-bottom: 30px">
                        <thead>
                            <tr>
                                <th style="text-align: center; padding: 5px; outline: 1px solid #838891;">Register</th>
                                <th style="text-align: center; padding: 5px; outline: 1px solid #838891;">Description</th>
                                <th style="text-align: center; padding: 5px; outline: 1px solid #838891;">Example</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding: 5px; outline: 1px solid #838891;">GPU</td>
                                <td style="padding: 5px; outline: 1px solid #838891;">A series of integers, indicating the power of the wind for upcoming turns. The integer at index <const>0</const> is the current wind strength.</td>
                                <td style="padding: 5px; outline: 1px solid #838891;"> <const>9914113315261</const> </td>
                            </tr>
                            <tr>
                                <td style="padding: 5px; outline: 1px solid #838891;">reg0</td>
                                <td style="padding: 5px;outline: 1px solid #838891;">x coordinate for player 1</td>
                                <td style="padding: 5px; outline: 1px solid #838891;"> 0 </td>
                            </tr>
                            <tr>
                                <td style="padding: 5px; outline: 1px solid #838891;">reg1</td>
                                <td style="padding: 5px;outline: 1px solid #838891;">y coordinate for player 1</td>
                                <td style="padding: 5px; outline: 1px solid #838891;"> -10 </td>
                            </tr>
                            <tr>
                                <td style="padding: 5px; outline: 1px solid #838891;">reg2</td>
                                <td style="padding: 5px;outline: 1px solid #838891;">x coordinate for player 2</td>
                                <td style="padding: 5px; outline: 1px solid #838891;"> 5 </td>
                            </tr>
                            <tr>
                                <td style="padding: 5px; outline: 1px solid #838891;">reg3</td>
                                <td style="padding: 5px;outline: 1px solid #838891;">y coordinate for player 2</td>
                                <td style="padding: 5px; outline: 1px solid #838891;"> 8 </td>
                            </tr>
                            <tr>
                                <td style="padding: 5px; outline: 1px solid #838891;">reg4</td>
                                <td style="padding: 5px;outline: 1px solid #838891;">x coordinate for player 3</td>
                                <td style="padding: 5px; outline: 1px solid #838891;"> -2 </td>
                            </tr>
                            <tr>
                                <td style="padding: 5px; outline: 1px solid #838891;">reg5</td>
                                <td style="padding: 5px;outline: 1px solid #838891;">y coordinate for player 3</td>
                                <td style="padding: 5px; outline: 1px solid #838891;"> 20 </td>
                            </tr>
                            <tr>
                                <td style="padding: 5px; outline: 1px solid #838891;">reg6</td>
                                <td style="padding: 5px;outline: 1px solid #838891;"><em>unused</em></td>
                                <td style="padding: 5px; outline: 1px solid #838891;"> </td>
                            </tr>
                            
    
                        </tbody>
                    </table>

                <h3 style="font-size: 16px;
    font-weight: 700;
    padding-top: 20px;
    color: #838891;
    padding-bottom: 15px;">
                    Mini-game 3: Roller Speed Skating</h3>

                    <p>Players race on a cyclical track <const>10</const> spaces long. Each player will have a <var>risk</var> attribute ranging from <const>0</const> to <const>5</const>.</p>

<p>On each turn, a list of the 4 actions will be provided in a random order in the <var>GPU</var>, e.g. <const>ULDR</const> (for <const>UP</const>,<const>LEFT</const>,<const>DOWN</const>,<const>RIGHT</const>), this is called the <b>risk order</b>. Performing the action at a higher index will move the player forward the more spaces. But choosing the fastest move is not without risk... </p>

<ul>
    <li>The action at index <const>0</const> will move your player by <const>1</const> space and <b>decrease</b> your <var>risk</var> by <const>1</const></li>
    <li>The action at index <const>1</const> will move your player by <const>2</const> spaces</li>
    <li>The action at index <const>2</const> will move your player by <const>2</const> spaces but increase your <var>risk</var> by <const>1</const></li>
    <li>The action at index <const>3</const> will move your player by <const>3</const> space but increase your <var>risk</var> by <const>2</const></li>
</ul>

<p>
    What's more, if after a move a player finds themselves on the same space as an opponent, both their <var>risk</var> is increased by <const>2</const>!
    If a player risk rises to <const>5</const> or more, the player is stunned for the next <const>3</const> turns and their <var>risk</var> is reset to <const>0</const>.
</p>


                <table style="margin-top: 20px; margin-bottom: 30px">
                    <thead>
                        <tr>
                            <th style="text-align: center; padding: 5px; outline: 1px solid #838891;">Register</th>
                            <th style="text-align: center; padding: 5px; outline: 1px solid #838891;">Description</th>
                            <th style="text-align: center; padding: 5px; outline: 1px solid #838891;">Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 5px; outline: 1px solid #838891;">GPU</td>
                            <td style="padding: 5px; outline: 1px solid #838891;">This turn's risk order</td>
                            <td style="padding: 5px; outline: 1px solid #838891;"> <const>URLD</const> </td>
                        </tr>
                        <tr>
                            <td style="padding: 5px; outline: 1px solid #838891;">reg0</td>
                            <td style="padding: 5px; outline: 1px solid #838891;">spaces travelled by player 1</td>
                            <td style="padding: 5px; outline: 1px solid #838891;"> 2 </td>
                        </tr>
                        <tr>
                            <td style="padding: 5px; outline: 1px solid #838891;">reg1</td>
                            <td style="padding: 5px; outline: 1px solid #838891;">spaces travelled by player 2</td>
                            <td style="padding: 5px; outline: 1px solid #838891;"> 9 </td>
                        </tr>
                        <tr>
                            <td style="padding: 5px; outline: 1px solid #838891;">reg2</td>
                            <td style="padding: 5px; outline: 1px solid #838891;">spaces travelled by player 3</td>
                            <td style="padding: 5px; outline: 1px solid #838891;"> 21 </td>
                        </tr>
                        <tr>
                            <td style="padding: 5px; outline: 1px solid #838891;">reg3</td>
                            <td style="padding: 5px;outline: 1px solid #838891;">risk of player 1 or stun timer as a negative number if stunned</td>
                            <td style="padding: 5px; outline: 1px solid #838891;"> 4 </td>
                        </tr>
                        <tr>
                            <td style="padding: 5px; outline: 1px solid #838891;">reg4</td>
                            <td style="padding: 5px;outline: 1px solid #838891;">risk of player 2 or stun timer as a negative number if stunned</td>
                            <td style="padding: 5px; outline: 1px solid #838891;"> -1 </td>
                        </tr>
                        <tr>
                            <td style="padding: 5px; outline: 1px solid #838891;">reg5</td>
                            <td style="padding: 5px;outline: 1px solid #838891;">risk of player 3 or stun timer as a negative number if stunned</td>
                            <td style="padding: 5px; outline: 1px solid #838891;"> 0 </td>
                        </tr>
                        <tr>
                            <td style="padding: 5px; outline: 1px solid #838891;">reg6</td>
                            <td style="padding: 5px;outline: 1px solid #838891;">turns left</td>
                            <td style="padding: 5px; outline: 1px solid #838891;"> 14 </td>
                        </tr>
                    </tbody>
                </table>

                You can determine if two players share a space by comparing their <const>spaces travelled modulo 10</const>.

                <h3 style="font-size: 16px;
    font-weight: 700;
    padding-top: 20px;
    color: #838891;
    padding-bottom: 15px;">
                    Mini-game 4: Diving</h3>

                    <p>
                        The players must match the sequence of directions given at the start of each run, called the <b>diving goal</b>.
                    </p>
                    <p>
                        Each turn where an agent's action matches this turn's diving goal direction, the player will earn points equal to their current <b>combo</b> multiplier. The combo multiplier starts at <const>1</const> and increases by <const>1</const> for each consecutive turn where the player's action matches the diving goal.
                        It also <b>resets</b> to <const>1</const> when the player's action does not match the diving goal.
                    </p>

                    <table style="margin-top: 20px; margin-bottom: 30px">
                        <thead>
                            <tr>
                                <th style="text-align: center; padding: 5px; outline: 1px solid #838891;">Register</th>
                                <th style="text-align: center; padding: 5px; outline: 1px solid #838891;">Description</th>
                                <th style="text-align: center; padding: 5px; outline: 1px solid #838891;">Example</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding: 5px; outline: 1px solid #838891;">GPU</td>
                                <td style="padding: 5px;outline: 1px solid #838891;">This run's diving goal</td>
                                <td style="padding: 5px; outline: 1px solid #838891;"> <const>UUUDDLLLULDRLL</const> </td>
                            </tr>
                            <tr>
                                <td style="padding: 5px; outline: 1px solid #838891;">reg0</td>
                                <td style="padding: 5px;outline: 1px solid #838891;">player 1 points</td>
                                <td style="padding: 5px; outline: 1px solid #838891;"> 7 </td>
                            </tr>
                            <tr>
                                <td style="padding: 5px; outline: 1px solid #838891;">reg1</td>
                                <td style="padding: 5px;outline: 1px solid #838891;">player 2 points</td>
                                <td style="padding: 5px; outline: 1px solid #838891;"> 4 </td>
                            </tr>
                            <tr>
                                <td style="padding: 5px; outline: 1px solid #838891;">reg2</td>
                                <td style="padding: 5px;outline: 1px solid #838891;">player 3 points</td>
                                <td style="padding: 5px; outline: 1px solid #838891;"> 0 </td>
                            </tr>
                            <tr>
                                <td style="padding: 5px; outline: 1px solid #838891;">reg3</td>
                                <td style="padding: 5px;outline: 1px solid #838891;">player 1 combo</td>
                                <td style="padding: 5px; outline: 1px solid #838891;"> 1 </td>
                            </tr>
                            <tr>
                                <td style="padding: 5px; outline: 1px solid #838891;">reg4</td>
                                <td style="padding: 5px;outline: 1px solid #838891;">player 2 combo</td>
                                <td style="padding: 5px; outline: 1px solid #838891;"> 0 </td>
                            </tr>
                            <tr>
                                <td style="padding: 5px; outline: 1px solid #838891;">reg5</td>
                                <td style="padding: 5px;outline: 1px solid #838891;">player 3 combo</td>
                                <td style="padding: 5px; outline: 1px solid #838891;"> 9 </td>
                            </tr>
                            <tr>
                                <td style="padding: 5px; outline: 1px solid #838891;">reg6</td>
                                <td style="padding: 5px;outline: 1px solid #838891;"><em>unused</em></td>
                                <td style="padding: 5px; outline: 1px solid #838891;">  </td>
                            </tr>
    
                        </tbody>
                    </table>

<!-- END -->
 
                <!-- Victory conditions -->
                <div class="statement-victory-conditions">
                    <div class="icon victory"></div>
                    <div class="blk">
                        <div class="title">Victory Condition</div>
                        <div class="text">
                            You have a higher <b>final score</b> after <const>100</const> turns.
                        </div>
                    </div>
                </div>
                
                <!-- Lose conditions -->
                <div class="statement-lose-conditions">
                    <div class="icon lose"></div>
                    <div class="blk">
                        <div class="title">Defeat Condition</div>
                        <div class="text">
                                Your program does not provide a command in the allotted time or it provides an
                                unrecognized command.
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
            🐞 Debugging tips</h3>
        <ul>
            <!--
            <li>Hover over a tile to see extra information about it, including beacon
                <var>strength</var>.
            </li>
            
            <li>Use the <action>MESSAGE</action> command to display some text on your side of the HUD.
            </li>
            -->
            <li>Press the gear icon on the viewer to access extra display options.</li>
            <li>Use the keyboard to control the action: space to play/pause, arrows to step 1 frame at a
                time.
            </li>
        </ul>
        <br>

    </div>

    <!-- EXPERT RULES 
        <div class="statement-section statement-expertrules">
            <h2>
                <span class="icon icon-expertrules">&nbsp;</span>
                <span>Technical Details</span>
            </h2>
            <div class="statement-expert-rules-content">
                <ul>
                </ul>
            </div>
        </div>
-->

    <!-- PROTOCOL -->
    <div class="statement-section statement-protocol">
        <h2 style="font-size: 20px;">
            <span class="icon icon-protocol">&nbsp;</span>
            <span>Game Protocol</span>
        </h2>

        <!-- Protocol block -->
        <div class="blk">
            <div class="title">Initialization Input</div>
            <span class="statement-lineno">First line:</span> <var>playerIdx</var> an integer to indicate which agent you control in the mini-games.<br>
            <span class="statement-lineno">Next line:</span>
            the number of simultaneously running mini-games. For this league it's 
            <!-- BEGIN level1 -->
            <const>1</const>.
            <!-- END -->
            <!-- BEGIN level2 level3 -->
            <const>4</const>.
            <!-- END -->
        </div>
        <div class="blk">
            <div class="title">Input for One Game Turn</div>
            <span class="statement-lineno">Next <const>3</const> lines:</span> one line per
            player, ordered by <var>playerIdx</var>. A string <var>scoreInfo</var> containing a breakdown of each player's final score. 
            <!-- BEGIN level1 -->
            In this league, it contains <const>4</const> integers.
            <!-- END -->
            <!-- BEGIN level2 level3 -->
            It contains <const>10</const> integers.             
            <!-- END -->
            
            The first integer representing the player's current <b>final score points</b> followed 
            <!-- BEGIN level1 -->
             by:
             <!-- END -->
            <!-- BEGIN level2 level3 -->
             by three integers per mini-game: 
             <!-- END -->
             <var>nb_gold_medals</var>, <var>nb_silver_medals</var>, <var>nb_bronze_medals</var>.<br><br>

            <span class="statement-lineno">Next <var>nbGames</var> lines:</span> one line for each mini-game, containing the eight space-separated registers:
            <ul>
                <li><var>gpu</var> a string</li>
                <li><var>reg0</var> an integer</li>
                <li><var>reg1</var> an integer</li>
                <li><var>reg2</var> an integer</li>
                <li><var>reg3</var> an integer</li>
                <li><var>reg4</var> an integer</li>
                <li><var>reg5</var> an integer</li>
                <li><var>reg6</var> an integer</li>
            </ul>
            <!-- BEGIN level3 -->
             Their values will depend on the game. 
             <!-- END -->
            Unused registers will always be <const>-1</const>.
        </div>

        <div class="blk">
            <div class="title">Output</div>
            <div class="text">
                One of the following strings:
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
                The effect will depend on the game.
             <!-- END -->
            </div>
        </div>

        <div class="blk">
            <div class="title">Constraints</div>
            <div class="text">
                <const>0</const> ≤ <var>playerIdx</var> ≤ <const>2</const><br>
                <const>1</const> ≤ <var>nbGames</var> ≤ <const>4</const> <em>(across all leagues)</em><br>
                <br>
                
                Response time per turn ≤ <const>50</const>ms<br>
                Response time for the first turn ≤ <const>1000</const>ms
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
            What is in store for me in the higher leagues?
        </div>
        <ul>
            <!-- BEGIN level1 -->
            <li>4 hurdle race mini-games will be played simultaneously</li>
            <!-- END -->
            <li>4 entirely different mini-games will be played simultaneously!</li>
        </ul>
    </div>
    <!-- END -->
     


    <!-- STORY -->
    <!-- BEGIN level3 -->
    
    <div class="statement-story-background">
        <div class="statement-story-cover" style="background-size: cover; background-image: url(/servlet/fileservlet?id=103881564349131);">
            <div class="statement-story" style="min-height: 200px; position: relative">

                <div class="story-text">
                    <h2><span style="color: #b3b9ad"><b>Source code</b></span></h2>
                    The game's source is available <a style="color: #f2bb13; border-bottom-color: #f2bb13;" target="_blank"
                        href="https://github.com/CGjupoulton/SummerChallenge2024Olymbits">here</a>.

                </div>
            </div>
        </div>
    </div>
    <!-- END -->

</div>
<!-- SHOW_SAVE_PDF_BUTTON -->