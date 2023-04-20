import React from 'react';
import Logo from "@/components/Logo/Logo";
import Link from "next/link";
import styles from "./Header.module.scss"

const Header = () => {
  const user = false;
  return (
    <header className={styles.header}>
      <Logo/>
      {user &&
        <div>
          <Link href={'/lists'}>Списки подарков</Link>
          <Link href={''}></Link>
        </div>
      }

      <div>
        <Link href='/gift'>Регистрация</Link>
        <Link href='/gift'>Войти</Link>
      </div>


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
