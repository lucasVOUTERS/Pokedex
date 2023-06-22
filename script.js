const gridDiv = document.getElementById('grid');
gridDiv.style.hidden = true;

const Pokedex = document.getElementById('pokeball');

const popUpDiv = document.getElementById('popup');
const popUpContent = document.getElementById('popUpContent');
const pokemonList = document.getElementById('pokemonList');
const inputSearch = document.getElementById('inputSearch');

let pokemons = [];
var images = [];

var lastScrollTop = 0;
var rotation = 0

document.addEventListener("scroll", function(){
    Pokedex.style.transform = "rotate(" + window.pageYOffset/10 + "deg)";
});

inputSearch.addEventListener("input", e => {
    const value = e.target.value;
    for (let index = 0; index <= pokemons.length; index++) {
        const pokemon = pokemons[index];
        const isVisible = pokemon.name.toLowerCase().includes(value.toLowerCase()) || pokemon.types.find(type => type.name.toLowerCase().includes(value.toLowerCase()));
        pokemon.element.classList.toggle("hide", !isVisible);
    }
})

const tabTypes = {
    "Acier": "rgba(183, 183, 206, 1)",
    "Combat": "rgba(194, 46, 40, 1)",
    "Dragon": "rgba(111, 53, 252, 1)",
    "Eau": "rgba(99, 144, 240, 1)",
    "Électrik": "rgba(247, 208, 44, 1)",
    "Fée": "rgba(214, 133, 173, 1)",
    "Feu": "rgba(238, 129, 48, 1)",
    "Glace": "rgba(150, 217, 214, 1)",
    "Insecte": "rgba(166, 185, 26, 1)",
    "Normal": "rgba(168, 167, 122, 1)",
    "Plante": "rgba(122, 199, 76, 1)",
    "Poison": "rgba(163, 62, 161, 1)",
    "Psy": "rgba(249, 85, 135, 1)",
    "Roche": "rgba(182, 161, 54, 1)",
    "Sol": "rgba(226, 191, 101, 1)",
    "Spectre": "rgba(115, 87, 151, 1)",
    "Ténèbres": "rgba(112, 87, 70, 1)",
    "Vol": "rgba(169, 143, 243, 1)",
}

setTimeout(() => {
    const tempo = document.getElementById('tempoBack');
    tempo.remove();
    setTimeout(() => {
        const logo = document.getElementById('pokeballLogo');
        logo.remove();
    }, 500);
}, 2000);


fetch('https://api-pokemon-fr.vercel.app/api/v1/gen/1')
  .then(response => response.json())
  .then(data => {
    pokemons = data.map(pokemon => {
        if(pokemon.pokedexId !=0){
            const poke = document.createElement('div');
            poke.classList.add('item');
    
            poke.addEventListener("click", function(){
                //location.href=`details.html?pokemonName=${pokemon.name.fr}`;
                popUp(pokemon.pokedexId);
            });
    
            if(Object.keys(pokemon.types).length > 1){
                preload(pokemon.types[0].image);
                preload(pokemon.types[1].image);
                const type1 = tabTypes[pokemon.types[0].name];
                const type2 = tabTypes[pokemon.types[1].name];
                poke.style.backgroundImage = `linear-gradient(to right top, ${type1} 50%, ${type2} 50%)`;
                poke.style.setProperty('--item-box-shadow', '5px -5px 10px 5px '+ type2 +', -5px 5px 10px 5px ' + type1);
            } else{
                preload(pokemon.types[0].image);
                const typeColor = tabTypes[pokemon.types[0].name];
                poke.style.background = typeColor;
                poke.style.setProperty('--item-box-shadow', '5px -5px 10px 5px '+ typeColor +', -5px 5px 10px 5px ' + typeColor);
            }
    
            preload(pokemon.sprites.regular);
    
            const imgPoke = document.createElement('img');
            imgPoke.src = pokemon.sprites.regular
    
            const pokeName = document.createElement('div');
            pokeName.classList.add('pokemonFont');
            const pokemonName = pokemon.name.fr
            pokeName.innerHTML = pokemonName;
    
            poke.appendChild(imgPoke);
            poke.appendChild(pokeName);
            gridDiv.appendChild(poke);
    
            return { id: pokemon.pokedexId, types: pokemon.types, img: pokemon.sprites.regular, name: pokemon.name.fr, stats: pokemon.stats, element: poke};
        }
    })
    gridDiv.style.hidden = false;
  })

function popUp(pokemonId) {
    var pokemon = pokemons[pokemonId-1];
    var pokemonId = String(pokemon.id).padStart(4, '0');
    let htmlString = `
            <div class="pokemonDetails" style="align-self: flex-start;">#${pokemonId}</div>
            <img id="pokeImg" src="${pokemon.img}"/>
            <div class="pokemonFont">${pokemon.name}</div>`;

    if(pokemon.types.length > 1){
        htmlString = htmlString + `
            <div>
                <img src="${pokemon.types[0].image}" alt="${pokemon.types[0].name}">
                <img src="${pokemon.types[1].image}" alt="${pokemon.types[1].name}">
            </div>
        `;
    } else{
        htmlString += `
            <img src="${pokemon.types[0].image}" alt="${pokemon.types[0].name}">
        `;
    }
    
    htmlString +=`<div class="pokemonDetails">`;

    Object.entries(pokemon.stats).forEach(([key, value]) => {
        htmlString +=`
            <div>
                <label class="statsName" for="${key}">${key}:</label>
                <progress id="${key}" max="255" value="${value}"></progress>
                <label class="statsValues">${value}</label>
            </div>
        `;
    });

    htmlString +=`</div>`;
    
    popUpDiv.classList.add('popUpShow');
    popUpContent.innerHTML = htmlString;
    pokemonList.style.filter = "blur(5px)";
    pokemonList.style.pointerEvents = "none";
}

function closePopup() {
    popUpDiv.classList.remove('popUpShow');
    pokemonList.style.filter = "";

    setTimeout(() => {
        popUpContent.innerHTML = "";
        pokemonList.style.pointerEvents = "";
    }, 200)
}

let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function preload(img) {
    var length = images.length;
    images[length] = new Image();
    images[length].src = img;
}