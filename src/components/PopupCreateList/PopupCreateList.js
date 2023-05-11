import {useState} from 'react';
import {Controller} from "react-hook-form";
import {useFormValidation} from "@/hooks/useFormValidation";
import styles from './PopupCreateList.module.scss'
import {mainApi} from "@/utils/MainApi";
import Preloader from "@/components/Preloader/Preloader";
import DatePicker, {registerLocale} from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ru from 'date-fns/locale/ru';

registerLocale('ru', ru)

const PopupCreateList = ({lists, setLists, isPopupOpen, setIsPopupOpen}) => {
  const [isErrorSubmit, setIsErrorSubmit] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const DateInput = ({control, name, rules, classname}) => {
    return (
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field}) => (
          <DatePicker
            locale="ru"
            dateFormat="dd/MM/yyyy"
            autoComplete="off"
            className={classname}
            placeholderText='Дата'
            selected={field.value ? new Date(field.value) : null}
            onChange={(date) => field.onChange(date)}
          />
        )}
      />
    );
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();
    setIsErrorSubmit('')

    /*    const gifts = []

        for (let i = 1; i <= clickCount; i++) {
          const gift = {
            name: data[`name${i}`],
            specification: data[`specification${i}`],
            price: data[`price${i}`],
            link: data[`link${i}`],
          };
          gifts.push(gift);
        }*/
    // setLoadButton(true);
    // setErrorRegistration("");
    try {
      setIsLoading(true)
      const newList = await mainApi.createList(data.title, data.date, data.description, data.image);
      setIsLoading(false)
      setIsPopupOpen(false)
      setLists([...lists, newList])
      reset()
      setValue('date', '');
    } catch (err) {
      setIsErrorSubmit(err)
      setIsLoading(false)
      console.error(err.message);
    }
  };

  const {
    validateLink,
    control,
    validateDate,
    validateCreate,
    setValue,
    reset,
    register,
    handleSubmit,
    errors,
    isValid,
  } = useFormValidation();

  //доп поля

  /*  const [clickCount, setClickCount] = useState(0);

    const handleButtonClick = () => {
      setClickCount(clickCount + 1);
    };

    const handleDeleteClick = () => {
      setClickCount(clickCount - 1);
    };*/
//доп поля
  /*  const additionalFields = useMemo(() => {
      return Array.from({length: clickCount}).map((_, index) => (
        <div key={index}>
          <h2>Название</h2>
          <input required {...register(`name${index + 1}`)}/>
          <h2>Описание</h2>
          <input {...register(`specification${index + 1}`)}/>
          <h2>Цена</h2>
          <input required {...register(`price${index + 1}`)}/>
          <h2>Ссылка</h2>
          <input required {...register(`link${index + 1}`)}/>
          <button type="button" onClick={() => handleDeleteClick(index)}>
            Delete
          </button>
        </div>
      ));
    }, [clickCount]);*/

  return (
    <div
      className={isPopupOpen ? `${styles.list} ${styles.list_opened}` : `${styles.list}`}>
      {isLoading && <Preloader/>}
      <div className={styles.list__container}>
        <button className={styles.list__close} onClick={() => {
          reset()
          setValue('date', '');
          setIsPopupOpen(!isPopupOpen)
        }

        }></button>
        <h3 className={styles.list__title}>Создать список</h3>
        <form className={styles.list__form}
              onSubmit={handleSubmit(onSubmit)}>
          <input className={styles.list__input} placeholder='Название' required {...register('title', validateCreate)}/>
          <span
            className={errors.title ? `${styles.list__error} ${styles.list__error_active}` :
              `${styles.list__error}`}>{errors?.title?.message || ""}
             </span>
          <DateInput
            control={control}
            name="date"
            rules={validateDate}
            classname={styles.list__input}
          />
          <span
            className={errors.date ? `${styles.list__error} ${styles.list__error_active}` :
              `${styles.list__error}`}>{errors?.date?.message || ""}
             </span>
          <input className={styles.list__input} placeholder='Описание' {...register('description')}/>
          <span
            className={errors.description ? `${styles.list__error} ${styles.list__error_active}` :
              `${styles.list__error}`}>{errors?.description?.message || ""}
             </span>
          <input className={styles.list__input} placeholder='Ссылка на картинку' {...register('image',validateLink)}/>
          <span
            className={errors.image ? `${styles.list__error} ${styles.list__error_active}` :
              `${styles.list__error}`}>{errors?.image?.message || ""}
             </span>
          {/*{/!*доп поля*!/}*/}
          {/*/!*{clickCount > 0 &&*!/*/}
          {/*/!*  additionalFields}*!/*/}
          {/*/!*<button type="button" onClick={handleButtonClick}>*!/*/}
          {/*/!*  {clickCount === 0 ? 'Добавить подарок' : `Добавить ещё подарок`}*!/*/}
          {/*/!*</button>*!/*/}


          <button disabled={!isValid || isLoading}
                  className={!isValid || isLoading ?
                    `${styles.list__updateButton}`
                    : `${styles.list__updateButton}
                   ${styles.list__updateButton_active}`}>Создать
          </button>
        </form>
        <div
          className={isErrorSubmit ? `${styles.list__errorSubmit} ${styles.list__errorSubmit_active}` : `${styles.list__errorSubmit}`}>{`Во время выполнения запроса произошла ошибка, попробуйте позднее`}
        </div>
      </div>
    </div>
    // <form>
    //   {/*<input type="text" name="firstName" />*/}
    //   {/*<input type="text" name="lastName" />*/}

    // </form>
  );
};

export default PopupCreateList;
