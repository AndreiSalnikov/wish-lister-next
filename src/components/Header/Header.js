import React, {useState} from 'react';
import Link from "next/link";
import styles from "./Header.module.scss"
import {useDispatch, useSelector} from "react-redux";
import Lama from "@/components/Lama/Lama";
import Image from "next/image";
import {mainApi} from "@/utils/MainApi";
import {useRouter} from "next/router";
import PopupRegisterLogin from "@/components/PopupRegisterLogin/PopupRegisterLogin";
import {updateUser} from "@/store/actions/user";

const Header = () => {
  const [popupIsOpen, setPopupIsOpen] = useState(false)
  const router = useRouter()
  const {user} = useSelector(state => state.user)
  const [isButtonPressed, setIsButtonPressed] = useState(false)
  const dispatch = useDispatch();
  const handlePressNav = () => {
    setIsButtonPressed(!isButtonPressed)
  }

  const logout = async () => {
    try {
      await mainApi.logout()
      dispatch(updateUser(null))
      await router.push('/')
      setIsButtonPressed(!isButtonPressed)
    } catch (error) {
      console.error(error)
    }


  }

  return (
    <header className={styles.header}>
      {user &&
        <>
          <Lama/>

          <div className={styles.header__icons}>
            <div className={styles.header__leftbox}>
              <svg className={styles.header__notifications} data-bbox="7 3 36 45" xmlns="http://www.w3.org/2000/svg"
                   viewBox="0 0 50 50" height="20" width="20">
                <g>
                  <path
                    d="M38.473 34.564L43 39.273v2.298H7v-2.298l4.527-4.71V22.959c0-3.662.88-6.82 2.64-9.474 1.797-2.729 4.294-4.504 7.492-5.326V6.532c0-.972.323-1.803.97-2.495C23.275 3.346 24.066 3 25 3c.934 0 1.734.346 2.398 1.037.665.692.997 1.523.997 2.495v1.626c3.162.822 5.64 2.616 7.437 5.382 1.76 2.654 2.641 5.793 2.641 9.418v11.606zM25 48c-1.364 0-2.523-.47-3.477-1.411-.955-.94-1.432-2.078-1.432-3.41h9.818c0 1.332-.487 2.47-1.46 3.41C27.473 47.529 26.324 48 25 48z"
                  >
                  </path>
                </g>
              </svg>

              <button className={styles.header__button} onClick={handlePressNav}>
                <div className={styles.header__avatarbox}>
                  <Image className={styles.header__avatar}
                         src={user.avatar}
                         width={30} height={30} alt='аватар'/>
                </div>
                <div
                  className={isButtonPressed ? `${styles.header__checkmark} ${styles.header__checkmark_active}` : ` ${styles.header__checkmark}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width='14' height='14' viewBox="0 0 26 26">
                    <g>
                      <g>
                        <polygon points="13,20.4 0,7.4 1.8,5.6 13,16.8 24.2,5.6 26,7.4   "></polygon>
                      </g>
                    </g>
                  </svg>
                </div>
              </button>
            </div>

            <nav
              className={isButtonPressed ? `${styles.header__navigation} ${styles.header__navigation_active}` : ` ${styles.header__navigation}`}>
              <ul className={styles.header__links}>
                <li><Link className={styles.header__link} href={'/'}
                          onClick={() => setIsButtonPressed(false)}>Главная</Link></li>
                <li><Link className={styles.header__link} href={'/profile'}
                          onClick={() => setIsButtonPressed(false)}>Профиль</Link></li>
                <li><Link className={styles.header__link} href={'/lists'} onClick={() => setIsButtonPressed(false)}>Списки
                  подарков</Link></li>
                <li><Link className={styles.header__link} href={'/lists'} onClick={() => setIsButtonPressed(false)}>Забронированные
                  подарки</Link></li>
                <li><Link className={styles.header__link} href={'/'} onClick={logout}>Выйти</Link></li>
              </ul>
            </nav>
          </div>
        </>
      }
      {!user &&
        <>
          <Lama/>
          <div className={styles.header__icons}>
            <button className={styles.header__button} onClick={() => setPopupIsOpen(true)}>
              <div className={styles.header__avatarbox}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                     viewBox="0 0 50 50">
                  <g>
                    <path
                      d="M25 48.077c-5.924 0-11.31-2.252-15.396-5.921 2.254-5.362 7.492-8.267 15.373-8.267 7.889 0 13.139 3.044 15.408 8.418-4.084 3.659-9.471 5.77-15.385 5.77m.278-35.3c4.927 0 8.611 3.812 8.611 8.878 0 5.21-3.875 9.456-8.611 9.456s-8.611-4.246-8.611-9.456c0-5.066 3.684-8.878 8.611-8.878M25 0C11.193 0 0 11.193 0 25c0 .915.056 1.816.152 2.705.032.295.091.581.133.873.085.589.173 1.176.298 1.751.073.338.169.665.256.997.135.515.273 1.027.439 1.529.114.342.243.675.37 1.01.18.476.369.945.577 1.406.149.331.308.657.472.98.225.446.463.883.714 1.313.182.312.365.619.56.922.272.423.56.832.856 1.237.207.284.41.568.629.841.325.408.671.796 1.02 1.182.22.244.432.494.662.728.405.415.833.801 1.265 1.186.173.154.329.325.507.475l.004-.011A24.886 24.886 0 0 0 25 50a24.881 24.881 0 0 0 16.069-5.861.126.126 0 0 1 .003.01c.172-.144.324-.309.49-.458.442-.392.88-.787 1.293-1.209.228-.232.437-.479.655-.72.352-.389.701-.78 1.028-1.191.218-.272.421-.556.627-.838.297-.405.587-.816.859-1.24a26.104 26.104 0 0 0 1.748-3.216c.208-.461.398-.93.579-1.406.127-.336.256-.669.369-1.012.167-.502.305-1.014.44-1.53.087-.332.183-.659.256-.996.126-.576.214-1.164.299-1.754.042-.292.101-.577.133-.872.095-.89.152-1.791.152-2.707C50 11.193 38.807 0 25 0"></path>
                  </g>
                </svg>

              </div>
              <p>Войти</p>
            </button>

          </div>

          <PopupRegisterLogin popupIsOpen={popupIsOpen} setPopupIsOpen={setPopupIsOpen}/>
        </>
      }

    </header>
  );
};

export default Header;
