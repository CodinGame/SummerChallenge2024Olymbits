package com.codingame.game;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.codingame.gameengine.core.AbstractMultiplayerPlayer;

public class Player extends AbstractMultiplayerPlayer {

    String message;
    Action action;
    int[][] medals;

    public Player() {
    }

    public void init(int gameCount) {
        medals = new int[gameCount][3];
    }

    public int getPoints() {
        int p = 1;
        for (int i = 0; i < medals.length; ++i) {
            p *= (3 * medals[i][0] + medals[i][1]);
        }
        return p;
    }

    @Override
    public int getExpectedOutputLines() {
        return 1;
    }

    public void reset() {
        this.message = null;
        this.action = null;
    }

    public void setMessage(String message) {
        this.message = message;

    }

    public void setAction(Action button) {
        this.action = button;
    }

    public Action getAction() {
        return action;
    }

    public int[] getMedalsTotal() {
        int[] total = new int[3];
        for (int i = 0; i < medals.length; ++i) {
            int golds = medals[i][0];
            int silvers = medals[i][1];
            int bronzes = medals[i][2];
            total[0] += golds;
            total[1] += silvers;
            total[2] += bronzes;
        }
        return total;
    }

    public String getScoreText() {
        List<String> minigameScores = new ArrayList<>(medals.length);
        for (int i = 0; i < medals.length; ++i) {
            int golds = medals[i][0];
            int silvers = medals[i][1];
            if (golds == 0 && silvers > 1) {
                minigameScores.add(String.format("%d🥈", silvers));
            } else if (golds > 0 && silvers == 0) {
                minigameScores.add(String.format("%d🥇", golds));
            } else if (golds == 0 && silvers == 0) {
                minigameScores.add("0");
            } else {
                minigameScores.add(String.format("%d🥇+%d🥈", golds, silvers));
            }
        }
        return minigameScores.stream().collect(Collectors.joining(" * ")) + " = " + getPoints();
    }

}
