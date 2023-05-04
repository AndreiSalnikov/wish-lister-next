import React from 'react';
import Image from "next/image";
import styles from "./List.module.scss"
import {mainApi} from "@/utils/MainApi";
import {useRouter} from "next/router";

const List = ({list, setLists}) => {
  const router = useRouter()
  const openList = () => {
    router.push(`${router.pathname}/${list._id}`)
  }

  const deleteList = async (e) => {
    e.stopPropagation();
    try {
      await mainApi.deleteList(list._id)
      setLists((state) => state.filter((l) => {
        return l._id !== list._id
      }))
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  return (
    <div className={styles.list} onClick={openList}>
      <Image className={styles.list__img} src={list.image} width={200} height={200} alt='картинка'/>
      <div className={styles.list__box}>
        <div>
          <h2 className={styles.list__title} >{list.title}</h2>
          <p className={styles.list__date}>{list.date}</p>
          <p className={styles.list__text}>{list.description === ' ' ? 'Описание отсустствует' : list.description}</p>
        </div>
        <svg className={styles.list__close} onClick={deleteList} xmlns="http://www.w3.org/2000/svg" width="16"
             height="16"
             fill="currentColor" viewBox="0 0 16 16">
          <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
          <path
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
      </div>
    </div>
  );

};

export default List;
