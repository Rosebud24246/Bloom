kaboom({
    global:true,
    fullscreen: false,
    scale: 1,
    width: 1000,
    height: 600,
    debug: true,
    clearColor: [0, 0, 0, 1],
});

// Speed identifiers
var MOVE_SPEED = -250;
const JUMP_FORCE = 700;
const BIG_JUMP_FORCE = 2000;
let CURRENT_JUMP_FORCE = JUMP_FORCE;
const FALL_DEATH = 400;
const ENEMY_SPEED = 20;
const WIN_TIME = 120;
const WIDTH = 1000;
const HEIGHT = 600;

//Game logic
loadSprite('ground', 'sprites/ground-dead.png');
loadSprite('bot', 'sprites/bot2.png');
loadSprite('enemy', 'sprites/enemy.jpeg');


/**
  * button function
  * @param txt text of button
  * @param p position
  * @param f event
  */
 function addButton(txt, p, f) {

	const btn = add([
		text(txt),
		pos(p),
		area({ cursor: "pointer", }),
		scale(1),
		origin("center"),
	])

	btn.onClick(f)
  btn.onUpdate(() => {
		if (btn.isHovering()) {
			const t = time() * 10
			btn.color = rgb(
				wave(0, 255, t),
				wave(0, 255, t + 2),
				wave(0, 255, t + 4),
			)
			btn.scale = vec2(1.2)
		} else {
			btn.scale = vec2(1)
			btn.color = rgb()
		}
	})

  btn.scale = vec2(1)
	btn.color = rgb()
}

//Game Layout
scene("game", ({ levelId, score } = {levelId: 0, score: 0}) => {
  MOVE_SPEED = -250;

  const MAPS = [
    [
      '$                                      ',
      '                                      ',
      '                                      ',
      '======================================',
    ],
  ];

  const levelCfg = {
    width: 64,
    height: 64,
    pos: vec2(0, 200),
    '=': () => [sprite('ground'),
      area(),
      solid()],
  };

  layers(['bg', 'obj', 'ui'], 'obj');

  //addLevel(MAPS[levelId], levelCfg);
  const level = addLevel(MAPS[levelId ?? 0], levelCfg);


  const player = add([
    health(3),
    sprite('bot'),
    solid(),
    area(),
    pos(200, 392),
    body(),
    origin('bot')
  ]);

  player.action(() => {
    if (player.pos.y >= 1000) {
      go('lose');
    }
  });

  player.onCollide("enemy", (enemy) => {
    player.hurt(1)
    destroy(enemy);
    shake(5)
  });

  //trigger when hp hits 0
  player.on("death", () => {
    if (player.hp() <= 0) {
      go('lose');
    }
  })

  gravity(2000);

  keyDown('space', () => {
    if (player.grounded()) {
      player.jump(CURRENT_JUMP_FORCE);
    }
  });

  /**
   * Condition for win
   */

  var value = 0;
  var progressBarLength = 500;
  var outlineWidth = 7;

  onDraw(() => {
    //progressBar Outline
    drawRect({
      pos: vec2((WIDTH/2) - (progressBarLength/2) - outlineWidth/2, 50),
      height: 25 + outlineWidth,
      width: progressBarLength + outlineWidth,
      layer: 'ui',
      origin: "left",
      color: WHITE,
      radius: 20,
      outline: { color: BLACK, width: outlineWidth }
    });
    //progressBar
    drawRect({
      pos: vec2((WIDTH/2) - (progressBarLength/2), 50),
      height: 25,
      width: lerp(0, progressBarLength, value/WIN_TIME),
      layer: 'ui',
      origin: "left",
      radius: 20,
      color: rgb(50, 226, 108)
    });
  });

  onUpdate(() => {
    if (value/WIN_TIME > 1) {
      go('win');
    }
  });

  wait(0.02, () => {
    loop(0.021, () => {
      value += 0.02;
      value = Math.round(value*100)/100;
    });
  });

  /**
   * Enemy control
   */
  var topNum = 3;
  var bottomNum = 1;

  function addObsticle() {
    const enemy = add([
      sprite('bot'),
      solid(),
      area(),
      pos(1100, 300),
      body(),
      scale(0.5),
      origin('center'),
      cleanup(3),
      "enemy",
    ]);

    enemy.action(() => {
      enemy.move(MOVE_SPEED, 0);
    });
  }

  function topDown() {
    topNum = 3 - ((value/WIN_TIME)*1.5);
    return topNum;
  }

  function bottomDown() {
    bottomNum = 1 - ((value/WIN_TIME)*0.5);
    return bottomNum;
  }

  function randSpawn(num) {
    wait(num, () => {
      addObsticle();
      randSpawn(rand(bottomDown(), topDown()));
    });
  }

  onUpdate(() => {
    debug.log(topNum + " " + bottomNum);
  });

  loop(1, () => {
    MOVE_SPEED -= 5;
  });

  wait(3, () => {
    addObsticle();
    randSpawn(rand(1, 3));
  });

  /**
  * Adding controls for audio
  */
  let music = document.getElementById("music");
  document.getElementById("music").loop = true;
  function playAudio() {
    //music.play();
  }

  keyPress('space', () => {
    playAudio();
  })
});


 /**
  * Lose or Game over end screen
  */
scene('lose', () => {
  MOVE_SPEED = -250;
  add([text("You Lose...")])
  music.pause();

  //restart button
  addButton("Restart", vec2(500, 200), () => go("game"));
});

scene('win', () => {
  MOVE_SPEED = -250;
  add([text("YOU WIN!!!")])
  music.pause();

  //restart button
  addButton("Restart", vec2(500, 200), () => go("game"));
});

//start screen
scene('start', () => {
  MOVE_SPEED = -250;
	add([
		text("B100M"),
		pos(center().add(0, 100)),
		scale(3),
		origin("center"),
	])

  addButton("Start", vec2(500, 200), () => go("game"));

})

go('start');

//go("game");
onUpdate(() => cursor("default"))