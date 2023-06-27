const fs = require('node:fs/promises');

async function getStoredPokemons() {
  const rawFileContent = await fs.readFile('pokemons.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedPokemons = data.pokemons ?? [];
  return storedPokemons;
}

function storePokemons(pokemons) {
  return fs.writeFile('pokemons.json', JSON.stringify({ pokemons: pokemons || [] }));
}

exports.getStoredPokemons = getStoredPokemons;
exports.storePokemons = storePokemons;