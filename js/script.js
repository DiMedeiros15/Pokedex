/* Auto : Diego <https://www.linkedin.com/in/diego-medeiros-66a504166/> */

const pokemonNome = document.querySelector(".pokemon-nome");
const pokemonImage = document.querySelector(".pokemon_image");
const pokemonNumero = document.querySelector(".pokemon-numero");

const form = document.querySelector(".form");
const input = document.querySelector(".search");

const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

let titulo = document.querySelector(".title");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const ApiResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (ApiResponse.status === 200) {
    const data = await ApiResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {

  pokemonNome.innerHTML = 'Carregando ...'
  pokemonNumero.innerHTML = '';

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImage.style.display = 'block';
    pokemonNumero.innerHTML = data.id;
    pokemonNome.innerHTML = data.name;
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];

    input.value = "";
    searchPokemon = data.id
    titulo.innerHTML = ` Pokedex - ${data.name}`;
  } else {
    pokemonImage.style.display = 'none';
    pokemonNome.innerHTML = 'Não encontrado :( ';
    pokemonNumero.innerHTML = '';
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  renderPokemon(input.value.toLowerCase());
});

btnPrev.addEventListener("click", () => {
  if (searchPokemon === 1) {
    
  } else {
    searchPokemon -= 1 ;
    renderPokemon(searchPokemon);
  }
  
});

btnNext.addEventListener("click", () => {
  searchPokemon += 1 ;
  renderPokemon(searchPokemon)
});

renderPokemon (searchPokemon);
