import {Link} from 'react-router-dom'
import {CgPokemon} from 'react-icons/cg'
import classes from './MainHeader.module.css';


function MainHeader({onCreatePost}) {
    return (
        <header className={classes.header}>
            <h1 className={classes.logo} >
            <CgPokemon size={50}/>
               <Link to='/' className={classes.logo}>POKEMONS</Link> 
            </h1>
            <p>
                <Link to="/posts" className={classes.button}>
                    <CgPokemon size={18} />
                    Catch list
                </Link>
            </p>
        </header>
    )
}
export default MainHeader;