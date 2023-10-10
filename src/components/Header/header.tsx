import { useState, useEffect, } from 'react';
import style from './header.module.scss';
import { Link, } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { imagesActions } from '../../store/Images/images.slice';

const Header: React.FC = () => {
    const dispatch = useAppDispatch();
    const [isFavorite, setIsFavorite] = useState<boolean>(false);
    const [value, setValue] = useState<string>('');

    const toggleIsFavorite = (state:boolean):void => {
        setIsFavorite(state);
    };

    useEffect(() => {
        if(value !== ''){
            dispatch(imagesActions.setNewQuery(value));
        };
    }, [value]);

    return (
        <header className={style.header}>
            <Link to='/'>
                <button 
                    className={style.header__link} 
                    onClick={() => toggleIsFavorite(false)}
                >
                    <img 
                        src="./img/logo.png" 
                        alt="logo" 
                        className={style.header__logo} 
                    />
                </button>
            </Link>

            <section className={style.header__search}>
                <img 
                    src="./img/header__search_img.png" 
                    alt="search_img" 
                    className={style.header__search_img} 
                />    
                <input 
                    type="text" 
                    placeholder='search' 
                    value={value}
                    className={style.header__search_inp} 
                    onChange={(e) => setValue(e.target.value)}
                />
            </section>

            <Link to='/favorite'>
                <button 
                    className={style.header__link} 
                    onClick={() => toggleIsFavorite(true)}
                >
                    <img 
                        src={`./img/favorite-${isFavorite}.png`} 
                        alt="favorite_img" 
                        className={style.header__link_img} 
                    />
                </button>
            </Link>
        </header>
    );
};

export default Header;