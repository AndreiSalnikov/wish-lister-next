import React, {useMemo, useState} from 'react';
import {useFormValidation} from "@/hooks/useFormValidation";
import styles from './PopupCreateList.module.scss'
import {mainApi} from "@/utils/MainApi";

const PopupCreateList = ({lists, setLists, isCreateButtonClicked, setIsCreateButtonClicked}) => {

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const gifts = []

    for (let i = 1; i<= clickCount;i++){
          const gift = {
      name: data[`name${i}`],
      specification: data[`specification${i}`],
      price: data[`price${i}`],
      link: data[`link${i}`],
    };
    gifts.push(gift);
    }
    // setLoadButton(true);
    // setErrorRegistration("");
    try {
    const newList  = await mainApi.createList(data.title, data.date, data.description, data.image,gifts);
      // console.log(wishlist)
      // await mainApi.login(data.email, data.password);
      // const userData = await mainApi.getServerInfo('/users/me');
      // dispatch(updateUser(userData));
      //
      // console.log(store.getState());
      // console.log(user);
      // // setUser(userData);
      // await router.replace('/lists')
    setIsCreateButtonClicked(false)
    setLists([...lists,newList])
    } catch (err) {
      console.error(err.message);
      // setErrorRegistration(err.message);
      // setLoadButton(false);
    }
  };

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

  const [clickCount, setClickCount] = useState(0);

  const handleButtonClick = () => {
    setClickCount(clickCount + 1);
  };

  const handleDeleteClick = () => {
    setClickCount(clickCount - 1);
  };

  const additionalFields = useMemo(() => {
    return Array.from({length: clickCount}).map((_, index) => (
      <div key={index}>
        <h2>Название</h2>
        <input required {...register(`name${index+1}`)}/>
        <h2>Описание</h2>
        <input {...register(`specification${index+1}`)}/>
        <h2>Цена</h2>
        <input required {...register(`price${index+1}`)}/>
        <h2>Ссылка</h2>
        <input required {...register(`link${index+1}`)}/>
        <button type="button" onClick={() => handleDeleteClick(index)}>
          Delete
        </button>
      </div>
    ));
  }, [clickCount]);

  return (
    <form className={isCreateButtonClicked ? `${styles.popup} ${styles.popup_active}` : `${styles.popup}`}
          onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2>Название</h2>
        <input required {...register('title')}/>
        <h2>Дата</h2>
        <input required {...register('date')}/>
        <h2>Описание</h2>
        <input {...register('description')}/>
        <h2>Ссылка на картинку</h2>
        <input {...register('image')}/>
        {clickCount > 0 &&
          additionalFields}
                <button type="button" onClick={handleButtonClick}>
          {clickCount === 0 ? 'Добавить подарок' : `Добавить ещё подарок`}
        </button>
      </div>

      <button>Создать</button>
    </form>

    // <form>
    //   {/*<input type="text" name="firstName" />*/}
    //   {/*<input type="text" name="lastName" />*/}

    // </form>
  );
};

export default PopupCreateList;
