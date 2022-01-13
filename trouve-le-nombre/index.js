//element du DOM
const divVies = document.querySelector(".vies");
const message = document.getElementById("message");
const formulaire = document.getElementById("inputBox");
const input = document.getElementById("number");
const essayerBtn = document.getElementById("essayerBtn");
const rejouerBtn = document.getElementById("rejouerBtn");
const body = document.getElementsByTagName("body")[0];

const coeurVide = '<ion-icon name="heart-outline"></ion-icon>';
const coeurPlein = ' <ion-icon name="heart"></ion-icon>';

const bgFroid = "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)";
const bgTiede = "linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)";
const bgChaud = "linear-gradient(120deg, #f6d365 0%, #fda085 100%)";
const bgBrulant =
  "linear-gradient(to right, #ff8177 0%, #ff867a 0%, #ff8c7f 21%, #f99185 52%, #cf556c 78%, #b12a5b 100%)";

const bgWin = "linear-gradient(to right, #c1c161 0%, #c1c161 0%, #d4d4b1 100%)";
const bgLoose =
  "linear-gradient(to right, #c1c161 0%, #c1c161 0%, #d4d4b1 100%)";

const play = () => {
  const randomNumber = Math.floor(Math.random() * 101);
  const totalVies = 8;
  let vies = totalVies;
  console.log(randomNumber);

  formulaire.addEventListener("submit", (e) => {
    e.preventDefault();
    const valeurInput = parseInt(input.value);

    if (valeurInput < 0 || valeurInput > 100) return;

    if (valeurInput === randomNumber) {
      body.style.backgroundImage = bgWin;
      message.textContent = `bravo !!! le nombre était bien ${randomNumber}`;
      rejouertBtn.style.display = "block";
    }
    if (valeurInput !== randomNumber) {
      if (randomNumber < valeurInput + 3 && randomNumber > valeurInput - 3) {
        body.style.backgroundImage = bgBrulant;
        message.textContent = "C'est brulant !!! ";
      } else if (
        randomNumber < valeurInput + 6 &&
        randomNumber > valeurInput - 6
      ) {
        body.style.backgroundImage = bgChaud;
        message.textContent = "C'est chaud ";
      } else if (
        randomNumber < valeurInput + 11 &&
        randomNumber > valeurInput - 11
      ) {
        body.style.backgroundImage = bgTiede;
        message.textContent = "C'est Tiède ";
      } else {
        body.style.backgroundImage = bgFroid;
        message.textContent = "C'est Froid ";
      }
      vies--; // on lui enleve 1
      verifyLoose(); //fonction qui verifie si on a perdu donc nb de vie = 0
    }
    actualiseCoeur(vies);
  });

  const verifyLoose = () => {
    if (vies === 0) {
      body.style.backgroundImage = bgLoose;
      body.style.color = "#990000";
      essayerBtn.setAttribute("disabled", ""); //desactiver le bouton essayer
      message.textContent = `vous avez perdu la reponse était ${randomNumber}`;
      rejouerBtn.style.display = "block";
    }
  };

  const actualiseCoeur = (vies) => {
    divVies.innerHTML = "";
    let tableauDeVies = [];
    for (let i = 0; i < vies; i++) {
      tableauDeVies.push(coeurPlein);
    }
    for (let i = 0; i < totalVies - vies; i++) {
      tableauDeVies.push(coeurVide);
    }
    tableauDeVies.forEach((coeur) => {
      divVies.innerHTML += coeur; // pour chaque coeur il va le rajouter en plus aux autres
    });
  };
  actualiseCoeur(vies);
  rejouerBtn.addEventListener("click", () => {
    message.style.display = "none";
    document.location.reload(true);
  });
};

play();
