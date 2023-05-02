import {mainApi} from "@/utils/MainApi";
import styles from './id.module.scss'
import Gift from "@/components/Gift/Gift";

const WishListPage = ({wishlist}) => {

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1 className={styles.title}>{wishlist.title}</h1>
        <p className={styles.date}>Дата: {wishlist.date}</p>
        <img src={wishlist.image} alt={wishlist.title} className={styles.image}/>
        <p className={styles.description}>{wishlist.description}</p>
      </div>
      <div className={styles.right}>
        {wishlist.gifts.map((gift) => (
          <Gift
            wishlistOwner = {wishlist.owner}
            listId={wishlist._id}
            key={gift._id}
            gift={gift}
          />
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps({params}) {
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
