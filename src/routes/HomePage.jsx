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

  //Nisam bila sigurna kako se tacno trebalo uraditi to za zahteve
  //ovde je iskomentarisana metoda koja radi to, 5 zahteva u sekundi
  //ali sam ostavila tu koja ne ukljucuje to
  //Mozete je pokrenuti, radi valjda ono sto se trazilo
  //takodje u komponenti detalji postoji jos jedan nacin
  //samo nisam bila sigurna sta se tacno trazilo

  /*const getPokemon = async (res) => {
    const newData = await Promise.all(
      res.map(async (item,index) => {
        await new Promise((resolve)=> setTimeout(resolve, index*200))
        const result = await axios.get(item.url);
        return result.data;
      })
    );*/

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
      {{ loading } === true && <h1>LOADING</h1>}
      <main>
        <ul className={classes.posts}>
          <PokemonApi pokemon={pokeData} loading={loading} />
        </ul>
      </main>
      <div className={classes.divdiv}>
        {prevUrl && (
          <button
            onClick={() => {
              setPokeData([]);
              setUrl(prevUrl);
            }}
            className={classes.button}
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
            className={classes.button}
          >
            Next
          </button>
        )}
      </div>
    </>
  );
}

export default HomePage;
