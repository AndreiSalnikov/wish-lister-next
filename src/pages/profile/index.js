import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {withAuth} from "@/hoc/ProtectedRoute";
import {useFormValidation} from "@/hooks/useFormValidation";
import styles from "./index.module.scss"
import Image from "next/image";
import {mainApi} from "@/utils/MainApi";
import {updateUser} from "@/store/actions/user";
import Preloader from "@/components/Preloader/Preloader";
import PopupEditAvatar from "@/components/PopupEditAvatar/PopupEditAvatar";


const Profile = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const {user} = useSelector(state => state.user)
  const [isLoading, setIsLoading] = useState(false);
  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false)
  const dispatch = useDispatch();
  const date = new Date(user.createdAt);
  const options = {timeZone: 'Europe/Moscow'};
// Format the date using toLocaleDateString with the options
  const formattedDate = date.toLocaleDateString('en-GB', options)
    .replace(/\//g, '.');
  const [isErrorSubmit, setIsErrorSubmit] = useState({
    aboutSubmitError: '',
    nameSubmitError: '',
    passwordSubmitError: ''
  });

  function changeAvatar() {
    setIsPopupOpen(true)
  }

  function FormPassword() {
    const {
      register,
      handleSubmit,
      errors,
      isValid,
      validatePassword,
    } = useFormValidation();

    return (
      <>
        <form className={styles.profile__form} onSubmit={handleSubmit(onSubmitPassword)}>
          <div className={styles.profile__cell}>
            <label>
              <span className={styles.profile__text}>Старый пароль</span>
            </label>
            <input className={styles.profile__input} required {...register("currentPassword", validatePassword)} type="password"/>
            <span
              className={errors.currentPassword ? `${styles.profile__error} ${styles.profile__error_active}` :
                `${styles.profile__error}`}>{errors?.currentPassword?.message || ""}
             </span>
          </div>
          <div className={styles.profile__cell}>
            <label>
              <span className={styles.profile__text}>Новый пароль</span>
            </label>
            <input className={styles.profile__input} required {...register("newPassword", validatePassword)} type="password"/>
            <span
              className={errors.newPassword ? `${styles.profile__error} ${styles.profile__error_active}` :
                `${styles.profile__error}`}>{errors?.newPassword?.message || ""}
             </span>
          </div>
          <button disabled={!isValid || isLoading}
                  className={!isValid || isLoading ?
                    `${styles.profile__updateButton}`
                    : `${styles.profile__updateButton}
                   ${styles.profile__updateButton_active}`}>
            Сохранить
          </button>
        </form>
        <div
          className={isErrorSubmit.passwordSubmitError ? `${styles.profile__errorSubmit} ${styles.profile__errorSubmit_active}` : `${styles.profile__errorSubmit}`}>{isErrorSubmit.passwordSubmitError === 'Неправильный пароль' ? `${isErrorSubmit.passwordSubmitError}` : `Во время выполнения запроса произошла ошибка, попробуйте позднее`}
        </div>
      </>
    )

  }

  function FormName() {
    const {
      register,
      handleSubmit,
      errors,
      isValid,
      validateName,
      validateEmail,
    } = useFormValidation({name: user.name, email: user.email, reminder: user.reminder});

    return (
      <>
        <form className={styles.profile__form} onSubmit={handleSubmit(onSubmitName)}>
          <div className={styles.profile__top}>
            <div className={styles.profile__cell}>
              <label>
                <span className={styles.profile__text}>Имя</span>
              </label>
              <input className={styles.profile__input} {...register("name", validateName)} />
              <span
                className={errors.name ? `${styles.profile__error} ${styles.profile__error_active}` :
                  `${styles.profile__error}`}>{errors?.name?.message || ""}
             </span>
            </div>
            <div className={styles.profile__cell}>
              <label>
                <span className={styles.profile__text}>Адрес электронной почты</span>
              </label>
              <input className={styles.profile__input} {...register("email", validateEmail)} />
              <span
                className={errors.email ?
                  `${styles.profile__error} ${styles.profile__error_active}` :
                  `${styles.profile__error}`}>{errors?.email?.message || ""}
              </span>
            </div>
          </div>
          <div className={styles.profile__bot}>
            <label>
              <span className={styles.profile__text}>Уведомления</span>
            </label>
            <input  className={styles.profile__checkbox} type={"checkbox"} {...register("reminder")}/>
          </div>
          <button disabled={!isValid || isLoading}
                  className={!isValid || isLoading ? `${styles.profile__updateButton}` : `${styles.profile__updateButton} ${styles.profile__updateButton_active}`}>
            Сохранить
          </button>
        </form>

        <div
          className={isErrorSubmit.nameSubmitError ? `${styles.profile__errorSubmit} ${styles.profile__errorSubmit_active}` : `${styles.profile__errorSubmit}`}>{isErrorSubmit.nameSubmitError === 'Такой email уже существует' ? `${isErrorSubmit.nameSubmitError}` : `Во время выполнения запроса произошла ошибка, попробуйте позднее`}
        </div>
      </>
    )

  }

  function FormAbout() {
    const {
      validateAbout,
      register,
      handleSubmit,
      errors,
      isValid,
    } = useFormValidation();

    return (
      <>
        <form onSubmit={handleSubmit(onSubmitAbout)}>
          <label>
              <textarea
                {...register("about", validateAbout)}
                placeholder="Расскажите о себе..."
                className={styles.profile__about}
              />
          </label>
          <span
            className={errors.about ? `${styles.profile__error} ${styles.profile__error_active}` :
              `${styles.profile__error}`}>{errors?.about?.message || ""}
             </span>
          <input disabled={!isValid || isLoading} type="button" onClick={handleSubmit(onSubmitAbout)}
                 className={!isValid || isLoading ?
                   `${styles.profile__updateButton}`
                   : `${styles.profile__updateButton}
                   ${styles.profile__updateButton_active}`}
                 value="Сохранить"/>
        </form>
        <div
          className={isErrorSubmit.aboutSubmitError ? `${styles.profile__errorSubmit} ${styles.profile__errorSubmit_active}` : `${styles.profile__errorSubmit}`}>{`Во время выполнения запроса произошла ошибка, попробуйте позднее`}
        </div>
      </>
    )

  }

  const onSubmitAbout = async (data, e) => {
    e.preventDefault();
    setIsErrorSubmit(prevState => ({
      ...prevState,
      aboutSubmitError: '',
    }))
    try {
      setIsLoading(true)
      const about = await mainApi.updateAbout(data)
      dispatch(updateUser(about))
      setIsLoading(false)
    } catch (error) {
      setIsErrorSubmit(prevState => ({
        ...prevState,
        aboutSubmitError: error.message,
      }))
      setIsLoading(false)
      console.error(error)
    }
  }

  const onSubmitName = async (data, e) => {
    e.preventDefault();
    setIsErrorSubmit(prevState => ({
      ...prevState,
      nameSubmitError: '',
    }))
    try {
      setIsLoading(true)
      const user = await mainApi.updateUser(data)
      dispatch(updateUser(user))
      setIsLoading(false)
    } catch (error) {
      setIsErrorSubmit(prevState => ({
        ...prevState,
        nameSubmitError: error.message,
      }))
      setIsLoading(false)
      console.error(error)
    }
  }

  const onSubmitPassword = async (data, e) => {
    e.preventDefault();
    setIsErrorSubmit(prevState => ({
      ...prevState,
      passwordSubmitError: '',
    }));
    try {

      setIsLoading(true)
      await mainApi.changePassword(data)
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setIsErrorSubmit(prevState => ({
        ...prevState,
        passwordSubmitError: error.message,
      }))
      console.error(error)
    }
  }

  return (
    <>
      <PopupEditAvatar isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen}/>
      {isLoading && <Preloader/>}
      <div className={styles.profile}>
        <div className={styles.profile__leftbox}>
          <div className={styles.profile__box}>
            <div className={styles.profile__imgbox} onClick={changeAvatar}>
              <Image className={styles.profile__img}
                     src={user.avatar}
                     width={90} height={90} alt='аватар'/>
              <div className={styles.profile__photoBox}>
                <svg className={styles.profile__photo} viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path
                    d="M14.267,4 C14.801,4 15.299,4.287 15.566,4.75 L15.566,4.75 L16.144,5.75 C16.233,5.904 16.399,6 16.577,6 L16.577,6 L19.5,6 C20.327,6 21,6.673 21,7.5 L21,7.5 L21,17.5 C21,18.327 20.327,19 19.5,19 L19.5,19 L4.5,19 C3.673,19 3,18.327 3,17.5 L3,17.5 L3,7.5 C3,6.673 3.673,6 4.5,6 L4.5,6 L7.435,6 C7.609,6 7.773,5.907 7.863,5.758 L7.863,5.758 L8.483,4.727 C8.752,4.278 9.245,4 9.769,4 L9.769,4 Z M14.267,5 L9.769,5 C9.594,5 9.43,5.093 9.34,5.242 L9.34,5.242 L8.72,6.273 C8.451,6.722 7.958,7 7.435,7 L7.435,7 L4.5,7 C4.224,7 4,7.225 4,7.5 L4,7.5 L4,17.5 C4,17.775 4.224,18 4.5,18 L4.5,18 L19.5,18 C19.776,18 20,17.775 20,17.5 L20,17.5 L20,7.5 C20,7.225 19.776,7 19.5,7 L19.5,7 L16.577,7 C16.043,7 15.545,6.713 15.278,6.25 L15.278,6.25 L14.7,5.25 C14.611,5.096 14.445,5 14.267,5 L14.267,5 Z M11.9996,7.9999 C13.2656,7.9999 14.4706,8.6099 15.2236,9.6329 C15.9876,10.6719 16.1996,11.9939 15.8046,13.2609 C15.4326,14.4579 14.4576,15.4329 13.2606,15.8049 C12.8426,15.9349 12.4176,15.9989 11.9996,15.9989 C11.1516,15.9989 10.3286,15.7349 9.6336,15.2229 C8.6106,14.4699 7.9996,13.2659 7.9996,11.9999 C7.9996,9.7939 9.7946,7.9999 11.9996,7.9999 Z M11.9996,8.9999 C10.3456,8.9999 8.9996,10.3459 8.9996,11.9999 C8.9996,12.9489 9.4586,13.8529 10.2256,14.4169 C11.0056,14.9919 12.0026,15.1479 12.9636,14.8499 C13.8506,14.5729 14.5736,13.8519 14.8496,12.9639 C15.1486,12.0029 14.9916,11.0059 14.4176,10.2259 C13.8526,9.4579 12.9496,8.9999 11.9996,8.9999 Z"></path>
                </svg>
              </div>
            </div>
            <svg className={styles.profile__dots} viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path
                d="M12.5,17 C13.329,17 14,17.672 14,18.5 C14,19.328 13.329,20 12.5,20 C11.671,20 11,19.328 11,18.5 C11,17.672 11.671,17 12.5,17 Z M12.5,11 C13.329,11 14,11.672 14,12.5 C14,13.328 13.329,14 12.5,14 C11.671,14 11,13.328 11,12.5 C11,11.672 11.671,11 12.5,11 Z M12.5,5 C13.329,5 14,5.672 14,6.5 C14,7.328 13.329,8 12.5,8 C11.671,8 11,7.328 11,6.5 C11,5.672 11.671,5 12.5,5 Z"></path>
            </svg>
          </div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        {!isEditButtonClicked &&
          <div className={styles.profile__rightbox}>
            <div className={styles.profile__edittop}>
              <h1>Профиль</h1>
              <div className={styles.profile__date}>Дата создания аккаунта: {formattedDate}</div>
              <button className={styles.profile__editbutton} onClick={() => setIsEditButtonClicked(true)}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path
                    d="M18.8525,7.543 L17.7515,8.644 L15.3565,6.248 L16.4575,5.147 C16.5555,5.05 16.6835,5.001 16.8105,5.001 C16.9385,5.001 17.0665,5.05 17.1645,5.147 L18.8525,6.835 C19.0475,7.03 19.0475,7.348 18.8525,7.543 L18.8525,7.543 Z M8.1895,18.206 C8.1185,18.276 8.0275,18.324 7.9295,18.344 L5.1275,18.873 L5.6575,16.07 C5.6755,15.972 5.7225,15.882 5.7945,15.811 L14.6495,6.955 L17.0445,9.351 L8.1895,18.206 Z M19.5595,6.128 L17.8715,4.44 C17.2865,3.856 16.3355,3.856 15.7505,4.44 L5.0875,15.103 C4.8735,15.317 4.7295,15.588 4.6745,15.886 L4.0085,19.407 C3.9775,19.569 4.0295,19.736 4.1465,19.854 C4.2415,19.948 4.3685,20 4.4995,20 C4.5305,20 4.5615,19.997 4.5925,19.991 L8.1165,19.326 C8.4145,19.269 8.6855,19.125 8.8965,18.912 L19.5595,8.25 C20.1445,7.665 20.1445,6.713 19.5595,6.128 L19.5595,6.128 Z"></path>
                </svg>
                <p className={styles.profile__editText}>Редактировать профиль</p>
              </button>
            </div>
            <h3>Обо мне</h3>
            <p>
              {user.about || 'Здесь могло бы быть описание вашего профиля'}
            </p>
            <FormAbout/>
          </div>
        }
        {
          isEditButtonClicked &&
          <div className={styles.profile__rightbox}>
            <div className={styles.profile__edittop}>
              <h1>Мой аккаунт</h1>
              <button className={styles.profile__editbutton} onClick={() => setIsEditButtonClicked(false)}>
                <p className={styles.profile__buttonBack}>Назад</p>

              </button>
              <div className={styles.profile__date}>Просмотрите и отредактируйте сведения о себе.</div>
            </div>
            <h3>Аккаунт</h3>
            <div className={styles.profile__date}>Обновите личную информацию.</div>
            <FormName/>
            <div className={styles.profile__date}>Измените пароль.</div>
            <FormPassword/>
          </div>
        }
      </div>
    </>
  )

};

export default withAuth(Profile);
