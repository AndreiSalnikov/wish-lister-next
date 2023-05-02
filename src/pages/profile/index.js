import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {withAuth} from "@/hoc/ProtectedRoute";

const onSubmit = (e) => {
  e.preventDefault();
}

const Profile = () => {
  const {user} = useSelector(state => state.user)
  const [isReminderActive, setIsReminderActive] = useState(user?.reminder)
  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false)
  return (
    <form className="profile" onSubmit={onSubmit}>
      {!isEditButtonClicked &&
        <>
          <h1 className="profile__heading">{user?.name}</h1>
          <p className="profile__email">{user?.email}</p>
        </>
      }
      {isEditButtonClicked &&
        <>
          <input placeholder='Имя'/>
          <input placeholder='Email'/>
        </>
      }
      <input type='checkbox' checked={isReminderActive} onClick={() => setIsReminderActive(!isReminderActive)}/>
      <button onClick={() => setIsEditButtonClicked(!isEditButtonClicked)}>Редактировать</button>
    </form>
  );
};

export default withAuth(Profile);
