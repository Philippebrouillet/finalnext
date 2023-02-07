import React from "react";

import styles from "@/styles/Header.module.css";
import logo from "../assets/logo.png";
import Image from "next/image";
import Link from "next/link";

const Header = () => {
  return (
    <div className={styles.headerContainer}>
      <Link href="/">
        <Image src={logo} alt="logoGreenShield" priority={true} id="logo" />
      </Link>
      <Link href="#logo">
        <button className={styles.arrowToTop}>
          <p>↑</p>
        </button>
      </Link>
    </div>
  );
};

export default Header;
