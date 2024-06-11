package com.codingame.game.mini;

import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.TreeMap;

import com.codingame.game.Action;
import com.codingame.game.Game;

public class HurdleRace extends MiniGame {

    public static final int STUN_DURATION = 2;

    public String map;
    public int positions[] = new int[Game.PLAYER_COUNT];
    public int stunTimers[] = new int[Game.PLAYER_COUNT];

    public boolean dead[] = new boolean[Game.PLAYER_COUNT];
    public boolean jumped[] = new boolean[Game.PLAYER_COUNT];

    private int finished[] = new int[Game.PLAYER_COUNT];
    private int rank = 0;

    public HurdleRace() {
        type = "hurdles";
    }

    @Override
    public void reset(Random random) {
        // Generate new map
        int startStretch = 3 + random.nextInt(5);
        int hurdles = 3 + random.nextInt(4);
        int length = 30;

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < startStretch; ++i) {
            sb.append('.');
        }
        for (int i = 0; i < hurdles; ++i) {
            if (random.nextBoolean()) {
                sb.append("#....");
            } else {
                sb.append("#...");
            }
        }
        while (sb.length() < length) {
            sb.append(".");
        }

        map = sb.toString().substring(0, length - 1) + ".";

        for (int i = 0; i < Game.PLAYER_COUNT; ++i) {
            stunTimers[i] = 0;
            positions[i] = 0;
            finished[i] = -1;
            rank = 0;
            jumped[i] = false;
        }

    }

    @Override
    public String getGPU() {
        return map;
    }

    @Override
    public int[] getRegisters() {
        return MiniGame.fillRegisters(positions, stunTimers);
    }

    @Override
    public void tick(List<Action> actions) {
        int maxX = map.length() - 1;
        int countFinishes = 0;

        for (int i = 0; i < actions.size(); ++i) {
            jumped[i] = false;

            Action a = actions.get(i);
            if (a == null) {
                dead[i] = true;
                continue;
            }
            if (stunTimers[i] > 0) {
                stunTimers[i] -= 1;
                continue;
            }

            if (finished[i] > -1) {
                continue;
            }

            int moveBy = 0;
            boolean jump = false;
            switch (a) {
            case DOWN:
                moveBy = 2;
                break;
            case LEFT:
                moveBy = 1;
                break;
            case RIGHT:
                moveBy = 3;
                break;
            case UP:
                moveBy = 2;
                jump = true;
                jumped[i] = true;
                break;
            }
            for (int x = 0; x < moveBy; ++x) {
                positions[i] = Math.min(maxX, positions[i] + 1);
                if (map.charAt(positions[i]) == '#' && !jump) {
                    stunTimers[i] = STUN_DURATION;
                    break;
                }
                if (positions[i] == maxX && finished[i] == -1) {
                    finished[i] = rank;
                    countFinishes++;
                    break;
                }
                jump = false;
            }
        }
        rank += countFinishes;

    }

    @Override
    public boolean isGameOver() {
        int count = 0;
        for (int i = 0; i < finished.length; ++i) {
            if (finished[i] > -1 && Game.EARLY_RACE_END) {
                return true;
            }
            if (finished[i] > -1 || dead[i]) {
                count++;
            }
        }

        return count >= 2;
    }

    @Override
    public int[] getRankings() {
        if (Game.EARLY_RACE_END) {
            Map<Integer, Double> scoreByPlayer = new TreeMap<>();
            for (int i = 0; i < positions.length; ++i) {
                scoreByPlayer.put(i, (double)(dead[i] ? -1 : positions[i]));
            }

            return MiniGame.createRankings(scoreByPlayer);
        }

        int[] rankings = new int[Game.PLAYER_COUNT];
        for (int i = 0; i < finished.length; ++i) {
            if (finished[i] == -1) {
                rankings[i] = rank;
            } else {
                rankings[i] = finished[i];
            }
        }
        return rankings;
    }

    @Override
    public String getName() {
        return "Hurdle Race";
    }

}
