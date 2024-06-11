package com.codingame.game.mini;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.TreeMap;
import java.util.stream.Collectors;

import com.codingame.game.Action;
import com.codingame.game.Game;

public class RollerSpeedSkating extends MiniGame {

    transient Random random;

    public int[] positions = new int[Game.PLAYER_COUNT];
    public int[] risk = new int[Game.PLAYER_COUNT];
    public boolean[] dead = new boolean[Game.PLAYER_COUNT];
    public List<Action> directions;

    public int length, timer;

    public RollerSpeedSkating() {
        directions = Arrays.asList(Action.values());
        type = "skating";
    }

    @Override
    public void reset(Random random) {
        this.random = random;
        for (int i = 0; i < positions.length; ++i) {
            positions[i] = 0;
            risk[i] = 0;
        }

        Collections.shuffle(directions, random);
        length = 10;
        timer = 15;
    }

    @Override
    public String getGPU() {
        return directions.stream()
            .map(Action::name)
            .map(a -> String.valueOf(a.charAt(0)))
            .collect(Collectors.joining());
    }

    @Override
    public int[] getRegisters() {
        int[] registers = MiniGame.fillRegisters(positions, risk);
        registers[6] = timer;
        return registers;
    }

    @Override
    public void tick(List<Action> actions) {
        for (int i = 0; i < actions.size(); ++i) {
            Action action = actions.get(i);
            if (action == null) {
                dead[i] = true;
                continue;
            }
            if (risk[i] < 0) {
                risk[i]++;
                continue;
            }
            int idx = directions.indexOf(action);
            int dx = idx == 0 ? 1 : idx == 3 ? 3 : 2;

            positions[i] = positions[i] + dx;
            int riskValue = -1 + idx;
            risk[i] = Math.max(0, risk[i] + riskValue);
        }
        for (int i = 0; i < positions.length; ++i) {
            if (risk[i] < 0) {
                continue;
            }
            boolean clash = false;
            for (int k = 0; k < positions.length; ++k) {
                if (k == i) {
                    continue;
                }
                if (positions[k] % length == positions[i] % length) {
                    clash = true;
                    break;
                }
            }
            if (clash) {
                risk[i] += 2;
            }

            if (risk[i] >= 5) {
                risk[i] = -2; // stun
            }
        }

        Collections.shuffle(directions, random);
        timer--;
    }

    @Override
    public boolean isGameOver() {
        return timer <= 0;
    }

    @Override
    public int[] getRankings() {
        Map<Integer, Double> scoreByPlayer = new TreeMap<>();
        for (int i = 0; i < positions.length; ++i) {
            scoreByPlayer.put(i, (double) (dead[i] ? -1 : positions[i]));
        }
        return MiniGame.createRankings(scoreByPlayer);
    }

    @Override
    public String getName() {
        return "Roller Speed Skating";
    }

}
