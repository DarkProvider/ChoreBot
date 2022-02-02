

let door1 = document.getElementById("door1");
let door2 = document.getElementById("door2");
let door3 = document.getElementById("door3");

let botDoorPath =
  "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
let beachDoorPath =
  "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
let spaceDoorPath =
  "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";
let closedDoorPath =
  "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";

let numClosedDoors = 3;
let openDoor1;
let openDoor2;
let openDoor3;



const startButton = document.getElementById("start");


let currentlyPlaying = true;
/*---------------------------------------------*/
const isClicked = door => {
  if (door.src === closedDoorPath) {
    return false;
  } else {
    return true;
  }
};

const isBot = door => {
  if (door.src === botDoorPath) {
    return true;
  } else {
    return false;
  }
};

const playDoor = door => {
  numClosedDoors--;
  if (numClosedDoors === 0) {
    gameOver("win");
  } else if (isBot(door)) {
    gameOver("lose");
  }
};

const randomChoreDoorGenerator = () => {
  const choreDoor = Math.floor(Math.random() * numClosedDoors);
  switch (choreDoor) {
    case 0:
      openDoor1 = botDoorPath;
      openDoor2 = beachDoorPath;
      openDoor3 = spaceDoorPath;
      break;
    case 1:
      openDoor2 = botDoorPath;
      openDoor1 = beachDoorPath;
      openDoor3 = spaceDoorPath;
      break;
    case 2:
      openDoor3 = botDoorPath;
      openDoor1 = beachDoorPath;
      openDoor2 = spaceDoorPath;
      break;
  }
};

door1.onclick = () => {
  if (currentlyPlaying && !isClicked(door1)) {
    door1.src = openDoor1;
    playDoor(door1);
  }
};

door2.onclick = () => {
  if (currentlyPlaying && !isClicked(door2)) {
    door2.src = openDoor2;
    playDoor(door2);
  }
};

door3.onclick = () => {
  if (currentlyPlaying && !isClicked(door3)) {
    door3.src = openDoor3;
    playDoor(door3);
  }
};

startButton.onclick = () => {
  if (!currentlyPlaying) {
    startRound();
    window.location.reload();
  }
};

const startRound = () => {
  door1.src = closedDoorPath;
  door2.src = closedDoorPath;
  door3.src = closedDoorPath;
  numClosedDoors = 3;
  currentlyPlaying = true;
  startButton.innerHTML = "Good luck!";
  randomChoreDoorGenerator();
};

const gameOver = status => {
  if (status === "win") {
    startButton.innerHTML = "You win! Play again?";
    var confettiSettings = { target: 'my-canvas' };
    var confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

  } else if (status === "lose") {
    startButton.innerHTML = "Game over! Play again?";
  }
  currentlyPlaying = false;
};
startRound();

