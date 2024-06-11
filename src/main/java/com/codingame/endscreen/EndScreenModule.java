package com.codingame.endscreen;

import com.codingame.gameengine.core.AbstractPlayer;
import com.codingame.gameengine.core.GameManager;
import com.codingame.gameengine.core.Module;
import com.google.inject.Inject;
import com.google.inject.Singleton;

/**
 * The EndScreen takes care of displaying and animating an end screen with the scores of the players at the end of the game.
 * 
 */
@Singleton
public class EndScreenModule implements Module {

    private GameManager<AbstractPlayer> gameManager;
    private int[] scores;
    private int[][] medals;

    @Inject
    EndScreenModule(GameManager<AbstractPlayer> gameManager) {
        this.gameManager = gameManager;
        gameManager.registerModule(this);
    }

    /**
     * Send scores to the module
     * 
     * @param scores
     *            the scores of the different players, the index matches the player.getIndex()
     */
    public void setScores(int[] scores) {
        this.scores = scores;
    }

    /**
     * Send scores to the module
     * 
     * @param scores
     *            the scores of the different players, the index matches the player.getIndex()
     * @param displayedText
     *            the text displayed instead of the score of a player, if null or empty string for a player the score will still be displayed
     *
     */
    public void setScores(int[] scores, int[][] medals) {
        this.scores = scores;
        this.medals = medals;
    }

    @Override
    public final void onGameInit() {
    }

    @Override
    public final void onAfterGameTurn() {
    }

    @Override
    public final void onAfterOnEnd() {
        Object[] data = { scores, medals };
        gameManager.setViewData("endScreen", data);
    }

}