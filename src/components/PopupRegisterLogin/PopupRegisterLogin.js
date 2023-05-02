import React, {useState} from 'react';
import styles from './PopupRegisterLogin.module.scss'
import {useFormValidation} from "@/hooks/useFormValidation";
import {useRouter} from "next/router";
import {mainApi} from "@/utils/MainApi";
import {useDispatch, useSelector} from "react-redux";
import {updateUser} from "@/store/actions/user";

const PopupRegisterLogin = ({popupIsOpen, setPopupIsOpen}) => {
  const [isEmailRegisterClicked, setIsEmailRegisterClicked] = useState(false)
  const [isReminderActive, setIsReminderActive] = useState(false)
  const [isLoginButtonClicked, setIsLoginButtonClicked] = useState(false)
  const [errorRegistration, setErrorRegistration] = useState("");
  const [loadButton, setLoadButton] = useState(false);
  // const [user, setUser] = useState(null)
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  const {
    confirmPassword,
    register,
    handleSubmit,
    errors,
    isValid,
    validateName,
    validateEmail,
    validatePassword,
  } = useFormValidation();

  const router = useRouter();
  const onSubmitRegister = async (data, e) => {
    e.preventDefault();
    setLoadButton(true);
    setErrorRegistration("");
    try {
      await mainApi.register(data.name, data.email, data.password, isReminderActive);
      await mainApi.login(data.email, data.password);
      // const userData = await mainApi.getMe('/users/me');
      //const {token} = await mainApi.login(email, password);
      //mainApi.setToken(token);
      // const userData = await mainApi.tokenCheck(token);
      // setUser(userData);
      setLoadButton(false);
      if (router.pathname === '/') {
        await router.push('/lists')
      }  else {
         await router.push(router.asPath)
      }

    } catch (err) {
      console.error(err);
      setErrorRegistration(err.message);
      setLoadButton(false);
    }
  };

  const onSubmitLogin = async (data, e) => {
    e.preventDefault();
    setLoadButton(true);
    setErrorRegistration("");
    try {
      await mainApi.login(data.email, data.password);
      const userData = await mainApi.getMe('/users/me');
      dispatch(updateUser(userData));

      // setUser(userData);
      if (router.pathname === '/') {
        await router.push('/lists')
      } else {
        setPopupIsOpen(!popupIsOpen)
      }

    } catch (err) {
      console.error(err.message);
      setErrorRegistration(err.message);
      setLoadButton(false);
    }
  };


  return (
    <div
      className={popupIsOpen ? `${styles.popupRegisterLogin} ${styles.popupRegisterLogin_opened}` : `${styles.popupRegisterLogin}`}>
      <div className={styles.popupRegisterLogin__container}>
        <button className={styles.popupRegisterLogin__close} onClick={() => {
          setPopupIsOpen(!popupIsOpen)
        }}></button>
        <h3 className={styles.popupRegisterLogin__title}>{isLoginButtonClicked ? 'Войти' : 'Зарегистрироваться'}</h3>
        <h3 className={styles.popupRegisterLogin__subtitle}>
          {isLoginButtonClicked ? 'Впервые? ' : 'Уже есть аккаунт?'}
          <span onClick={() => {
            setIsLoginButtonClicked(!isLoginButtonClicked)
          }}
                className={styles.popupRegisterLogin__span}>
            {isLoginButtonClicked ? 'Зарегистрироваться' : ' Войти'}
          </span>
        </h3>

        {!isEmailRegisterClicked &&
          <>
            <div className={`${styles.popupRegisterLogin__social} ${styles.popupRegisterLogin__google}`}
                 id="fb-login-text">
              <div className={styles.popupRegisterLogin__svg}>
                <svg width="20px" height="20px"
                     xmlns="http://www.w3.org/2000/svg"
                     xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 28 28">
                  <defs>
                    <clipPath id="clip-path">
                      <path style={{fill: "none"}}
                            d="M22.79,12.36H14.21v3.48h4.94c-.46,2.21-2.39,3.48-4.94,3.48A5.32,5.32,0,1,1,17.6,9.87l2.68-2.62A9.29,9.29,0,0,0,14.21,5,9.08,9.08,0,0,0,5,14a9.08,9.08,0,0,0,9.21,9A8.59,8.59,0,0,0,23,14,7.31,7.31,0,0,0,22.79,12.36Z"/>
                    </clipPath>
                  </defs>
                  <g>
                    <g style={{clipPath: "url(#clip-path)"}}>
                      <path style={{fill: "#fbbc05"}} d="M4.16,19.32V8.68L11.28,14Z"/>
                    </g>
                    <g style={{clipPath: "url(#clip-path)"}}>
                      <path style={{fill: "#ea4335"}} d="M4.16,8.68,11.28,14l2.93-2.5,10-1.6V4.18H4.16Z"/>
                    </g>
                    <g style={{clipPath: "url(#clip-path)"}}>
                      <path style={{fill: "#34a853"}} d="M4.16,19.32,16.72,9.91l3.31.41,4.23-6.14V23.82H4.16Z"/>
                    </g>
                    <g style={{clipPath: "url(#clip-path)"}}>
                      <path style={{fill: "#4285f4"}} d="M24.26,23.82,11.28,14,9.6,12.77,24.26,8.68Z"/>
                    </g>
                  </g>
                </svg>
              </div>
              <span className={styles.popupRegisterLogin__fbLogin}>Войти через Google+</span>
            </div>

            <div className={`${styles.popupRegisterLogin__social} ${styles.popupRegisterLogin__google}`}>
              <div className={`${styles.popupRegisterLogin__svg} ${styles.popupRegisterLogin__svg_color_mazarine}`}>
                <svg fill="orange" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path
                    d="M12.042 23.648c-7.813 0-12.042-4.876-12.042-11.171 0-6.727 4.762-12.125 13.276-12.125 6.214 0 10.724 4.038 10.724 9.601 0 8.712-10.33 11.012-9.812 6.042-.71 1.108-1.854 2.354-4.053 2.354-2.516 0-4.08-1.842-4.08-4.807 0-4.444 2.921-8.199 6.379-8.199 1.659 0 2.8.876 3.277 2.221l.464-1.632h2.338c-.244.832-2.321 8.527-2.321 8.527-.648 2.666 1.35 2.713 3.122 1.297 3.329-2.58 3.501-9.327-.998-12.141-4.821-2.891-15.795-1.102-15.795 8.693 0 5.611 3.95 9.381 9.829 9.381 3.436 0 5.542-.93 7.295-1.948l1.177 1.698c-1.711.966-4.461 2.209-8.78 2.209zm-2.344-14.305c-.715 1.34-1.177 3.076-1.177 4.424 0 3.61 3.522 3.633 5.252.239.712-1.394 1.171-3.171 1.171-4.529 0-2.917-3.495-3.434-5.246-.134z"/>
                </svg>
              </div>
              <span className={styles.popupRegisterLogin__fbLogin}>Войти через Mail.ru</span>
            </div>

            <div className={`${styles.popupRegisterLogin__social} ${styles.popupRegisterLogin__google}`}
                 id="fb-login-text">
              <div className={`${styles.popupRegisterLogin__svg} ${styles.popupRegisterLogin__svg_color_blue}`}>
                <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                  <path
                    d="M13.162 18.994c.609 0 .858-.406.851-.915-.031-1.917.714-2.949 2.059-1.604 1.488 1.488 1.796 2.519 3.603 2.519h3.2c.808 0 1.126-.26 1.126-.668 0-.863-1.421-2.386-2.625-3.504-1.686-1.565-1.765-1.602-.313-3.486 1.801-2.339 4.157-5.336 2.073-5.336h-3.981c-.772 0-.828.435-1.103 1.083-.995 2.347-2.886 5.387-3.604 4.922-.751-.485-.407-2.406-.35-5.261.015-.754.011-1.271-1.141-1.539-.629-.145-1.241-.205-1.809-.205-2.273 0-3.841.953-2.95 1.119 1.571.293 1.42 3.692 1.054 5.16-.638 2.556-3.036-2.024-4.035-4.305-.241-.548-.315-.974-1.175-.974h-3.255c-.492 0-.787.16-.787.516 0 .602 2.96 6.72 5.786 9.77 2.756 2.975 5.48 2.708 7.376 2.708z"/>
                </svg>
              </div>
              <span className={styles.popupRegisterLogin__fbLogin}>Войти через VK</span>
            </div>

            <div className={`${styles.popupRegisterLogin__social} ${styles.popupRegisterLogin__telegram}`}>
              <div className={styles.popupRegisterLogin__svg}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20"
                     height="20" fill="#0088cc" viewBox="0 0 16 16">
                  <path
                    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
                </svg>
              </div>
              <span className={styles.popupRegisterLogin__fbLogin}>Войти через Telegram</span>
            </div>


            <div className={styles.popupRegisterLogin__or}>
              <span className={styles.popupRegisterLogin__orText}>ИЛИ</span>
            </div>

            <div className={`${styles.popupRegisterLogin__social} ${styles.popupRegisterLogin__nonsocial}`}
                 id="fb-login-text">
              <span className={styles.popupRegisterLogin__email} onClick={() => {
                setIsEmailRegisterClicked(!isEmailRegisterClicked)
              }}>Через эл.почту</span>
            </div>
          </>
        }

        {isEmailRegisterClicked && !isLoginButtonClicked &&
          <>
            <form className={styles.popupRegisterLogin__formRegister} onSubmit={handleSubmit(onSubmitRegister)}>
              <input
                {...register('name', validateName)}
                className={styles.popupRegisterLogin__input}
                placeholder={'Имя'}
              />
              <span
                className={errors.name ? `${styles.popupRegisterLogin__error} ${styles.popupRegisterLogin__error_active}` :
                  `${styles.popupRegisterLogin__error}`}>{errors?.name?.message || ""}
             </span>
              <input
                className={styles.popupRegisterLogin__input}
                {...register('email', validateEmail)}
                placeholder={'Адрес электронной почты'}
              />
              <span
                className={errors.email ?
                  `${styles.popupRegisterLogin__error} ${styles.popupRegisterLogin__error_active}` :
                  `${styles.popupRegisterLogin__error}`}>{errors?.email?.message || ""}
              </span>
              <input
                className={styles.popupRegisterLogin__input}
                {...register('password', validatePassword)}
                type={"password"}
                placeholder={'Пароль'}
              />
              <span
                className={errors.password ?
                  `${styles.popupRegisterLogin__error} ${styles.popupRegisterLogin__error_active}` :
                  `${styles.popupRegisterLogin__error}`}>
             {errors?.password?.message || ""}
             </span>
              <input
                {...register('confirmPassword', confirmPassword)}
                placeholder="Повторите пароль"
                type={"password"}
                className={styles.popupRegisterLogin__input}
              />
              <span
                className={errors.confirmPassword ? `${styles.popupRegisterLogin__error} ${styles.popupRegisterLogin__error_active}`
                  :
                  `${styles.popupRegisterLogin__error}`}>{errors?.confirmPassword?.message || ""}
                  </span>
              <button
                disabled={!isValid || loadButton}
                className={!isValid || loadButton ? styles.popupRegisterLogin__button : `${styles.popupRegisterLogin__button} ${styles.popupRegisterLogin__button_active}`}>{loadButton ? 'Загрузка...' : 'Зарегистрироваться'}
              </button>
            </form>
          </>

        }

        {isEmailRegisterClicked && isLoginButtonClicked &&
          <>
            <form className={styles.popupRegisterLogin__formRegister} onSubmit={handleSubmit(onSubmitLogin)}>
              <input
                className={styles.popupRegisterLogin__input}
                {...register('email', validateEmail)}
                placeholder={'Адрес электронной почты'}
              />
              <span
                className={errors.email ?
                  `${styles.popupRegisterLogin__error} ${styles.popupRegisterLogin__error_active}` :
                  `${styles.popupRegisterLogin__error}`}>{errors?.email?.message || ""}
              </span>
              <input
                className={styles.popupRegisterLogin__input}
                {...register('password', validatePassword)}
                type={"password"}
                placeholder={'Пароль'}
              />
              <span
                className={errors.password ?
                  `${styles.popupRegisterLogin__error} ${styles.popupRegisterLogin__error_active}` :
                  `${styles.popupRegisterLogin__error}`}>
             {errors?.password?.message || ""}
             </span>
              <button
                disabled={!isValid || loadButton}
                className={!isValid || loadButton ? styles.popupRegisterLogin__button : `${styles.popupRegisterLogin__button} ${styles.popupRegisterLogin__button_active}`}>{loadButton ? 'Загрузка...' : 'Войти'}
              </button>
            </form>
          </>
        }

        {isEmailRegisterClicked &&
          <>
            <div className={styles.popupRegisterLogin__or}>
              <span
                className={styles.popupRegisterLogin__orText}>{isLoginButtonClicked ? 'Или войдите через' : 'Или зарегистрируйтесь через'}</span>
            </div>

            <div
              className={isLoginButtonClicked ? `${styles.popupRegisterLogin__socialBox} ${styles.popupRegisterLogin__socialBox_indent_margin}` : styles.popupRegisterLogin__socialBox}>
              <svg className={styles.popupRegisterLogin__svgPointer} width="40px" height="40px"
                   xmlns="http://www.w3.org/2000/svg"
                   xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 28 28">
                <defs>
                  <clipPath id="clip-path">
                    <path style={{fill: "none"}}
                          d="M22.79,12.36H14.21v3.48h4.94c-.46,2.21-2.39,3.48-4.94,3.48A5.32,5.32,0,1,1,17.6,9.87l2.68-2.62A9.29,9.29,0,0,0,14.21,5,9.08,9.08,0,0,0,5,14a9.08,9.08,0,0,0,9.21,9A8.59,8.59,0,0,0,23,14,7.31,7.31,0,0,0,22.79,12.36Z"/>
                  </clipPath>
                </defs>
                <g>
                  <path style={{fill: "#fff"}}
                        d="M26.45,0H1.55A1.55,1.55,0,0,0,0,1.55V26.45A1.55,1.55,0,0,0,1.55,28H26.45A1.55,1.55,0,0,0,28,26.45V1.55A1.55,1.55,0,0,0,26.45,0Z"/>
                  <g style={{clipPath: "url(#clip-path)"}}>
                    <path style={{fill: "#fbbc05"}} d="M4.16,19.32V8.68L11.28,14Z"/>
                  </g>
                  <g style={{clipPath: "url(#clip-path)"}}>
                    <path style={{fill: "#ea4335"}} d="M4.16,8.68,11.28,14l2.93-2.5,10-1.6V4.18H4.16Z"/>
                  </g>
                  <g style={{clipPath: "url(#clip-path)"}}>
                    <path style={{fill: "#34a853"}} d="M4.16,19.32,16.72,9.91l3.31.41,4.23-6.14V23.82H4.16Z"/>
                  </g>
                  <g style={{clipPath: "url(#clip-path)"}}>
                    <path style={{fill: "#4285f4"}} d="M24.26,23.82,11.28,14,9.6,12.77,24.26,8.68Z"/>
                  </g>
                </g>
              </svg>
              <svg className={styles.popupRegisterLogin__svgPointer} xmlns="http://www.w3.org/2000/svg" width="25"
                   height="25"
                   fill="#0088cc" viewBox="0 0 16 16">
                <path
                  d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
              </svg>

            </div>
          </>
        }


        {!isLoginButtonClicked &&
          <div className={styles.popupRegisterLogin__reminder}>
            <input className={styles.popupRegisterLogin__reminderCheckbox} type={"checkbox"}
                   onClick={() => setIsReminderActive(!isReminderActive)}/>
            <label className={styles.popupRegisterLogin__reminderText}>Получать уведомления о подарках и мероприятиях на
              почту</label>
          </div>
        }
      </div>
    </div>
  );
};

export default PopupRegisterLogin;
