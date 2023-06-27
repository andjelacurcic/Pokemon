import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PokemonApi from "../components/PokemonApi";
import classes from "./../components/Pokemon.module.css";

function HomePage() {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=50/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();

  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    getPokemon(res.data.results);
    setLoading(false);
  };

  /*const getPokemonData = async(url)=> {
    const result = await axios.get(url);
    return result.data;
  }
  const getPokemon = async(res) => {
    const newData = await Promise.all(
        res.map(async(item) => {
            const data = await getPokemonData(item.url);
            return data
        })
    );
    setPokeData((prevState) => {
        const newState = [...prevState, ...newData];
        newState.sort((a,b) => (a.id>b.id ? 1: -1));
        return newState;
    });
    
  }*/
  const getPokemon = async (res) => {
    const newData = await Promise.all(
      res.map(async (item) => {
        const result = await axios.get(item.url);
        return result.data;
      })
    );

    setPokeData((prevState) => {
      const uniqueData = newData.filter((item) => {
        return !prevState.find((prevItem) => prevItem.id === item.id);
      });

      const newState = [...prevState, ...uniqueData];
      newState.sort((a, b) => (a.id > b.id ? 1 : -1));
      return newState;
    });
  };

  useEffect(() => {
    pokeFun();
  }, [url]);

  return (
    <>
      <Outlet />
      <main>
        <ul className={classes.posts}>
          <PokemonApi pokemon={pokeData} loading={loading} />
        </ul>
      </main>
      <div>
        {prevUrl && (
          <button
            onClick={() => {
              setPokeData([]);
              setUrl(prevUrl);
            }}
          >
            Previous
          </button>
        )}
        {nextUrl && (
          <button
            onClick={() => {
              setPokeData([]);
              setUrl(nextUrl);
            }}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
}

export default HomePage;

