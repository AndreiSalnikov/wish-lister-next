import React from 'react';
import {useRouter} from "next/router";

const GiftPage = () => {
  const {asPath,pathname, query} = useRouter()

  console.log(asPath,pathname,query)

  return (
    <div>
      GIFTTT
    </div>
  );
};

  export default GiftPage;
