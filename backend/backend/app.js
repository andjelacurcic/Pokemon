const express = require('express');
const bodyParser = require('body-parser');

const { getStoredPokemons, storePokemons } = require('./data/pokemons');

const app = express();


app.use(bodyParser.json());

app.use((req, res, next) => {
  // Attach CORS headers
  // Required when using a detached backend (that runs on a different domain)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/pokemons', async (req, res) => {
  const storedPokemons = await getStoredPokemons();
  // await new Promise((resolve, reject) => setTimeout(() => resolve(), 3000));
  res.json({ pokemons: storedPokemons });
});

app.get('/pokemon/:id', async (req, res) => {
  const storedPokemons = await getStoredPokemons();
  const pokemon = storedPokemons.find((pokemon) => pokemon.id === req.params.id);
  res.json({ pokemon });
});

app.post('/pokemons', async (req, res) => {
  const existingPokemons = await getStoredPokemons();
  const pokemonData = req.body;
  const newPokemon = pokemonData;
  const updatedPokemons = [newPokemon, ...existingPokemons];
  await storePokemons(updatedPokemons);
  res.status(201).json({ message: 'Stored new pokemon.', pokemon: newPokemon });
});

app.delete('/pokemon/:id', async(req,res) => {
  const storedPokemons = await getStoredPokemons();
  const pokemonIndex = storedPokemons.findIndex((pokemon) => pokemon.id === req.params.id);
  if(pokemonIndex !== -1){
    const deletePokemon = storedPokemons.splice(pokemonIndex,1);
    await storePokemons(storedPokemons);
    res.json({message: 'deleted pokemon', pokemon:deletePokemon});

  } else {
    res.status(404).json({message:'Pokemon not found'});
  }
})

app.listen(8082);
