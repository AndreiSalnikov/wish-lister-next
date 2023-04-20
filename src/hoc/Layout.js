import React from 'react';
import {useRouter} from "next/router";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const Layout = ({children}) => {
  const location = useRouter()
  return (
    <>
      {(location.pathname !== "/signin" && location.pathname !== "/signup" && location.pathname !== "/404") &&
        <Header/>}
      {children}
      {(location.pathname !== "/signin" && location.pathname !== "/signup" && location.pathname !== "/profile" && location.pathname !== "/404") &&
        <Footer/>}
    </>
  );
};

export default Layout;
