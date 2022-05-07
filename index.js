const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
for (var i = 0; i < collisions.length; i += 213) {
  collisionsMap.push(collisions.slice(i, i + 213));
}

const battleZonesMap = [];
for (let i = 0; i < battleZonesData.length; i += 213) {
  battleZonesMap.push(battleZonesData.slice(i, 213 + i));
}

class Boundary {
  static width = 48;
  static height = 48;
  constructor(position) {
    this.position = position;
    this.width = 48;
    this.height = 48;
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}

const boundaries = [];
const offset = {
  x: -4527,
  y: -2646
};

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    boundaries.push(
      new Boundary({
        position: {
          x: j * boundary.width + offset.x,
          y: i * boundary.height + offset.y
        }
      })
    );
  });
});

const image = new Image();
image.src = "./img/Pocket-RPG-Map.png";

const playerImage = new Image();
playerImage.src = "./img/playerDown.png";

class Sprite {
  constructor({ position, velocity, image, frames = { max: 1 } }) {
    this.position = position;
    this.image = image;
    this.frames = frames;
    this.image.onload = () => {
      this.width = this.image.width / this.frames.max;
      this.height = this.image.height;
    };
  }
  draw() {
    c.drawImage(
      this.image,
      0,
      0,
      this.image.width / this.frames.max,
      this.image.height,
      this.position.x,
      this.position.y,
      this.image.width / this.frames.max,
      this.image.height
    );
  }
}

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 192 / this.frames / 2,
    y: canvas.height / 2 - 68 / 2
  },
  image: playerImage
});

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y
  },
  image: image,
  frames: {
    max: 4
  }
});

const keys = {
  w: { pressed: false },
  a: { pressed: false },
  s: { pressed: false },
  d: { pressed: false }
};

const movable = [background, ...boundaries, foreground, ...battleZones];

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y
  );
}

function animate() {
  window.requestAnimationFrame(animate);
  background.draw();
  boundaries.forEach(boundary => {
    boundary.draw();
  });
  battleZones.forEach(battleZone => {
    battleZone.draw();
  });
  player.draw();
  foreground.draw();
  if (
    player.position.x + player.width >= boundaries.position.x &&
    player.position.x <= boundaries.position.x + boundaries.width &&
    player.position.y <= boundaries.position.y + boundaries.height &&
    player.position.y + player.height >= boundaries.position.y
  ) {
  }

  if (keys.w.pressed && lastKey === "w") {
    movables.forEach(movable => {
      movable.position.y += 3;
    });
  } else if (keys.a.pressed && lastKey === "a") {
    movables.forEach(movable => {
      movable.position.x += 3;
    });
  } else if (keys.s.pressed && lastKey === "s") {
    movables.forEach(movable => {
      movable.position.y -= 3;
    });
  } else if (keys.d.pressed && lastKey === "d") {
    movables.forEach(movable => {
      movable.position.x -= 3;
    });
  }
}

let lastKey = "";
window.addEventListener("keydown", e => {
  switch (e.key) {
    case "w":
      keys.w.pressed = true;
      lastKey = "w";
      break;
    case "a":
      keys.a.pressed = true;
      lastKey = "a";
      break;
    case "s":
      keys.s.pressed = true;
      lastKey = "s";
      break;
    case "d":
      keys.d.pressed = true;
      lastKey = "d";
      break;
    default:
    //not supported key, do nothing
  }
});

window.addEventListener("keyup", e => {
  switch (e.key) {
    case "w":
      keys.w.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
    case "s":
      keys.s.pressed = false;
      break;
    case "d":
      keys.d.pressed = false;
      break;
    default:
    //not supported key, do nothing
  }
});
