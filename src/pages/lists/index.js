import React, {useEffect, useState} from 'react';
import {withAuth} from "@/hoc/ProtectedRoute";
import {mainApi} from "@/utils/MainApi";
import PopupCreateList from "@/components/PopupCreateList/PopupCreateList";
import List from "@/components/List/List";

const Lists = () => {
  const [isCreateButtonClicked, setIsCreateButtonClicked] = useState(false);
  const [lists, setLists] = useState([])

  useEffect(() => {
    // Fetch the user if it hasn't been fetched yet
    mainApi
      .getLists()
      .then((data) => setLists(data))
      .catch((err) => console.error(err))
    // .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1>Ваши листы с подарками</h1>
      <section className={{/*styles.cards*/}}>
        {lists.map((list) => (
          <List
            setLists={setLists}
            list={list}
            key={list._id}
          />))}
      </section>

      <button onClick={() => setIsCreateButtonClicked(true)}>Создать</button>
      <PopupCreateList setLists={setLists} lists={lists}
        isCreateButtonClicked={isCreateButtonClicked}
                       setIsCreateButtonClicked={setIsCreateButtonClicked}/>
    </>
  );
};

export default withAuth(Lists);
