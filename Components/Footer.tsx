import Image from "next/image";
import React from "react";
import logo from "../assets/logo.png";

import styles from "@/styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.FooterContainer}>
      <Image className={styles.imgFooter} priority={true} src={logo} alt="" />
    </div>
  );
};

export default Footer;
