import Link from "next/link";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import DisplayContext from "../../context/display-context";
import StoreContext from "../../context/store-context";
import { quantity, sum } from "../../utils/helper-functions";
import { BiMenu } from "react-icons/bi";
import styles from "../../styles/nav-bar.module.css";
import { useRouter } from "next/router";
import MedusaLogo from "../../public/medusa-logo.svg"

export const NavBar = () => {
  const { updateCartViewDisplay } = useContext(DisplayContext);
  const { cart } = useContext(StoreContext);
  const [isCheckout, setIsCheckout] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (router.pathname === "/checkout" || router.pathname === "/payment") {
      setIsCheckout(true);
    } else {
      setIsCheckout(false);
    }
  }, [router.pathname]);

  return (
    <div className={styles.container}>
      {!isCheckout ? (
        <button className={styles.btn} onClick={() => updateCartViewDisplay()}>
          <BiMenu size="20px"/>{" "}
          {/* <span>
            {cart.items.length > 0 ? cart.items.map(quantity).reduce(sum) : 0}
          </span> */}
        </button>
      ) : null}
      <Link href="/">
        <a style={{ width: "125px" }} className={styles.navbarLogo}>
        <Image src={MedusaLogo} height="40px" width="100%" alt="logo" />
        </a>
      </Link>
    </div>
  );
};

export default NavBar;
