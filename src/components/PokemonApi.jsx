import { useState, useEffect } from "react";
import classes from "./Pokemon.module.css";
import axios from "axios";

function PokemonApi({ pokemon, loading }) {
  const [captureRates, setCaptureRates] = useState([]);

  async function getRate(id) {
    console.log(id);
    const response = await axios.get(
      "https://pokeapi.co/api/v2/pokemon-species/{item.name}"
    );
    const resData = response.data.capture_rate;
    return resData;
  }

  useEffect(() => {
    const fetchCaptureRates = async () => {
      const rates = await Promise.all(
        pokemon.map(async (item) => {
          try {
            const response = await axios.get(
              `https://pokeapi.co/api/v2/pokemon-species/${item.name}`
            );
            return response.data.capture_rate;
          } catch (error) {
            console.error("nema podataka");
          }
        })
      );
      setCaptureRates(rates);
    };
    fetchCaptureRates();
  }, [pokemon]);

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        pokemon.map((item, index) => {
          return (
            <>
              <div className={classes.post}>
                <img src={item.sprites.front_default} alt="" />
                <p>Name {item.name}</p>
                {captureRates[index] !== null ? (
                  <p>Capture rate  {captureRates[index]}</p>
                ) : (
                  <p>nije dostupno</p>
                )}
              </div>
            </>
          );
        })
      )}
    </>
  );
}

export default PokemonApi;
