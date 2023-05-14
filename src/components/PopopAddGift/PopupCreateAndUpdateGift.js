import {useState} from 'react';
import {useFormValidation} from "@/hooks/useFormValidation";
import Preloader from "@/components/Preloader/Preloader";
import styles from "./PopupAddGift.module.scss"
import {mainApi} from "@/utils/MainApi";

const PopupCreateAndUpdateGift = ({gift, wishlistId, setList, isAddGiftPopupOpen, setIsAddGiftPopupOpen}) => {
  const [isErrorSubmit, setIsErrorSubmit] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    reset,
    validateCreate,
    register,
    validatePrice,
    validateLinkAddGift,
    handleSubmit,
    errors,
    isValid,
  } = useFormValidation({name: gift?.name, price: gift?.price, link: gift?.link, specification: gift?.specification});

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setIsErrorSubmit('')

    if (gift) {
      setIsLoading(true)
      const list = await mainApi.updateGift(data,wishlistId,gift._id);
      setIsLoading(false)
      setIsAddGiftPopupOpen(false)
      console.log(list)
      setList(list)
    } else {
      try {
        setIsLoading(true)
        const updatedList = await mainApi.addGift(data, wishlistId)
        setList(updatedList)
        setIsLoading(false)
        setIsAddGiftPopupOpen(false)
        reset()
      } catch (err) {
        setIsLoading(false)
        setIsErrorSubmit(err)
      }
    }


  }

  return (
    <div
      className={isAddGiftPopupOpen ? `${styles.add} ${styles.add_opened}` : `${styles.add}`}>
      {isLoading && <Preloader/>}
      <div className={styles.add__container}>
        <button className={styles.add__close} onClick={() => {
          reset()
          setIsAddGiftPopupOpen(!isAddGiftPopupOpen)
        }

        }></button>
        <h3 className={styles.add__title}>{gift ? 'Обновите информацию о подарке' : 'Добавить подарок'}</h3>
        <form className={styles.add__form}
              onSubmit={handleSubmit(onSubmit)}>
          <input className={styles.add__input} placeholder='Название подарка'
                 required {...register('name', validateCreate)}/>
          <span
            className={errors.name ? `${styles.add__error} ${styles.add__error_active}` :
              `${styles.add__error}`}>{errors?.name?.message || ""}
             </span>
          <input className={styles.add__input} placeholder='Цена подарка'
                 required {...register('price', validatePrice)}/>
          <span
            className={errors.price ? `${styles.add__error} ${styles.add__error_active}` :
              `${styles.add__error}`}>{errors?.price?.message || ""}
             </span>
          <input className={styles.add__input} placeholder='Ссылка на подарок'
                 required {...register('link', validateLinkAddGift)}/>
          <span
            className={errors.link ? `${styles.add__error} ${styles.add__error_active}` :
              `${styles.add__error}`}>{errors?.link?.message || ""}
             </span>
          <input className={styles.add__input} placeholder='Описание подарка' {...register('specification')}/>
          <span
            className={errors.specification ? `${styles.add__error} ${styles.add__error_active}` :
              `${styles.add__error}`}>{errors?.specification?.message || ""}
             </span>
          <button disabled={!isValid || isLoading}
                  className={!isValid || isLoading ?
                    `${styles.add__updateButton}`
                    : `${styles.add__updateButton}
                   ${styles.add__updateButton_active}`}>{gift ? 'Сохранить' : 'Добавить'}
          </button>
        </form>
        <div
          className={isErrorSubmit ? `${styles.add__errorSubmit} ${styles.add__errorSubmit_active}` : `${styles.add__errorSubmit}`}>{`Во время выполнения запроса произошла ошибка, попробуйте позднее`}
        </div>
      </div>
    </div>
  );
};

export default PopupCreateAndUpdateGift;
