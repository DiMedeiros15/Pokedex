const pokemonNome = document.querySelector(".pokemon-nome");
const pokemonImage = document.querySelector(".pokemon_image");
const pokemonNumero = document.querySelector(".pokemon-numero");

const form = document.querySelector(".form");
const input = document.querySelector(".search");
const fetchPokemon = async (pokemon) => {
  const ApiResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`
  );

  if (ApiResponse.status === 200) {
    const data = await ApiResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonNumero.innerHTML = data.id;
    pokemonNome.innerHTML = data.name;
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];

    input.value = "";
  } else {
    pokemonNumero.innerHTML = 'Não encontrado :( ';
    pokemonNumero.innerHTML = '';
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  renderPokemon(input.value);
});
