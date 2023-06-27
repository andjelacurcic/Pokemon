import { Outlet } from "react-router-dom";
import PokemonCatchList from "../components/PokemonCatchList";

function Pokemons() {
  return (
    <>
      <Outlet />
      <main>
        <PokemonCatchList />
      </main>
    </>
  );
}

export default Pokemons;

export async function loader() {
  const response = await fetch("http://localhost:8082/pokemons");
  const resData = await response.json();
  console.log(resData);
  return resData.pokemons;
}
