import { useState, useEffect } from "react";
import classes from "./Pokemon.module.css";
import axios from "axios";
import { Link } from "react-router-dom";

function PokemonApi({ pokemon, loading }) {
  const [captureRates, setCaptureRates] = useState([]);
  const [species, setSpecies] = useState([]);

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
            console.log();
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

  useEffect(() => {
    const fetchSpecies = async () => {
      const rates = await Promise.all(
        pokemon.map(async (item) => {
          try {
            const response = await axios.get(
              `https://pokeapi.co/api/v2/pokemon-species/${item.name}`
            );
            console.log();
            return response.data.name;
          } catch (error) {
            console.error("nema podataka");
          }
        })
      );
      setSpecies(rates);
      console.log(species);
    };
    fetchSpecies();
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
                {species[index] !== null ? (
                  <p>Species {species[index]}</p>
                ) : (
                  <p>-</p>
                )}
                {captureRates[index] !== null ? (
                  <p>Capture rate {captureRates[index]}</p>
                ) : (
                  <p>-</p>
                )}
                <Link to={{ pathname: `/details/${item.id}`, state: 25 }}>
                  Details
                </Link>
              </div>
            </>
          );
        })
      )}
    </>
  );
}

export default PokemonApi;
