import {mainApi} from "@/utils/MainApi";
import styles from './id.module.scss'
import Gift from "@/components/Gift/Gift";
import {useSelector} from "react-redux";
import Image from "next/image";

const WishListPage = ({wishlist}) => {
  const date = new Date(wishlist.date).toLocaleDateString('en-GB', {timeZone: 'Europe/Moscow'});
  const {user} = useSelector((state) => state.user);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1 className={styles.title}>{wishlist.title}</h1>
        <p className={styles.date}>Дата: {date}</p>
        <Image width={400} height={300} src={wishlist.image} alt={wishlist.title} className={styles.image}/>
        <p className={styles.description}>{wishlist.description}</p>
      </div>
      <div className={styles.right}>
        {user._id === wishlist.owner && <div className={styles.add}>
          <button>Добавить подарок</button>
        </div>}
        {wishlist.gifts.map((gift) => (
          <Gift
            wishlistOwner={wishlist.owner}
            listId={wishlist._id}
            key={gift._id}
            gift={gift}
          />
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps({
                                           params
                                         }) {
  const {id} = params;
  const res = await mainApi.getList(id)
  const wishlist = await res.json();

  return {
    props: {
      wishlist,
    },
  };
}

export default WishListPage;
