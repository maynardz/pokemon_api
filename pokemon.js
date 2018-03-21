const tHead = document.getElementById("tHead");
const tBody = document.getElementById("tBody");
const searchPoke = document.getElementById("searchPoke");
const searchMoves = document.getElementById("searchMoves");

const baseURL = 'https://pokeapi.co/api/v2/pokemon/';
let url;

function searchPokemon() {
    let pokeName = searchPoke.value;
    if (pokeName.trim() == "") {
        alert ("Enter a Pokemon!")
    } else {
        url = baseURL + pokeName.toLowerCase();
        fetch(url)
        .then(response => {
            return response.json()
        }).then(data => {
            fillTable(data)
            console.log(data)
        })
    }
}

function fillTable(pokeObj) {
    while (tHead.firstChild) {
        tHead.removeChild(tHead.firstChild);
    }
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }
    tHead.innerHTML = '<tr><td><b>' + 'Pokemon:' + '</b></td><td><b>' + capFirstName(pokeObj.name) + '</b></td></tr>';
    tBody.insertAdjacentHTML("beforeend", '<tr><td>' + "PokeDex ID #: " + '</td><td>' + pokeObj.id + '</td></tr>');
    switch (pokeObj.types.length) {
        case 2: 
        tBody.insertAdjacentHTML("beforeend", '<tr><td>' + "Types:" + '</td><td>' + capFirstName(pokeObj.types[1].type.name) + '/' + capFirstName(pokeObj.types[0].type.name) + '</td><tr>');
        break;
        case 1: 
        tBody.insertAdjacentHTML("beforeend", '<tr><td>' + "Type:" + '</td><td>' + capFirstName(pokeObj.types[0].type.name) + '</td></tr>');
        break;
        default:
        break;
    }
    tBody.insertAdjacentHTML("beforeend", '<tr><td>' + "Weight:" + '</td><td>' + pokeObj.weight + ' lbs' + '</td></tr>');
    tBody.insertAdjacentHTML("beforeend", '<tr><td>' + "Normal/Shiny:" + '</td><td>' + `<img src=${pokeObj.sprites.front_default} />` + `<img src=${pokeObj.sprites.back_default} />` + '______' + `<img src=${pokeObj.sprites.front_shiny} />` + `<img src=${pokeObj.sprites.back_shiny} />` +'</td></tr>');
    tBody.insertAdjacentHTML("beforeend", '<tr><td>' + "Moves:" + '</td><td>' + capFirstName(pokeObj.moves[0].move.name) + '</td></tr>');
}

function capFirstName(x) {
    for (let j in x) {
        if (j == 0) {
            x = x.replace(x[j], x[j].toUpperCase());
        }
        if (x[j-1] == "-") {
            x = x.replace(x[j], x[j].toUpperCase());
            x = x.replace(x[j-1], " ");
        }
    }
    return x;
}
