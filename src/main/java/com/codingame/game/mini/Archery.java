package com.codingame.game.mini;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.TreeMap;
import java.util.stream.Collectors;

import com.codingame.game.Action;
import com.codingame.game.Game;

public class Archery extends MiniGame {

    public List<int[]> cursors;
    public List<Integer> wind;
    public boolean arrows;
    public boolean[] dead;

    public Archery() {
        cursors = new ArrayList<>(Game.PLAYER_COUNT);
        for (int i = 0; i < Game.PLAYER_COUNT; ++i) {
            cursors.add(new int[2]);
        }

        wind = new LinkedList<>();
        dead = new boolean[Game.PLAYER_COUNT];
        type = "archery";
    }

    private int randomChoice(Random random, double[] coeffs) {
        double rand = random.nextDouble();
        double total = Arrays.stream(coeffs).sum();
        double b = 1 / total;
        double[] weights = Arrays.stream(coeffs).map(v -> v * b).toArray();
        double cur = 0;
        for (int i = 0; i < weights.length; ++i) {
            cur += weights[i];
            if (cur >= rand) {
                return i;
            }
        }
        return 0;
    }

    @Override
    public void reset(Random random) {

        int x = (5 + random.nextInt(5)) * (random.nextBoolean() ? 1 : -1);
        int y = (5 + random.nextInt(5)) * (random.nextBoolean() ? 1 : -1);
        for (int[] cursor : cursors) {
            cursor[0] = x;
            cursor[1] = y;
        }
        wind.clear();
        int rounds = 12 + random.nextInt(4);

        double[] weights = new double[] { 0, 2, 2, 2, 0.5, 0.5, 0.25, 0.25, 0.25, 0.2 };
        for (int i = 0; i < rounds; ++i) {
            wind.add(randomChoice(random, weights));
        }
        arrows = false;
    }

    @Override
    public String getGPU() {
        return wind.stream()
            .map(String::valueOf)
            .collect(Collectors.joining());
    }

    @Override
    public int[] getRegisters() {
        return MiniGame.fillRegisters(
            cursors.get(0),
            cursors.get(1),
            cursors.get(2)
        );
    }

    @Override
    public void tick(List<Action> actions) {
        for (int i = 0; i < actions.size(); ++i) {
            Action a = actions.get(i);
            if (a == null) {
                dead[i] = true;
                continue;
            }
            int offset = wind.get(0);
            int dx = 0;
            int dy = 0;
            if (a == Action.DOWN) {
                dy = offset;
            } else if (a == Action.LEFT) {
                dx = -offset;
            } else if (a == Action.RIGHT) {
                dx = offset;
            } else {
                dy = -offset;
            }
            int[] cursor = cursors.get(i);
            cursor[0] += dx;
            cursor[1] += dy;
            int maxDist = 20;
            if (cursor[0] > maxDist) {
                cursor[0] = maxDist;
            }
            if (cursor[1] > maxDist) {
                cursor[1] = maxDist;
            }
            if (cursor[0] < -maxDist) {
                cursor[0] = -maxDist;
            }
            if (cursor[1] < -maxDist) {
                cursor[1] = -maxDist;
            }

        }

        wind.remove(0);
        arrows = isGameOver();
    }

    @Override
    public boolean isGameOver() {
        return wind.isEmpty();
    }

    @Override
    public int[] getRankings() {
        Map<Integer, Double> pointsByPlayer = new TreeMap<>();
        for (int i = 0; i < cursors.size(); ++i) {
            int[] cursor = cursors.get(i);
            double distance = Math.pow(cursor[0], 2) + Math.pow(cursor[1], 2);
            if (dead[i]) {
                pointsByPlayer.put(i, -Double.MAX_VALUE);
            } else {
                pointsByPlayer.put(i, -distance);
            }
        }
        return MiniGame.createRankings(pointsByPlayer);
    }

    @Override
    public String getName() {
        return "Archery";
    }

}
