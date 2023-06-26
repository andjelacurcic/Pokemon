import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import PokemonApi from "../components/PokemonApi";
import classes from "./../components/Pokemon.module.css"


function HomePage(){

    const [pokeData, setPokeData] = useState([]);
    const[loading,setLoading]=useState(true);
    const[url,setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
    const[nextUrl, setNextUrl] = useState();
    const[prevUrl, setPrevUrl] = useState();
    
    const pokeFun = async()=>{
        setLoading(true)
        const res = await axios.get(url);
        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemon(res.data.results);
        setLoading(false);
    }
    const getPokemon=async(res) => {
        res.map(async(item)=> {
            const result = await axios.get(item.url)
            setPokeData(state => {
                state =[...state, result.data]
                return state; 
            })
        })
    }

    useEffect(()=>{
        pokeFun();
    },[url]);

    return (
        <>
        <Outlet />
          <main >
            <PokemonApi pokemon={pokeData} loading = {loading}
            />
          </main>
        </>
      );

}

export default HomePage;

/*export async function loader() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon");
    const resData = await response.json();
    return resData.results;
  }*/