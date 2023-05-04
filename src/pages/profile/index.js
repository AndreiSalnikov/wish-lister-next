import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {withAuth} from "@/hoc/ProtectedRoute";
import {useFormValidation} from "@/hooks/useFormValidation";
import styles from "./index.module.scss"
import Image from "next/image";


const Profile = () => {
  const onSubmit = (data, e) => {
    e.preventDefault();
     console.log(data);
  }

  const {user} = useSelector(state => state.user)

  const {
    register,
    handleSubmit,
    errors,
    isValid,
    validateName,
    validateEmail,
  } = useFormValidation({name: user.name, email: user.email});


  const [isReminderActive, setIsReminderActive] = useState(user?.reminder)
  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false)
  return (
    <>
      <div className={styles.profile}>
        <div className={styles.profile__leftbox}>
          <div className={styles.profile__box}>
            <div className={styles.profile__imgbox}>
              <Image className={styles.profile__img}
                     src='https://img.freepik.com/premium-vector/cute-business-llama-icon-illustration-alpaca-mascot-cartoon-character-animal-icon-concept-isolated_138676-989.jpg?w=2000'
                     width={90} height={90} alt='аватар'/>
              <svg className={styles.profile__dots} viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path
                  d="M12.5,17 C13.329,17 14,17.672 14,18.5 C14,19.328 13.329,20 12.5,20 C11.671,20 11,19.328 11,18.5 C11,17.672 11.671,17 12.5,17 Z M12.5,11 C13.329,11 14,11.672 14,12.5 C14,13.328 13.329,14 12.5,14 C11.671,14 11,13.328 11,12.5 C11,11.672 11.671,11 12.5,11 Z M12.5,5 C13.329,5 14,5.672 14,6.5 C14,7.328 13.329,8 12.5,8 C11.671,8 11,7.328 11,6.5 C11,5.672 11.671,5 12.5,5 Z"></path>
              </svg>
            </div>
          </div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
        <div className={styles.profile__rightbox}>
          <div className={styles.profile__edittop}>
            <h1>Профиль</h1>
            <div className={styles.profile__date}>Дата создания аккаунта: {222}</div>
            <button className={styles.profile__editbutton}>
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path
                  d="M18.8525,7.543 L17.7515,8.644 L15.3565,6.248 L16.4575,5.147 C16.5555,5.05 16.6835,5.001 16.8105,5.001 C16.9385,5.001 17.0665,5.05 17.1645,5.147 L18.8525,6.835 C19.0475,7.03 19.0475,7.348 18.8525,7.543 L18.8525,7.543 Z M8.1895,18.206 C8.1185,18.276 8.0275,18.324 7.9295,18.344 L5.1275,18.873 L5.6575,16.07 C5.6755,15.972 5.7225,15.882 5.7945,15.811 L14.6495,6.955 L17.0445,9.351 L8.1895,18.206 Z M19.5595,6.128 L17.8715,4.44 C17.2865,3.856 16.3355,3.856 15.7505,4.44 L5.0875,15.103 C4.8735,15.317 4.7295,15.588 4.6745,15.886 L4.0085,19.407 C3.9775,19.569 4.0295,19.736 4.1465,19.854 C4.2415,19.948 4.3685,20 4.4995,20 C4.5305,20 4.5615,19.997 4.5925,19.991 L8.1165,19.326 C8.4145,19.269 8.6855,19.125 8.8965,18.912 L19.5595,8.25 C20.1445,7.665 20.1445,6.713 19.5595,6.128 L19.5595,6.128 Z"></path>
              </svg>
              Редактировать профиль
            </button>
          </div>
          <h3>Обо мне</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
      <textarea
        {...register("about")}
        placeholder="Расскажите о себе..."
        className={styles.profile__about}
      />
              </label>
            <input className={styles.profile__inputAbout} type="submit" value="Сохранить"/>
          </form>
        </div>
      </div>
    </>
  );
};

export default withAuth(Profile);
