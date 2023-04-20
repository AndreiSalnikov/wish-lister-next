import React from 'react';
import styles from './Logo.module.scss'
import Link from "next/link";
const Logo = () => {
  return (
    <div>
          <Link
     /* className={location.pathname === '/registration' || location.pathname === '/login' ? `${styles.logo} ${styles.logo__type_center}` : `${styles.logo}`}*/
            className={styles.logo}
      href="/">
    </Link>
    </div>
  );
};

export default Logo;
