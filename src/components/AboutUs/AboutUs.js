import styles from './AboutUs.module.scss'
import Image from "next/image";

const AboutUs = () => {
  return (
    <section className={styles.about}>
      <div className={styles.about__imageBox}>
        <Image className={styles.about__image} src={'/images/aboutUs/aboutUs.jpg'} alt={'праздник'} width={1000}
               height={400}/>
      </div>
      <div className={styles.about__box}>
        <h2 className={styles.about__title}>О нас</h2>
        <p className={styles.about__description}>
          Мы стремимся к тому, чтобы дарить подарки было легко и просто. Наша платформа позволяет вам легко создавать и
          управлять списками желаемых подарков для любого случая - от дня рождения и до юбилея. Присоединяйтесь к нам
          сегодня и начните
          создавать незабываемые листы с подарками и делиться ими со своими друзьями и близкими!
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
