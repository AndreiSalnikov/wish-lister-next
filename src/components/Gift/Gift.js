import {useState} from 'react';
import styles from './Gift.module.scss';
import {mainApi} from "@/utils/MainApi";
import {useSelector} from "react-redux";
import PopupRegisterLogin from "@/components/PopupRegisterLogin/PopupRegisterLogin";

const Gift = ({gift, listId, wishlistOwner}) => {
  const {user} = useSelector((state) => state.user);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [isReserved, setIsReserved] = useState(gift.reservation.length)
  const [popupIsOpen, setPopupIsOpen] = useState(false)
  const handleReservation = async () => {
    try {
      if (!user) {
        setPopupIsOpen(!popupIsOpen)
        return null
      }
      if (isReserved > 0 || isButtonClicked) {
        await mainApi.reservationOff(gift._id, listId)
        setIsReserved(0)
        setIsButtonClicked(false)
      } else {
        await mainApi.reservationOn(gift._id, listId)
        setIsReserved(1)
        setIsButtonClicked(true)
      }

    } catch (error) {
      console.error(error)
    }

  };

  return (
    <>
      <PopupRegisterLogin popupIsOpen={popupIsOpen} setPopupIsOpen={setPopupIsOpen}/>

        <div className={styles.gift} key={gift._id}>
          <h3 className={styles.giftName}>{gift.name}</h3>
          <p className={styles.giftSpec}>{gift.specification}</p>
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
            {isButtonClicked || isReserved > 0 ? 'Забронировано' : 'Забронировать'}
          </button>
        </div>

    </>
  );
}


export default Gift;
