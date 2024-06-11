package com.codingame.game;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import com.codingame.game.mini.Archery;
import com.codingame.game.mini.Diving;
import com.codingame.game.mini.HurdleRace;
import com.codingame.game.mini.MiniGame;
import com.codingame.game.mini.RollerSpeedSkating;

public class Serializer {
    public static final String MAIN_SEPARATOR = "\n";

    static public <T> String serialize(List<T> list) {
        return list.stream().map(String::valueOf).collect(Collectors.joining(" "));
    }

    static public String serialize(int[] intArray) {
        return Arrays.stream(intArray).mapToObj(String::valueOf).collect(Collectors.joining(" "));
    }

    static public String serialize(boolean[] boolArray) {
        List<String> strs = new ArrayList<>(boolArray.length);
        for (boolean b : boolArray) {
            strs.add(b ? "1" : "0");
        }
        return strs.stream().collect(Collectors.joining(" "));
    }

    static public String join(Object... args) {
        return Stream.of(args)
            .map(String::valueOf)
            .collect(Collectors.joining(" "));
    }

    public static String serializeGlobalData(Game game) {
        List<Object> lines = new ArrayList<>();
        lines.add(game.minigames.size());
        for (MiniGame minigame : game.minigames) {
            lines.add(minigame.type);
        }

        return lines.stream()
            .map(String::valueOf)
            .collect(Collectors.joining(MAIN_SEPARATOR));
    }

    public static String serializeFrameData(Game game) {
        List<Object> lines = new ArrayList<>();
        lines.add(game.minigames.size());
        for (MiniGame minigame : game.minigames) {
            lines.add(minigame.resetting ? "1" : "0");
            lines.add(minigame.shouldReset ? "1" : "0");

            switch (minigame.type) {
            case "hurdles":
                serialize((HurdleRace) minigame, lines);
                break;
            case "skating":
                serialize((RollerSpeedSkating) minigame, lines);
                break;
            case "archery":
                serialize((Archery) minigame, lines);
                break;
            case "diving":
                serialize((Diving) minigame, lines);
                break;
            }

            if (minigame.shouldReset) {
                for (int n : game.getRankings(minigame)) {
                    lines.add(n);
                }
            }
        }

        // Score info
        for (Player p : game.players) {
            int pScore = p.getPoints();
            List<Integer> scoreInfo = new ArrayList<>(13);
            scoreInfo.add(pScore);
            for (int gameIdx = 0; gameIdx < game.minigames.size(); gameIdx++) {
                scoreInfo.add(p.medals[gameIdx][0]);
                scoreInfo.add(p.medals[gameIdx][1]);
                scoreInfo.add(p.medals[gameIdx][2]);
            }
            lines.add(serialize(scoreInfo));
        }

        return lines.stream()
            .map(String::valueOf)
            .collect(Collectors.joining(MAIN_SEPARATOR));
    }

    private static void serialize(Diving minigame, List<Object> lines) {
        lines.add(minigame.turnsRemaining);
        lines.add(serialize(minigame.goal));
        lines.add(serialize(minigame.points));
        lines.add(serialize(minigame.combo));
        lines.add(serialize(minigame.playerInputs.get(0)));
        lines.add(serialize(minigame.playerInputs.get(1)));
        lines.add(serialize(minigame.playerInputs.get(2)));
    }

    private static void serialize(Archery minigame, List<Object> lines) {
        lines.add(serialize(minigame.dead));
        lines.add(minigame.arrows ? "1" : "0");
        lines.add(serialize(minigame.cursors.get(0)));
        lines.add(serialize(minigame.cursors.get(1)));
        lines.add(serialize(minigame.cursors.get(2)));
        lines.add(serialize(minigame.wind));

    }

    private static void serialize(RollerSpeedSkating minigame, List<Object> lines) {
        lines.add(serialize(minigame.positions));
        lines.add(minigame.length);
        lines.add(serialize(minigame.risk));
        lines.add(serialize(minigame.dead));
        lines.add(minigame.timer);
        lines.add(serialize(minigame.directions));

    }

    private static void serialize(HurdleRace minigame, List<Object> lines) {
        lines.add(minigame.map);
        lines.add(serialize(minigame.positions));
        lines.add(serialize(minigame.jumped));
        lines.add(serialize(minigame.stunTimers));
        lines.add(serialize(minigame.dead));

    }

    public static List<String> serializeGlobalInfoFor(Player player, Game game) {
        List<Object> lines = new ArrayList<>();

        lines.add(String.valueOf(player.getIndex()));
        lines.add(String.valueOf(game.minigames.size()));

        return lines.stream()
            .map(String::valueOf)
            .collect(Collectors.toList());
    }

    public static List<String> serializeFrameInfoFor(Player player, Game game) {
        List<String> lines = new ArrayList<>();
        for (Player p : game.players) {
            int pScore = p.getPoints();
            List<Integer> scoreInfo = new ArrayList<>(10);
            scoreInfo.add(pScore);
            for (int gameIdx = 0; gameIdx < game.minigames.size(); gameIdx++) {
                scoreInfo.add(p.medals[gameIdx][0]);
                scoreInfo.add(p.medals[gameIdx][1]);
                scoreInfo.add(p.medals[gameIdx][2]);
            }
            lines.add(serialize(scoreInfo));
        }

        for (MiniGame minigame : game.minigames) {
            int reg[] = minigame.getRegisters();
            String registers = Arrays.stream(reg)
                .mapToObj(String::valueOf)
                .collect(Collectors.joining(" "));
            String gpu = minigame.getGPU();
            lines.add(join(minigame.shouldReset ? "GAME_OVER" : gpu, registers));
        }

        return lines.stream()
            .collect(Collectors.toList());
    }

}
