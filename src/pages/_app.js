import '@/styles/globals.scss'
import Layout from "@/hoc/Layout";
import {useEffect} from "react";

export default function App({Component, pageProps}) {

    useEffect(() => {
    const el = document.querySelector('#__next');
    document.body.classList.add('page');
    el.classList.add('root')
    return () => {
      document.body.classList.remove('root');
      el.classList.remove('root')
    };
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
