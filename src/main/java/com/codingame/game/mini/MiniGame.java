package com.codingame.game.mini;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Random;
import java.util.Set;
import java.util.stream.Collectors;

import com.codingame.game.Action;
import com.codingame.game.Game;

public abstract class MiniGame {

    public String type;

    public boolean shouldReset, resetting;

    public abstract void reset(Random random);

    public abstract String getGPU();

    public abstract int[] getRegisters();

    public abstract void tick(List<Action> actions);

    public abstract boolean isGameOver();

    public abstract int[] getRankings();

    public abstract String getName();

    static int[] createRankings(Map<Integer, Double> scoreByPlayer) {
        int[] rankings = new int[Game.PLAYER_COUNT];
        Set<Entry<Integer, Double>> entries = scoreByPlayer.entrySet();
        List<Entry<Integer, Double>> sorted = entries.stream()
            .sorted(
                Comparator.comparingDouble(
                    (Entry<Integer, Double> e) -> e.getValue()
                ).reversed()
            )
            .collect(Collectors.toList());

        int rank = 0;
        int lastRank = 0;
        Double lastScore = null;
        for (Entry<Integer, Double> e : sorted) {
            int currentRank = rank;
            if (lastScore != null && lastScore.equals(e.getValue())) {
                currentRank = lastRank;
            }
            lastRank = currentRank;

            rankings[e.getKey()] = currentRank;

            rank++;
            lastScore = e.getValue();
        }
        return rankings;
    }

    static int[] fillRegisters(int[]... arrays) {
        int[] registers = new int[Game.REGISTER_COUNT];
        int idx = 0;

        for (int[] array : arrays) {
            for (int integer : array) {
                registers[idx++] = integer;
            }
        }

        return registers;
    }

}
