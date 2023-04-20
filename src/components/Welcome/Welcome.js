import React, {useState} from 'react';
import styles from './Welcome.module.scss'
import PopupRegisterLogin from "@/components/PopupRegisterLogin/PopupRegisterLogin";

const Welcome = () => {

  const [popupIsOpen, setPopupIsOpen] = useState(false)


  return (
    <section className={styles.welcome}>
      <PopupRegisterLogin popupIsOpen={popupIsOpen} setPopupIsOpen={setPopupIsOpen}/>
      <h1 className={styles.welcome__title}>Создайте свой идеальный список подарков</h1>
      <h2 className={styles.welcome__subtitle}>Будь то день рождения, свадьба или праздник — мы поможем!</h2>
      <span className={styles.welcome__span} onClick={() => {
        setPopupIsOpen(!popupIsOpen)
      }}>Создать свой первый список</span>
    </section>
  );
};

export default Welcome;
