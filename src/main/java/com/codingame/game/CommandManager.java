package com.codingame.game;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.codingame.gameengine.core.MultiplayerGameManager;
import com.google.inject.Inject;
import com.google.inject.Singleton;

@Singleton
public class CommandManager {

    @Inject private MultiplayerGameManager<Player> gameManager;

    static final Pattern PLAYER_PATTERN = Pattern.compile(
        "^(?<button>UP|DOWN|RIGHT|LEFT)"
            + "(?:\\s+(?<message>.+))?"
            + "\\s*$",
        Pattern.CASE_INSENSITIVE
    );

    static String EXPECTED = "UP | DOWN | LEFT | RIGHT";

    public void handleCommands(Player player, List<String> lines) {
        int i = 0;
        String line = lines.get(0);
        try {

            Matcher match = PLAYER_PATTERN.matcher(line);
            if (match.matches()) {
                Action button = Action.valueOf(match.group("button").toUpperCase());
                player.setAction(button);
                //Message
                matchMessage(player, match);
                return;
            }
            throw new InvalidInputException(EXPECTED, line);

        } catch (InvalidInputException e) {
            deactivatePlayer(player, e.getMessage());
            gameManager.addToGameSummary("Bad command: " + e.getMessage());
            return;
        } catch (Exception e) {

            deactivatePlayer(player, new InvalidInputException(e.toString(), EXPECTED, line).getMessage());
            gameManager.addToGameSummary("Bad command: " + e.getMessage());
            return;
        }

    }

    private void deactivatePlayer(Player player, String message) {
        player.deactivate(escapeHTMLEntities(message));
    }

    private String escapeHTMLEntities(String message) {
        return message
            .replace("&lt;", "<")
            .replace("&gt;", ">");
    }

    private void matchMessage(Player agent, Matcher match) {
        String message = match.group("message");
        if (message != null) {
            agent.setMessage(message);
        }
    }
}
