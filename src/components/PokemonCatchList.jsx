import { useLoaderData } from "react-router-dom";
import Pokemon from "./Pokemon";
import classes from "./PokemonCatchList.module.css";

function PokemonCatchList() {
  const pokemons = useLoaderData();

  return (
    <>
      {pokemons.length > 0 && (
        <ul className={classes.posts}>
          {pokemons.map((pokemon) => (
            <Pokemon
              key={pokemon.body}
              id={pokemon.id}
              img={pokemon.img}
              name={pokemon.name}
              species={pokemon.species}
            />
          ))}
        </ul>
      )}
      {pokemons.length === 0 && <div>No pokemons available</div>}
    </>
  );
}

export default PokemonCatchList;
