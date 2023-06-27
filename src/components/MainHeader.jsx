import {Link} from 'react-router-dom'
import {MdPostAdd, MdMessage} from 'react-icons/md';
import classes from './MainHeader.module.css';


function MainHeader({onCreatePost}) {
    return (
        <header className={classes.header}>
            <h1 className={classes.logo}>
                
               <Link to='/'>POKEMONS</Link> 
            </h1>
            <p>
                <Link to="/posts" className={classes.button}>
                    <MdPostAdd size={18} />
                    Catch list
                </Link>
            </p>
        </header>
    )
}
export default MainHeader;