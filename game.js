kaboom({
    global:true,
    fullscreen: true,
    scale: 1,
    debug: true,
    clearColor: [0, 0, 0, 1],
})

// Speed identifiers
const MOVE_SPEED = 120
const JUMP_FORCE = 360
const BIG_JUMP_FORCE = 550
let CURRENT_JUMP_FORCE = JUMP_FORCE
const FALL_DEATH = 400
const ENEMY_SPEED = 20

//Game logic
let isJumping = true
loadSprite('ground', 'sprites/ground-dead.png')
loadSprite('bot', 'sprites/bot2.png')



scene("game", ({ level, score }) => {
  layers(['bg', 'obj', 'ui'], 'obj')

  const maps = [
    [
      '                                                                                ',
      '                                                                                ',
      '                                                                                ',
      '                                                                                ',
      '                                                                                ',
      '                                                                                ',
      '                                                                                ',
      '                                                                                ',
      '                                                                                ',
      '================================================================================',
    ],
  ]

  const levelCfg = {
    width: 64,
    height: 64,
    '=': [sprite('ground'), solid()],
  }

  const gameLevel = addLevel(maps[level], levelCfg)

  const player = add([
    sprite('bot'), solid(),
    pos(30, 0),
    body(),
    origin('bot')
  ])

  player.action(() => {
    camPos(player.pos)
    if (player.pos.y >= 1000) {
      go('lose')
    }
  })

  keyDown('left', () => {
    player.move(-MOVE_SPEED, 0)
  })

  keyDown('right', () => {
    player.move(MOVE_SPEED, 0)
  })

  player.action(() => {
    if(player.grounded()) {
      isJumping = false
    }
  })

  keyPress('space', () => {
    if (player.grounded()) {
      isJumping = true
      player.jump(CURRENT_JUMP_FORCE)
    }
  })

  /**
  * Adding controls for audio 
  */
  let music = document.getElementById("music");
  document.getElementById("music").loop = true;
  function playAudio() {
    music.play();
  }
  keyPress('right', () => {
    playAudio();
  })
})

scene('lose', () => {
  add([text("You Lose...")])
})

start("game", { level: 0})