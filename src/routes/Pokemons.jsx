import { Outlet } from "react-router-dom";
import PokemonCatchList from "../components/PokemonCatchList";

function Pokemons() {


  return (
    <>
    <Outlet />
      <main>
        <PokemonCatchList
        />
      </main>
    </>
  );
}

export default Pokemons;

export async function loader() {
  const response = await fetch("http://localhost:8082/posts");
  const resData = await response.json();
  return resData.posts;
}
