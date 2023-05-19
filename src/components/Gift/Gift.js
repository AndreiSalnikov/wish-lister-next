import {useState} from 'react';
import styles from './Gift.module.scss';
import {mainApi} from "@/utils/MainApi";
import {useDispatch, useSelector} from "react-redux";
import PopupRegisterLogin from "@/components/PopupRegisterLogin/PopupRegisterLogin";
import {useRouter} from "next/router";
import PopupCreateAndUpdateGift from "@/components/PopopAddGift/PopupCreateAndUpdateGift";
import {updateUser} from "@/store/actions/user";

const Gift = ({setList, gift, listId, wishlistOwner}) => {
  const {user} = useSelector((state) => state.user);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isReserved, setIsReserved] = useState(gift.reservation.length)
  const [popupIsOpen, setPopupIsOpen] = useState(false)
  const [isAddGiftPopupOpen, setIsAddGiftPopupOpen] = useState(false)
  const router = useRouter();
  const isEditing = router.pathname.includes('edit');
  const dipatch = useDispatch();
  const handleReservation = async () => {
    try {
      if (!user) {
        setPopupIsOpen(!popupIsOpen)
        return null
      }
      if (isReserved > 0 || isButtonClicked) {
        await mainApi.reservationOff(gift._id, listId)
        const arr = await mainApi.deleteGiftReservationUser(gift._id)
        dipatch(updateUser(arr))
        setIsReserved(0)
        setIsButtonClicked(false)
      } else {
        await mainApi.reservationOn(gift._id, listId)
        const arr = await mainApi.addGiftReservationUser(gift._id, listId)
        dipatch(updateUser(arr))
        setIsReserved(1)
        setIsButtonClicked(true)
      }

    } catch (error) {
      console.error(error)
    }
  };

  const deleteGift = async (e) => {
    e.preventDefault();
    try {
      await mainApi.deleteGift(listId, gift._id)
      setList((state) => {
        const updatedGifts = state.gifts.filter((gf) => gf._id !== gift._id);
        return {
          ...state,
          gifts: updatedGifts
        };
      });
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  const editGift = () => {
    setIsAddGiftPopupOpen(true)
  }

  return (
    <>
      <PopupRegisterLogin popupIsOpen={popupIsOpen} setPopupIsOpen={setPopupIsOpen}/>
      <PopupCreateAndUpdateGift gift={gift} wishlistId={listId} setList={setList}
                                isAddGiftPopupOpen={isAddGiftPopupOpen}
                                setIsAddGiftPopupOpen={setIsAddGiftPopupOpen}/>
      <div className={styles.gift} key={gift._id}>

        <div className={styles.gift__box}>
          <div className={styles.gift__top}>
            <h3 className={styles.giftName}>{gift.name}</h3>
            <div>
              {user?._id === wishlistOwner && isEditing &&
                <svg className={styles.gift__icon} onClick={editGift} fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16"
                     xmlns="http://www.w3.org/2000/svg">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              }
              {user?._id === wishlistOwner && isEditing &&
                <svg className={styles.gift__icon} onClick={deleteGift} xmlns="http://www.w3.org/2000/svg" width="16"
                     height="16"
                     fill="currentColor" viewBox="0 0 16 16">
                  <path
                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path
                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>}

            </div>
          </div>
          <p className={styles.giftSpec}>{gift.specification ? gift.specification : 'Описание отсутствует'}</p>
          <p className={styles.giftPrice}>Цена: {gift.price}</p>
          <a href={gift.link} target="_blank" className={styles.giftLink}>
            Купить
          </a>
          <button
            disabled={gift?.reservation[0] !== user?._id && gift?.reservation[0] !== undefined || user?._id === wishlistOwner}
            className={
              isButtonClicked || isReserved > 0 || user?._id === wishlistOwner
                ? `${styles.reservation} ${styles.reservation_active}`
                : `${styles.reservation}`
            }
            onClick={handleReservation}
          >
            {isButtonClicked || isReserved > 0 || gift?.reservation[0] || user?._id === wishlistOwner ? (user?._id === wishlistOwner ? 'Вы владелец' : 'Забронировано') : 'Забронировать'}
          </button>
        </div>

      </div>

    </>
  );
}


export default Gift;
