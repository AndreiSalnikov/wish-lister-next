import React, {useEffect} from 'react';
import {useRouter} from "next/router";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import {useDispatch} from "react-redux";
import {mainApi} from "@/utils/MainApi";
import {updateUser} from "@/store/actions/user";

const Layout = ({children}) => {
  const location = useRouter()
  const dispatch = useDispatch();

  useEffect(() => {
    mainApi
      .getMe("/users/me")
      .then((data) => dispatch(updateUser(data)))
      .catch((err) => console.log(err.message))

  }, [dispatch])


  return (
    <>
      {location.pathname !== "/404" &&
        <Header/>
      }
      {children}
      {location.pathname === "/" &&
        <Footer/>}
    </>
  );
};

export default Layout;
