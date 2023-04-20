import React from 'react';
import styles from './404.module.scss'
import {useRouter} from "next/router";

const NotFound = () => {
  const navigate = useRouter();
  return (
    <main className={styles.notfound}>
      <h1 className={styles.notfound__code}>404</h1>
      <h2 className={styles.notfound__text}>Страница не найдена</h2>
      <button className={styles.notfound__back} onClick={() => navigate.back()}>Назад</button>
    </main>
  );
};

export default NotFound;
