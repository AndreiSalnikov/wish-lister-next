import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span className={styles.footer__copyright}>&copy;2022 - {new Date().getFullYear()} Andrey Salnikov.
        <br/>Все права защищены.</span>
      <div className={styles.footer__contact}>Контакты: <a href='mailto:wish-lister@mail.ru'> wish-lister@mail.ru</a></div>
    </footer>
  );
};

export default Footer;
/*import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span className={styles.footer__copyright}>&copy;2022 - {new Date().getFullYear()} Andrey Salnikov. Все права защищены.</span>
      <div>Свяжитесь с нами:  wish-lister@mail.ru</div>
    </footer>
  );
};

export default Footer;*/
