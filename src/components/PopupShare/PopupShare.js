import styles from './PopupShare.module.scss'
import {useFormValidation} from "@/hooks/useFormValidation";

const PopupShare = ({id, isPopupOpen, setIsPopupOpen}) => {
  const {
    register,
    handleSubmit,
  } = useFormValidation({link: `${window.location.protocol}//${window.location.host}/lists/${id}`});

  const onSubmit = ({link}, e) => {
    e.preventDefault();
    navigator.clipboard.writeText(link).catch((error) => {
      console.error('Failed to copy text:', error);
    });
    setIsPopupOpen(false)

  }

  return (
    <div
      className={isPopupOpen ? `${styles.share} ${styles.share_opened}` : `${styles.share}`}>
      <div className={styles.share__container}>
        <button className={styles.share__close} onClick={() => {
          setIsPopupOpen(!isPopupOpen)
        }
        }></button>
        <h3 className={styles.share__title}>Ваша ссылка</h3>
        <form className={styles.share__form} onSubmit={handleSubmit(onSubmit)}>
          <input className={styles.share__input}
                 {...register("link")}/>
          <button className={`${styles.share__updateButton}
                   ${styles.share__updateButton_active}`}>
            Скопировать
          </button>
        </form>
      </div>
    </div>
  );
};

export default PopupShare;
