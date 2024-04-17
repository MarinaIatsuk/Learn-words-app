import {NavLink, Link} from 'react-router-dom';
import style from './Header.module.scss'
import logo from '../../images/logo.png'

const Header = () => {
    return (
        <div className={style.header}>
            <nav className={style.header__navigation}>

            <Link className={style.header__navigationItem}to='/'><img src={logo}/></Link>
            <NavLink className={style.header__navigationItem}to='/'>Home</NavLink>
            <NavLink className={style.header__navigationItem} to='/games'>Game</NavLink>
                
            </nav>
        </div>
    );
};

export default Header;