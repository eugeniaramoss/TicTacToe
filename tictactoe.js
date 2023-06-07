let turno = true;

let tablero = document.getElementsByClassName("casilla");

let posicionX = [];
let posicionO = [];

/**
 * @param {number} i
 * @returns {none}
*/

function agregarFicha(i){
    if(turno){
        tablero[i].textContent = 'X';
        posicionX.push(i);
        posicionX.sort();
        
        if(posicionX.length >=3){
            hayGanador(posicionX);
        }
    }else{
        tablero[i].textContent = 'O';
        posicionO.push(i);
        posicionO.sort();
        
        if(posicionO.length >=3){
            hayGanador(posicionO);
        }
    }

    tablero[i].removeAttribute('onclick');
    turno = !turno;
}

let combinacionGanadora = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

let ganaX = 0;
let ganaO = 0;

/**
 * @param {Array} posiciones 
 * @returns {none}
*/

function hayGanador(posiciones){
    for(let i=0; i<combinacionGanadora.length; i++){
        let contador = 0;

        for(let j=0; j<posiciones.length; j++){
            if(combinacionGanadora[i].includes(posiciones[j])){
                contador++;
            }
        }

        if(contador == 3){
            for(let k=0; k<combinacionGanadora[i].length; k++){
                tablero[combinacionGanadora[i][k]].style.backgroundColor = 'rgb(120, 120, 120)';
            }

            if(turno){
                ganaX++;
                
                for(let i=0; i<tablero.length; i++){
                    tablero[i].removeAttribute('onclick')
                }
            }else{
                ganaO++;
                
                for(let i=0; i<tablero.length; i++){
                    tablero[i].removeAttribute('onclick')
                }
            }
            tablero[i].removeAttribute('onclick');
            actualizarContador();
        }
    }
}

let contadorX;
let contadorO;

/**
 * @param {none}
 * @returns {none}
*/

function actualizarContador(){
    contadorX = document.getElementById('contadorX');
    contadorO = document.getElementById('contadorO');

    contadorX.textContent = `X: ${ganaX}`;
    contadorO.textContent = `O: ${ganaO}`;
}

/**
 * @param {Array} tablero
 * @returns {none}
*/

function reiniciarPartida(tablero){
    for(let i=0; i<tablero.length; i++){
        tablero[i].removeAttribute('onclick');
        tablero[i].textContent='';

        tablero[i].style.backgroundColor = "white";

        posicionO = [];
        posicionX = [];

        tablero = document.getElementsByClassName("casilla");
        tablero[i].setAttribute('onclick', `agregarFicha(${i})`);

        turno = true;
    }
}