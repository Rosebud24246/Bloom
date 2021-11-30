kaboom({
    global:true,
    fullscreen: true,
    fullscreen: false,
    scale: 1,
    width: 1000,
    height: 600,
    debug: true,
    clearColor: [0, 0, 0, 1],
})
});

// Speed identifiers
const MOVE_SPEED = 120
const JUMP_FORCE = 360
const BIG_JUMP_FORCE = 550
let CURRENT_JUMP_FORCE = JUMP_FORCE
const FALL_DEATH = 400
const ENEMY_SPEED = 20
const MOVE_SPEED = 200;
const JUMP_FORCE = 700;
const BIG_JUMP_FORCE = 2000;
let CURRENT_JUMP_FORCE = JUMP_FORCE;
const FALL_DEATH = 400;
const ENEMY_SPEED = 20;

//Game logic
loadSprite('ground', 'sprites/ground-dead.png');
loadSprite('bot', 'sprites/bot2.png');
loadSprite('enemy', 'sprites/enemy.jpeg');


/**
  * button function
  * @param txt text of button
  * @param p position
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
  const MAPS = [
    [
      '                                                                                ',
      '                                                                                ',
      '                                                                                ',
      '                                                                                ',
      '================================================================================',
    ],
  ];

  const levelCfg = {
    width: 64,
    height: 64,
    pos: vec2(0, 200),
    '=': () => [sprite('ground'),
      area(),

  layers(['bg', 'obj', 'ui'], 'obj');

  //addLevel(MAPS[levelId], levelCfg);
  const level = addLevel(MAPS[levelId ?? 0], levelCfg);


  const player = add([
    sprite('bot'),
    solid(),
    body(),
    origin('bot')
  ]);

  player.action(() => {
    if (player.pos.y >= 1000) {
      go('lose');
    }
  })
  keyDown('left', () => {

  keyDown('right', () => {
    player.move(MOVE_SPEED, 0)
  })

  player.action(() => {
    if(player.grounded()) {
      isJumping = false
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
      isJumping = true
      player.jump(CURRENT_JUMP_FORCE);
    }
  /**
   * Enemy control

  function addObsticle() {
    const enemy = add([
      sprite('bot'),
      solid(),
      area(),
      pos(1100, 300),
      body(),
      scale(0.5),
      origin('center'),
      "enemy",
    ]);

    enemy.action(() => {
      enemy.move(-250, 0);
    });
  }

  wait(3, () => {
    loop(1.5, () => {
      addObsticle();
    });
  });

  /**
  * Adding controls for audio
  */
  let music = document.getElementById("music");
  document.getElementById("music").loop = true;
  function playAudio() {
    music.play();
  }

  keyPress('space', () => {
    playAudio();
  })
})
});


 /**
  */
scene('lose', () => {
  add([text("You Lose...")])
  music.pause();

  //restart button
  addButton("Restart", vec2(500, 200), () => go("game"));
});

//start screen
scene('start', () => {

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