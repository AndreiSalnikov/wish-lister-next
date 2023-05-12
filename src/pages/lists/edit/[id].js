import React, {useEffect, useState} from 'react';
import {mainApi} from "@/utils/MainApi";
import {useRouter} from 'next/router';
import Gift from "@/components/Gift/Gift";
import styles from './id.module.scss'
import {useSelector} from "react-redux";
import Image from "next/image";
import PopupAddGift from "@/components/PopopAddGift/PopupAddGift";
import PopupCreateAndUpdateList from "@/components/PopupCreateList/PopupCreateAndUpdateList";

const EditPage = () => {
  const router = useRouter();
  const {id} = router.query;
  useEffect(() => {
    if (id) {
      mainApi
        .getListForEdit(id).then((list) => setList(list))
        .catch((err) => console.log(err.message))
    }

  }, [id])

  const shareList = () => {
    router.push(`/lists/${id}`)
  }

  // const [isAddButtonClicked, setIsAddButtonClicked] = useState(false)
  const [list, setList] = useState(null)
  const [isAddGiftPopupOpen, setIsAddGiftPopupOpen] = useState(false)
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false)
  const date = new Date(list?.date).toLocaleDateString('en-GB', {timeZone: 'Europe/Moscow'});
  const {user} = useSelector((state) => state.user);
  return (
    <div className={styles.container}>
      <PopupAddGift wishlistId={list?._id} setList={setList} isAddGiftPopupOpen={isAddGiftPopupOpen}
                    setIsAddGiftPopupOpen={setIsAddGiftPopupOpen}/>
      <PopupCreateAndUpdateList setList={setList}
                                list={list} isPopupOpen={isUpdatePopupOpen}
                                setIsPopupOpen={setIsUpdatePopupOpen}/>
      <div className={styles.left}>
        <h1 className={styles.title}>{list?.title}</h1>
        <p className={styles.date}>Дата: {date}</p>
        <Image width={400} height={300} src={list?.image} alt={'картинка'}
               className={styles.image}/>
        <p className={styles.description}>{list?.description}</p>
        {user?._id === list?.owner &&
          <div>
            <button className={styles.editButton} onClick={() => setIsUpdatePopupOpen(true)}>Редактировать</button>
          <button onClick={shareList}>Поделиться</button>
          </div>
        }
      </div>
      <div className={styles.right}>
        {user?._id === list?.owner &&
          <div className={styles.add}>
            <button onClick={() => setIsAddGiftPopupOpen(true)}>Добавить подарок</button>
          </div>}
        {list?.gifts?.map((gift) => (
          <Gift
             setList={setList}
            wishlistOwner={list?.owner}
            listId={list?._id}
            key={gift._id}
            gift={gift}
          />
        ))
        }
      </div>
    </div>
  );
};

export default EditPage;
