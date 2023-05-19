import {useSelector} from "react-redux";
import Gift from "@/components/Gift/Gift";
import styles from "./index.module.scss"

const Reservation = () => {
  const {user} = useSelector((state) => state.user);
  return (

    <div className={styles.reservation}>
      <h1 className={styles.reservation__title}> Забронированные подарки</h1>
      <div className={styles.reservation__gifts}>
        {user?.reservedGifts?.map((gift) => (
          <Gift
            // wishlistOwner={wishlist.owner}
            // listId={wishlist._id}
            key={gift._id}
            gift={gift}
          />
        ))}

      </div>

    </div>

  );
};

export default Reservation;
