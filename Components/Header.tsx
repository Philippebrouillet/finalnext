import React from "react";

import styles from "@/styles/Header.module.css";
import logo from "../assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useWindowScroll } from "react-use";

const Header = () => {
  const { y } = useWindowScroll();
  const Show = y >= 200;

  return (
    <div className={styles.headerContainer}>
      <Link href="/">
        <Image src={logo} alt="logoGreenShield" priority={true} id="logo" />
      </Link>
      {Show ? (
        <Link href="#logo">
          <button className={styles.arrowToTop}>
            <p>↑</p>
          </button>
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
