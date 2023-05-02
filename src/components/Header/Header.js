import React from 'react';
import Logo from "@/components/Logo/Logo";
import Link from "next/link";
import styles from "./Header.module.scss"
import {useSelector} from "react-redux";

const Header = () => {
  const {user} = useSelector(state => state.user)
  return (
    <header className={styles.header}>
      <Logo/>
      {user &&
        <nav>
          <ul className={styles.header__links}>
            <li><Link className={styles.header__link} href={'/profile'}>Профиль</Link></li>
            <li><Link className={styles.header__link} href={'/lists'}>Списки подарков</Link></li>
            <li><Link className={styles.header__link} href={'/lists'}>Забронированные подарки</Link></li>
          </ul>
        </nav>
      }
      {!user &&
        <nav>
          <Link href='/gift'>Регистрация</Link>
          <Link href='/gift'>Войти</Link>
        </nav>}


      {/*              {user &&
          <div className={styles.header__menu}>
            <Link href={'/movies'}
                  className={router.pathname === '/movies' ? `${styles.header__movies} ${styles.header__movies_active}` : `${styles.header__movies}`}>Фильмы</Link>
            <Link href={'/saved-movies'}
                  className={router.pathname === '/saved-movies' ? `${styles.header__movies} ${styles.header__movies_active}` : `${styles.header__movies}`}>Сохранённые
              фильмы</Link>
          </div>
        }*/}
    </header>
  );
};

export default Header;
