import axios from "axios";
import classes from "./Pokemon.module.css";

function Pokemon({ id, name, species, img }) {
  
  const deletePokemon = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8082/pokemon/${id}`
      );
      console.log(response.data);
      alert("Pokemon is deleted")
      window.location.reload();
    } catch (error) {
      console.error("greska");
    }
  };

  return (
    <div className={classes.post}>
      <img src={img} alt="" />
      <p className={classes.text}>{name}</p>
      <p></p>
      <button onClick={deletePokemon}className={classes.button}>delete</button>
    </div>
  );
}

export default Pokemon;
