import java.util.Properties;

import com.codingame.gameengine.runner.MultiplayerGameRunner;

public class Main {
	public static void main(String[] args) {

		MultiplayerGameRunner gameRunner = new MultiplayerGameRunner();
		
		// Set seed here (leave empty for random)
		gameRunner.setSeed(8787933113005275327l);

		// Select agents here
		gameRunner.addAgent("python3 bots/depth_one.py", "DepthOne");
		gameRunner.addAgent("python3 bots/julien.py 10", "Julien");
		gameRunner.addAgent("python3 config/Boss.py 20", "Player 3");
		
		Properties params = new Properties();
		// Set params here
		gameRunner.setGameParameters(params);
		

		gameRunner.start(8888);
	}
}
