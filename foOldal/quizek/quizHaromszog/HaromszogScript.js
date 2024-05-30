const foAblak = document.getElementById('foAblak');
const correctAnswer = document.getElementById('correctAnswer');
const kovKerdesGomb = document.getElementById('kovKerdes');
const valaszA = document.getElementById('answerA');
const valaszB = document.getElementById('answerB');
const valaszC = document.getElementById('answerC');
const valaszD = document.getElementById('answerD');
const szoveg = document.getElementById('szoveg');
const javitas = document.getElementById('javitas');
const magyarazatLink = document.getElementById('magyarazatLink');
const osszesGomb = document.querySelectorAll('.button');
const gombLista1 = document.getElementById('gombLista1');
const gombLista2 = document.getElementById('gombLista2');
const hibaAblak = document.getElementById('hibaKi');

const valaszMatrix = [
    ['180', '360', '0', '90'],
    ['c<a+b', 'a+b<c', 'a=b=c', 'a+c<b'],
    ['Két szöge egyenlő', 'Oldalaik aránya egyenlő', 'Szögeik egyenlőek és  megfelelő oldalak aránya egyenlő', 'Két oldalpár aránya egyenlő'],
    ['A legkissebb', 'A legnagyobb', 'A középső', 'Nem lehet megmondani'],
    ['Igaz', 'Hamis', 'Nem tudom', 'Nem lehet megmondani'],
    ['60', 'Változó', '30, 60, 90', '40, 40, 100'],
    ['Hegyes', 'Tompa', 'Nyúlt', 'Derék'],
    ['Igaz', 'Hamis', 'Általában igaz', 'Nem tudom'],
    ['Szögfelező', 'Magasság', 'Gellért-vonal', 'Oldalfelező'],
    ['Szögek aránya', 'Oldalak aránya', 'Háromszögek hasonlósága', 'Mindhárom'],
    ['6', '9', '12', '15'],
];

//ide deklarald a valaszokat
const helyesValaszok  = ['a', 'a', 'd', 'b', 'a', 'd', 'a', 'c', 'b', 'b'];
//ide a helyes valaszok szovegreszet
const helyesValaszokSzoveg = [
    ['180'],
    ['c<a+b'],
    ['Két oldalpár aránya egyenlő'],
    ['A legnagyobb'],
    ['60'],
    ['Derék'],
    ['Igaz'],
    ['Gellért-vonal'],
    ['Oldalak aránya'],
    ['9'],
]
//ide a helyes valaszok/kerdes temajat
const helyesValaszTema = [
    ['tema 0'],
    ['tema 1'],
    ['tema 2'],
    ['tema 3'],
    ['tema 4'],
    ['tema 5'],
    ['tema 6'],
    ['tema 7'],
    ['tema 8'],
    ['tema 9'],
]
//ide a tema dokumentaciojanak linkjet
const helyesValaszLink = [
    ['./haromszogek.html'],
    ['./haromszogek.html'],
    ['./haromszogek.html'],
    ['./haromszogek.html'],
    ['./haromszogek.html'],
    ['./haromszogek.html'],
    ['./haromszogek.html'],
    ['./haromszogek.html'],
    ['./haromszogek.html'],
    ['./haromszogek.html'],
]
const kerdesMatrix = [
    ['Mekkora a háromszög belső szögeinek összege fokban kifejezve?'],
    ['Mikor lehetne az a<=b<=c számok egy háromszög oldalai?'],
    ['Mekkora egy derékszög mértéke fokben kifejezve?'],
    ['Mikor NEM hasonló két háromszög?'],
    ['A háromszög melyik szögével van szemben a leghosszabb oldal?'],
    ['Mekkorák az egyenlő oldalú háromszög szögei?'],
    ['Milyen szöget tartalmaz a derékszögű  háromszög?'],
    ['Az egyenlő szárú háromszög alapon fekvő szögei egyenelőek?'],
    ['Melyik nevezetes vonal nem létezik?'],
    ['Mikre vonatkozik a szögfelező tétel?'],
    ['Hány nevezetes pont van a Feuerbach-körön?'],
];




const maxKerdes = 10;

let answered = false;
let kerdesSzam;
let kerdesMertek =0;
let valasz;
let pontszam = 0;
let frekv = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let hibaMatrix = [
    []
];
let hibaSzam = 0;

function hibaKi() {
    for (let i = 0; i < hibaSzam; i++){
        let para = document.createElement("p");

        para.innerText = hibaMatrix[i];
        para.style.zIndex = 9999; // Set a high z-index value
        para.style.alignSelf = 'center';
        hibaAblak.appendChild(para); // Append the element to the body or an appropriate container
    }
}

function checkAnswer() {
    if (!answered) {
        valaszA.removeEventListener('click', dontesA);
        valaszB.removeEventListener('click', dontesB);
        valaszC.removeEventListener('click', dontesC);
        valaszD.removeEventListener('click', dontesD);
        if (valasz === helyesValaszok[kerdesSzam]) {
            foAblak.style.backgroundColor = '#1f9d89';
            kovKerdesGomb.style.visibility = 'visible';
            pontszam++;
            if (valasz === 'a'){
                valaszA.style.background = 'grey';
            } else if (valasz === 'b') {
                valaszB.style.background = 'grey';
            } else if (valasz === 'c') {
                valaszC.style.background = 'grey';
            } else if (valasz === 'd') {
                valaszD.style.background = 'grey';
            }
        } else {
            hibaMatrix[hibaSzam] = kerdesMatrix[kerdesSzam] + ' ' +helyesValaszokSzoveg[kerdesSzam];

            foAblak.style.backgroundColor = '#c6010f';
            correctAnswer.style.visibility = 'visible';
            kovKerdesGomb.style.visibility = 'visible';
            javitas.textContent = 'A helyes valasz: ' + helyesValaszokSzoveg[kerdesSzam];
            magyarazatLink.href = helyesValaszLink[kerdesSzam];
            if (valasz === 'a'){
                valaszA.style.background = 'grey';
            } else if (valasz === 'b') {
                valaszB.style.background = 'grey';
            } else if (valasz === 'c') {
                valaszC.style.background = 'grey';
            } else if (valasz === 'd') {
                valaszD.style.background = 'grey';
            }
            
            hibaSzam++;
        }
        answered = true;
    }
    kovKerdesGomb.textContent = 'Következő kérdés';
    kovKerdesGomb.addEventListener('click', quizKezd);
}

function dontesA() {
    console.log('a');
    valasz = 'a';
    kovKerdesGomb.style.visibility = 'visible';
    valaszA.style.background = 'grey';
    valaszB.style.background = 'lightgrey';
    valaszC.style.background = 'lightgrey';
    valaszD.style.background = 'lightgrey';
}

function dontesB() {
    console.log('b');
    valasz = 'b';
    kovKerdesGomb.style.visibility = 'visible';
    valaszA.style.background = 'lightgrey';
    valaszB.style.background = 'grey';
    valaszC.style.background = 'lightgrey';
    valaszD.style.background = 'lightgrey';
}

function dontesC() {
    console.log('c');
    valasz = 'c';
    kovKerdesGomb.style.visibility = 'visible';
    valaszA.style.background = 'lightgrey';
    valaszB.style.background = 'lightgrey';
    valaszC.style.background = 'grey';
    valaszD.style.background = 'lightgrey';
}

function dontesD() {
    console.log('d');
    valasz = 'd';
    kovKerdesGomb.style.visibility = 'visible';
    valaszA.style.background = 'lightgrey';
    valaszB.style.background = 'lightgrey';
    valaszC.style.background = 'lightgrey';
    valaszD.style.background = 'grey';
}

function randomSzam() {
    kerdesSzam = Math.floor(Math.random() * 10);
}

function quizKezd() {
    valaszA.style.background = 'lightgray';
    valaszB.style.background = 'lightgray';
    valaszC.style.background = 'lightgray';
    valaszD.style.background = 'lightgray'; 

    hibaAblak.innerHTML = '';

    while (frekv[kerdesSzam] != 0 && kerdesMertek != maxKerdes) {
        randomSzam();
    }
    console.log(kerdesSzam + ' ' + kerdesMertek);
    szoveg.style.fontSize = 'x-large';
    if (kerdesMertek<=9) {
        valaszA.removeEventListener('click', dontesA);
        valaszB.removeEventListener('click', dontesB);
        valaszC.removeEventListener('click', dontesC);
        valaszD.removeEventListener('click', dontesD);

        kovKerdesGomb.removeEventListener('click', checkAnswer);
        kovKerdesGomb.removeEventListener('click', quizKezd);
        
        valaszA.addEventListener('click', dontesA);
        valaszB.addEventListener('click', dontesB);
        valaszC.addEventListener('click', dontesC);
        valaszD.addEventListener('click', dontesD);

        kovKerdesGomb.textContent = 'Válasz jóváhagyása';
        kovKerdesGomb.addEventListener('click', checkAnswer);
    
        szoveg.style.visibility = 'visible';
        valaszA.style.visibility = 'visible';
        valaszB.style.visibility = 'visible';
        valaszC.style.visibility = 'visible';
        valaszD.style.visibility = 'visible';
        gombLista1.style.visibility = 'visible';
        gombLista2.style.visibility = 'visible';
        foAblak.style.backgroundColor = 'white';
        correctAnswer.style.visibility = 'visible';
        kovKerdesGomb.style.visibility = 'visible';

        szoveg.textContent = kerdesMatrix[kerdesSzam];
        valaszA.textContent = valaszMatrix[kerdesSzam][0];
        valaszB.textContent = valaszMatrix[kerdesSzam][1];
        valaszC.textContent = valaszMatrix[kerdesSzam][2];
        valaszD.textContent = valaszMatrix[kerdesSzam][3];
    
        answered = false;
        foAblak.style.backgroundColor = 'white';
        correctAnswer.style.visibility = 'hidden';
        kovKerdesGomb.style.visibility = 'hidden';
        
        frekv[kerdesSzam]++;
        kerdesMertek++;
    } else {
        quizVege();
    }
}

function kovKerdes(kerdesSzam) {
    correctAnswer.style.visibility = 'hidden';
    foAblak.style.backgroundColor = 'white';
}


function quizVege() {
    valaszA.style.visibility = 'hidden';
    valaszB.style.visibility = 'hidden';
    valaszC.style.visibility = 'hidden';
    valaszD.style.visibility = 'hidden';
    gombLista1.style.visibility = 'hidden';
    gombLista2.style.visibility = 'hidden';

    foAblak.style.backgroundColor = 'white';
    correctAnswer.style.visibility = 'hidden';
    kovKerdesGomb.style.visibility = 'hidden';

    szoveg.style.visibility = 'visible';
    szoveg.style.fontSize = 'xx-large';
    szoveg.textContent = "Elért pontszám: " + pontszam;

    kovKerdesGomb.textContent = 'Quiz ujrakezdese';
    kovKerdesGomb.style.visibility = 'visible';

    for (let i=0; i<=9; i++) {
        frekv[i]=0;
    }
    kerdesMertek = 0;
    pontszam = 0;

    hibaKi();

    kovKerdesGomb.addEventListener('click', quizKeszit);
}

quizKezd();