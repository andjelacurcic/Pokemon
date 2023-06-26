import { Link } from "react-router-dom";
import classes from "./Pokemon.module.css";

function PokemonApi({ pokemon, loading }) {
  return (
    <>
      
        {loading ? (
          <h1>Loading</h1>
        ) : (
          pokemon.map((item) => {
            return (
              <>
                <div className={classes.post}>
                  <img src={item.sprites.front_default} alt="" />
                  <p>{item.name}</p>
                </div>
              </>
            );
          })
        )}
    </>
  );
}

export default PokemonApi;
