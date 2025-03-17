import { NavLink } from 'react-router-dom'
import classes from './Header.module.css'
import logo from "../../assets/logo.png"
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
const Header = () => {
    const { currentUser, logout } = useContext(AuthContext);

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
    };

    return (
        <header>
            <nav>
                <div className={classes.logo}>
                    <NavLink to='/'>
                        <img src={logo} className={classes.logo}></img>
                    </NavLink>
                </div>
                <ul className={classes['nav-links']}>
                    <li>
                        <NavLink to='/'>
                            Accueil
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/movies'>
                            Films
                        </NavLink>
                    </li>
                    { !currentUser ? (
                        <>
                            <li className={classes['guest-only']}>
                                <NavLink to='/login'>
                                    Connexion
                                </NavLink>
                            </li>
                            <li className={classes['guest-only']}>
                                <NavLink to='/register'>
                                    Inscription
                                </NavLink>
                            </li>
                        </>
                    ) : ( 
                        <>
                            <li className={classes['auth-required']}>
                                <NavLink to='/movies/create'>
                                    Ajouter
                                </NavLink>
                            </li>
                            <li className={classes['auth-required']}>
                                <NavLink to='/' onClick={handleLogout}>
                                    Déconnexion
                                </NavLink>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}
export default Header;