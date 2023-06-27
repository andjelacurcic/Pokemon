import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import classes from "./PokemonDetails.module.css";
import axios from "axios";

function PokemonDetails(props) {
  // const post = useLoaderData();
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rate, setRate] = useState();
  const { id } = useParams();
  const [description, setDescription] = useState([]);
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const data = response.data;
        const responseRate = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        );
        const dataRate = responseRate.data;
        setPokemonData(data);
        setRate(dataRate.capture_rate);
        setLoading(false);
      } catch (error) {
        console.error("error fetching Pokemon data", error);
      }
    };
    const fetchWithRateLimit = async () => {
      const requestLimit = 5;
      const delayBetweenRequest = 1000 / requestLimit;

      for (let i = 0; i < requestLimit; i++) {
        fetchData();
        await delay(delayBetweenRequest);
      }
    };

    fetchWithRateLimit();
  }, []);

  const fetchAbilityDescription = async (abilityName) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/ability/${abilityName}`
      );
      const description = response.data.effect_entries.find(
        (entry) => entry.language.name === "en"
      ).effect;
      return description;
    } catch (error) {
      console.error("Error fetching ability description", error);
      return "";
    }
  };

  const getAbilityDescription = async (abilityName) => {
    if (!description[abilityName]) {
      const description = await fetchAbilityDescription(abilityName);
      setDescription((prevState) => ({
        ...prevState,
        [abilityName]: description,
      }));
    }
  };

  const postPokemon = async () => {
    try {
      const existingPokemonsResponse = await axios.get(
        "http://localhost:8082/pokemons"
      );
      const existingPokemons = existingPokemonsResponse.data.pokemons;
      const pokemonExists = existingPokemons.some((p) => p.id === id);
      if (pokemonExists) {
        alert("Pokemon exists");
        return;
      }
      const pokemon = {
        id: id,
        name: pokemonData.name,
        species: pokemonData.name,
        img: pokemonData.sprites.front_default,
      };
      console.log(pokemon);

      const response = await axios.post(
        "http://localhost:8082/pokemons",
        pokemon
      );
      alert("Pokemon added");
      window.location.reload();
    } catch (error) {
      console.error("greska");
    }
  };

  if (loading) {
    return <h1>loading...</h1>;
  }

  if (!pokemonData) {
    return <h1>poke not found</h1>;
  }

  return (
    <Modal>
      <main className={classes.post}>
        <h1></h1>
        <img src={pokemonData.sprites.front_default} alt="" />
        <p className={classes.author}>{pokemonData.name}</p>
        <div className={classes.text}>
          <p>species: {pokemonData.species.name}</p>
          <p>rate: {rate}</p>
          <p>height: {pokemonData.height}</p>
          <p>weight: {pokemonData.weight}</p>
        </div>
        <h2>Abilities:</h2>
        <ul>
          {pokemonData.abilities.map((ability, index) => (
            <li key={ability.ability.name}>
              {ability.ability.name + "->"}
              <button
                onClick={() => getAbilityDescription(ability.ability.name)}
                className={classes.button}
              >
                Show description{" "}
              </button>
              <p>{description[ability.ability.name]}</p>
            </li>
          ))}
        </ul>
        <p>
          <button onClick={() => postPokemon()} className={classes.buttonCatch}>
            add to catch list
          </button>
        </p>
      </main>
    </Modal>
  );
}

export default PokemonDetails;
