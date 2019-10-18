import React from "react";
import logo from "../logo/tiff.svg";
import styles from "../App.module.css";

const Navbar = () => {
  return (
    <div className={styles.navigation_bar}>
      <img className={styles.logo} src={logo} alt="Tiff" />
      <a className={styles.company_title}>TIFF Movies</a>
    </div>
  );
};

export default Navbar;
