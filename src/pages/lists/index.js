import {useEffect, useState} from 'react';
import {withAuth} from "@/hoc/ProtectedRoute";
import {mainApi} from "@/utils/MainApi";
import PopupCreateAndUpdateList from "@/components/PopupCreateList/PopupCreateAndUpdateList";
import List from "@/components/List/List";
import styles from './index.module.scss'

const Lists = () => {
  const [lists, setLists] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  useEffect(() => {
    mainApi
      .getLists()
      .then((data) => setLists(data))
      .catch((err) => console.error(err))
  }, []);

  return (
    <div className={styles.lists}>
      <h1 className={styles.lists__title}>Ваши списки с подарками</h1>
      <button className={styles.lists__button} onClick={() => setIsPopupOpen(true)}></button>
      <section>
        {lists.map((list) => (
          <List
            setLists={setLists}
            list={list}
            key={list._id}
          />))}
      </section>
      <PopupCreateAndUpdateList isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} setLists={setLists}
                                lists={lists}/>
    </div>
  );
};

export default withAuth(Lists);
