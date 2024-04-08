// https://pokeapi.co/api/v2/  -> enten: pokemon, encounter-method, berry, move, region, location, osv..

const base = "https://pokeapi.co/api/v2/";
const pokeButton = document.querySelector(".pokemonButton");
const itemButton = document.querySelector(".itemButton");
const berryButton = document.querySelector(".berryButton");

const pokemonKonteirer = document.querySelector(".pokemonKonteirer");
const itemKonteirer = document.querySelector(".itemKonteirer");
const berryKonteirer = document.querySelector(".berryKonteirer");

const buttons = [pokeButton, itemButton, berryButton];
const konteirers = {
  pokemonSide: pokemonKonteirer,
  itemSide: itemKonteirer,
  berrySide: berryKonteirer,
};

let side = "";

function updateDisplay() {
  for (const key in konteirers) {
    if (key.includes(side)) {
      konteirers[key].style.display = "block";
    } else {
      konteirers[key].style.display = "none";
    }
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", (event) => {
    side = event.target.dataset.side;
    updateDisplay();
  });
});

// Pokemon input og shit:

const pokemonDiv = document.querySelector(".pokemon");
const pokeInput = document.querySelector(".pokeInput");
const PokesearchButton = document.querySelector(".PokesearchButton");

PokesearchButton.addEventListener("click", () => {
  if (pokeInput.value) {
    
    fetch(`${base}pokemon/${pokeInput.value}`)
      .then((response) => response.json())
      .then((data) => {
        pokemonDiv.innerHTML = `
          <img src="${data.sprites.other.dream_world.front_default}" alt="">
          <h3>${data.name}</h3>
          <p>ID: ${data.id}</p>
          <p>Description:</p>
          <p>Type: ${data.types[0].type.name}</p>
          <p>Height: ${data.height}</p>
          <p>Weight: ${data.weight} lbs</p>
          <p>Abilities: ${data.abilities[0].ability.name}, ${data.abilities[1].ability.name}</p>
          <p></p>
          <p>Stats:</p>
          <p>HP: ${data.stats[0].base_stat}</p>
          <p>Attack: ${data.stats[1].base_stat}</p>
          <p>Defense: ${data.stats[2].base_stat}</p>
          <p>Special Attack: ${data.stats[3].base_stat}</p>

          <p>Where to find:</p>
          
        `;
        fetch(`${base}encounter-method/${data.id}`)
          .then((response) => response.json())
          .then((data2) => {
            console.log(data);
          })
      });
    }
});