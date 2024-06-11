package com.codingame.game.mini;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.stream.Collectors;

import com.codingame.game.Action;
import com.codingame.game.Game;

public class Diving extends MiniGame {

    public List<Character> goal;
    public Map<Integer, List<Character>> playerInputs;
    public int turnsRemaining;
    public int[] points = new int[Game.PLAYER_COUNT];
    public int[] combo = new int[Game.PLAYER_COUNT];

    private boolean dead[] = new boolean[Game.PLAYER_COUNT];

    public Diving() {
        goal = new LinkedList<>();
        playerInputs = new HashMap<Integer, List<Character>>();
        type = "diving";
    }

    @Override
    public void reset(Random random) {
        // Reset goal
        goal.clear();
        playerInputs.clear();
        int length = 12 + random.nextInt(4);
        for (int i = 0; i < length; ++i) {
            char c = Action.values()[random.nextInt(Action.values().length)].name().charAt(0);
            goal.add(c);
        }
        for (int i = 0; i < points.length; ++i) {
            points[i] = 0;
            combo[i] = 0;
            playerInputs.put(i, new LinkedList<Character>());
        }
        turnsRemaining = length + 1;
    }

    @Override
    public String getGPU() {
        return goal.stream().map(String::valueOf).collect(Collectors.joining());
    }

    @Override
    public int[] getRegisters() {
        return MiniGame.fillRegisters(points, combo);
    }

    @Override
    public void tick(List<Action> actions) {
        for (int i = 0; i < actions.size(); ++i) {
            Action action = actions.get(i);
            if (action == null) {
                dead[i] = true;
                continue;
            }
            if (goal.get(0).equals(action.name().charAt(0))) {
                combo[i]++;
                points[i] += combo[i];
            } else {
                combo[i] = 0;
            }
            playerInputs.get(i).add(action.name().charAt(0));
        }
        turnsRemaining = goal.size();
        goal.remove(0);
    }

    @Override
    public boolean isGameOver() {
        return goal.isEmpty();
    }

    @Override
    public int[] getRankings() {
        Map<Integer, Double> pointsByPlayer = new HashMap<>();
        for (int i = 0; i < points.length; ++i) {
            pointsByPlayer.put(i, (double) (dead[i] ? -1 : points[i]));
        }
        return MiniGame.createRankings(pointsByPlayer);
    }

    @Override
    public String getName() {
        return "Diving";
    }

}
