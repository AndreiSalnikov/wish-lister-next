import React, {useEffect, useState} from 'react';
import {withAuth} from "@/hoc/ProtectedRoute";
import {mainApi} from "@/utils/MainApi";
import PopupCreateAndUpdateList from "@/components/PopupCreateList/PopupCreateAndUpdateList";
import List from "@/components/List/List";
import styles from './index.module.scss'

const Lists = () => {
  const [lists, setLists] = useState([])
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  useEffect(() => {
    // Fetch the user if it hasn't been fetched yet
    mainApi
      .getLists()
      .then((data) => setLists(data))
      .catch((err) => console.error(err))
    // .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className={styles.lists}>
      <h1 className={styles.lists__title}>Ваши листы с подарками</h1>
      <section>
        {lists.map((list) => (
          <List
            setLists={setLists}
            list={list}
            key={list._id}
          />))}
      </section>

      <button onClick={() => setIsPopupOpen(true)}>Создать</button>
      <PopupCreateAndUpdateList isPopupOpen={isPopupOpen} setIsPopupOpen={setIsPopupOpen} setLists={setLists}
                                lists={lists}/>
    </div>
  );
};

export default withAuth(Lists);
