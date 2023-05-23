import React, {useEffect, useState} from 'react';
import {mainApi} from "@/utils/MainApi";
import {useRouter} from 'next/router';
import Gift from "@/components/Gift/Gift";
import styles from './id.module.scss'
import {useSelector} from "react-redux";
import Image from "next/image";
import PopupCreateAndUpdateGift from "@/components/PopopAddGift/PopupCreateAndUpdateGift";
import PopupCreateAndUpdateList from "@/components/PopupCreateList/PopupCreateAndUpdateList";
import Error404Page from "@/pages/404"
import PopupShare from "@/components/PopupShare/PopupShare";

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
    setIsSharePopupOpen(true)
  }

  const [list, setList] = useState(null)
  const [isSharePopupOpen, setIsSharePopupOpen] = useState(false)
  const [isAddGiftPopupOpen, setIsAddGiftPopupOpen] = useState(false)
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false)
  const date = new Date(list?.date).toLocaleDateString('en-GB', {timeZone: 'Europe/Moscow'});
  const {user} = useSelector((state) => state.user);

  if (!list || list?.owner !== user?._id) {
    return <Error404Page/>;
  }

  return (
    <div className={styles.container}>
      <PopupCreateAndUpdateGift wishlistId={list?._id} setList={setList} isAddGiftPopupOpen={isAddGiftPopupOpen}
                                setIsAddGiftPopupOpen={setIsAddGiftPopupOpen}/>
      <PopupCreateAndUpdateList setList={setList}
                                list={list} isPopupOpen={isUpdatePopupOpen}
                                setIsPopupOpen={setIsUpdatePopupOpen}/>
      <PopupShare id={id} isPopupOpen={isSharePopupOpen} setIsPopupOpen={setIsSharePopupOpen}/>
      <div className={styles.left}>
        <h1 className={styles.title}>{list?.title}</h1>
        <p className={styles.date}>Дата: {date}</p>
        <Image width={400} height={300}
               src={list?.image || 'https://static.mk.ru/upload/entities/2021/09/24/03/articles/detailPicture/ad/f0/3b/f8/aa1602c4e8a45f36cfdacc8b1b045625.jpg'}
               alt={'картинка'}
               className={styles.image}/>
        <h2 className={styles.title}>Описание</h2>
        <p
          className={styles.description}>{list?.description === ' ' || list?.description === '' ? 'Отсутствует' : list?.description}</p>
        {user?._id === list?.owner &&
          <div>
            <button className={styles.editButton} onClick={() => setIsUpdatePopupOpen(true)}>Редактировать список
            </button>
            <button className={styles.editButton} onClick={shareList}>Поделиться</button>
          </div>
        }
      </div>
      <div className={styles.right}>

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
      {user?._id === list?.owner &&

        <button className={styles.add} onClick={() => setIsAddGiftPopupOpen(true)}>Добавить подарок</button>
      }
    </div>
  );
};

export default EditPage;
