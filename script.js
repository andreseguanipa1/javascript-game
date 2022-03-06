/* ----------------------
    Elementos del html
  ----------------------- */

var body = document.body;
var character = document.getElementById("character");
var block = document.getElementById("block");
var coin = document.getElementById("coin");
var pcoin = document.getElementById("p-coins");
var game = document.querySelector(".game");
var labels = document.querySelectorAll(".labelLevels");

let lvl1 = document.getElementById("lvl1");
let lvl2 = document.getElementById("lvl2");
let lvl3 = document.getElementById("lvl3");

let score1 = document.getElementById("score1");
let score2 = document.getElementById("score2");
let score3 = document.getElementById("score3");
let p = document.querySelectorAll("p");

/* ----------------------
        Variables
  ----------------------- */

var counter = 0;
var lastCounter = 0;
let bestScore = [];
let best = 0;
var lives = 3;
var win = 0;
var coins = 0;


/* ----------------------
      Codigo del juego
  ----------------------- */


function jump() {       // Funcion de salto
    if (character.classList == "animate") { return }
    character.classList.add("animate");
    setTimeout(function () {
        character.classList.remove("animate");
    }, 600);
}

setInterval(function () {

    let contador = counter / 20;

    if (win === 1) {
        changeColor('#000', '#fff', 'rgb(59, 59, 59)'); // Si gana, el juego empieza en su color original
        win = 0;
    }

    coin.style.display = "block";
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));    // Tomamos la posicion del personaje
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));          // Tomamos la posicion del obstaculo
    let CoinLeft = parseInt(window.getComputedStyle(coin).getPropertyValue("left"));            // Tomamos la posicion de la moneda

    document.getElementById("lives").innerHTML = `<b>${lives}</b>`;
    document.getElementById("bestScore").innerHTML = `<b>${best}</b>`;
    pcoin.innerHTML = `<b>${coins}</b>`;

    if (CoinLeft < 50 && CoinLeft > -50 && characterTop >= 470 && contador > lastCounter) {       // Verificamos si atrapo la moneda

        coin.style.display = "none !important";
        coins++;
        lastCounter = contador + 3;
    }


    if (blockLeft < 50 && blockLeft > -50 && blockLeft != -38 && characterTop >= 450) {     // Si pierde... 

        console.log(`Position: ${blockLeft}`);

        lives = lives - 1;
        console.log(lives);

        changeColor('#000', '#fff', 'rgb(59, 59, 59)'); // Regresa al color original del juego

        bestScore.push(Math.floor(counter / 20));

        bestScore.map(scores => {
            if (scores > best) {
                best = scores;
            }
        })

        if (lives != 0) {  // Si aun tiene vidas restantes, se le resta una

            block.style.animation = "none";
            alert(`You've got ${Math.floor(lives) === 1 ? `${Math.floor(lives)} life` : `${Math.floor(lives)} lives`}`);
            counter = 0;
            document.getElementById("bestScore").innerHTML = `<b>${best}</b>`;

        } else { // Si tiene cero vidas, pierde

            block.style.animation = "none";
            alert("Game Over. \nScore: " + Math.floor(counter / 20) + ". \nBest Score: " + best);
            lives = 3;
            best = 0;

            for (let i = 0; i < (bestScore.length); i++) {
                bestScore[i] = 0;
            }

        }

        lvl1.innerHTML = `<b>${lives}</b>`;
        block.style.animation = "block 2s infinite linear"; //El juego vuelve a la velocidad del nivel 1
        block.style.left = "100%";
        coin.style.left = "100%";
        coins = 0;
        lastCounter = 0;
        counter = 0;


    } else {      // Si el juego sigue...

        counter++;

        if (contador < 104) {   // NIVEL 1

            block.style.animation = "block 2s infinite linear";
            coin.style.animation = "block 2.3s infinite linear";
            score1.innerHTML = `${Math.floor(contador)}`;

            lvl1.innerHTML = "Not Done :(";
            lvl1.style.color = "#000"

            lvl2.innerHTML = "Not Done :(";
            lvl2.style.color = "#000"

            lvl3.innerHTML = "Not Done :(";
            lvl3.style.color = "#000"


        } else if (contador >= 104 && contador <= 192) {    //NIVEL 2

            block.style.animation = "block 1.6s infinite linear";   //Aumenta la velocidad
            coin.style.animation = "block 1.9s infinite linear";

            score1.innerHTML = `104`;
            score2.innerHTML = `${Math.floor(contador)}`;

            lvl1.innerHTML = "Done :)";
            lvl1.style.color = "#00b715"

        } else if (contador >= 192 && contador <= 258) {    //NIVEL 3

            changeColor('#fff', '#000', '#DDEAFF'); // Si llega al nivel 3, cambia de color

            lvl2.innerHTML = "Done :)";
            lvl2.style.color = "#00b715";
            lvl1.style.color = "#00b715";
            lvl3.style.color = "#fff";

            block.style.animation = "block 1.2s infinite linear";   //Aumenta la velocidad
            coin.style.animation = "block 1.5s infinite linear";

            score2.innerHTML = `192`;
            score3.innerHTML = `${Math.floor(contador)}`;

        } else { // Si gana, muestra un aviso

            block.style.animation = "none";
            lvl3.innerHTML = "Done :)";
            lvl3.style.color = "#00b715"
            lives = 3;
            best = 0;
            counter = 0;
            lastCounter = 0;
            coins = 0;
            win = 1;
            for (let i = 0; i < (bestScore.length); i++) {
                bestScore[i] = 0;
            }

            alert("You have won! :) \n Score: 258");

        }

        document.getElementById("scoreSpan").innerHTML = Math.floor(contador); //Siempre se va a mostrar el Score


    }


    function changeColor(color1, color2, color3) {      // Funcion para cambiar de color

        game.style.border = `1px solid ${color1}`;
        block.style.backgroundColor = color1;
        game.style.backgroundColor = color2;
        body.style.backgroundColor = color2;
        character.style.backgroundColor = color3;

        labels.forEach(levels => {
            levels.style.color = color1;
        });

        p.forEach(parrafos => {
            parrafos.style.color = color1;
        });

    }

}, 10);