let ENTRANTS = ["Imad", "Arsi", "Waleed", "Abdullah", "Toor", "Umer Kha"];

const rollEl = document.querySelector(".roll");
const rollAgainEl = document.querySelector(".roll-again");
const namesEl = document.querySelector(".names");
const winnerEl = document.querySelector(".winner");

let winners = [];

function randomName() {
  const rand = Math.floor(Math.random() * ENTRANTS.length);
  const name = ENTRANTS[rand];
  namesEl.innerText = name;
}

confetti({
  particleCount: 150,
  spread: 100,
  origin: { y: 0.6 },
  disableForReducedMotion: true,
});

function rollClick() {
  rollEl.classList.add("hide");
  rollAgainEl.classList.add("hide");
  winnerEl.classList.add("hide");
  namesEl.classList.remove("hide");

  setDeceleratingTimeout(randomName, 10, 30);

  setTimeout(() => {
    namesEl.classList.add("hide");
    winnerEl.classList.remove("hide");
    rollAgainEl.classList.remove("hide");

    const winner = namesEl.innerText;
    winnerEl.innerText = winner;
    winnerEl.innerHTML = `<span>And the winner is...</span><br>${winner}`;
    confetti();
    lol();
  }, 4000);
}

function setDeceleratingTimeout(callback, factor, times) {
  const internalCallback = ((t, counter) => {
    return () => {
      if (--t > 0) {
        setTimeout(internalCallback, ++counter * factor);
        callback();
      }
    };
  })(times, 0);

  setTimeout(internalCallback, factor);
}

function lol() {
  const l = namesEl.innerText;
  winners.push(l);
  let temp = l;
  ENTRANTS = ENTRANTS.filter((item) => item !== temp);
  console.log(winners);
  console.log(ENTRANTS);
  document.getElementById("arrPrint").innerHTML = winners;
}

require("fs").writeFile("demo.txt", "Foo bar!");
