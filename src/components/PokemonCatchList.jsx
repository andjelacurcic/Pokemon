
import { useLoaderData } from "react-router-dom";
import Pokemon from "./Pokemon";
import classes from "./PokemonCatchList.module.css";

function PokemonCatchList() {
  const pokemons = useLoaderData();



  return (
    <>
      { pokemons.length > 0 && (
        <ul className={classes.posts}>
          {pokemons.map((pokemon) => (
            <Pokemon key={pokemon.body} id={pokemon.id} author={pokemon.author} body={pokemon.body} />
          ))}
        </ul>
      )}
      { pokemons.length === 0 && 
      (<div>Nema postova</div>)}
      
    </>
  );
}

export default PokemonCatchList;
