import React, { useContext } from "react";
import DisplayContext from "../../context/display-context";
import StoreContext from "../../context/store-context";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "../../styles/cart-view.module.css";
import { quantity, sum, formatPrice, getFixedPrice } from "../../utils/helper-functions";
import { formatPrices } from "../../utils/prices";
import MedusaLogo from "../../public/medusa-logo.svg"
import { BiTrash, BiX } from "react-icons/bi";

const CartView = () => {
  const { cartView, updateCartViewDisplay, updateCheckoutStep } =
    useContext(DisplayContext);
  const { cart, currencyCode, updateLineItem, removeLineItem } =
    useContext(StoreContext);
  const router = useRouter();

  const { deleteCartItem } = useContext(StoreContext);


  const handleItemDelete = (index) => {
    deleteCartItem({index})
  }

  const getSubTotal = () => {
    var subtotal = 0
    cart.items.forEach(item => {
      subtotal = subtotal + item.price
    })

    return formatPrice(subtotal, currencyCode)
  }

  return (
    <div className={`${styles.container} ${cartView ? styles.active : null}`}>
      <div className={styles.top}>
        <p><strong>Bag</strong></p>
          {/* {cart.items.length > 0 ? cart.items.map(quantity).reduce(sum) : 0}{" "}
          {cart.items.length > 0 && cart.items.map(quantity).reduce(sum) === 1
            ? "item"
            : "items"} */}
          {cart.items.length > 0
          ? <p>{cart.items.length} items</p> 
          : <p>Empty</p>
          }
        <button
          className={styles.closebtn}
          onClick={() => updateCartViewDisplay()}
        >
          <BiX size="20px" className={styles.closeX}/>
        </button>
      </div>
      <div className={styles.overview}>
        {/* {cart.items
          .sort((a, b) => {
            const createdAtA = new Date(a.created_at),
              createdAtB = new Date(b.created_at);

            if (createdAtA < createdAtB) return -1;
            if (createdAtA > createdAtB) return 1;
            return 0;
          })
          .map((i) => {
            return (
              <div key={i.id} className={styles.product}>
                <figure onClick={() => updateCartViewDisplay()}>
                  <Link
                    href={{
                      pathname: `/product/[id]`,
                      query: { id: i.variant.product.id },
                    }}
                    passHref
                  >
                    <a>
                      <div className={styles.placeholder}>
                      <Image
                        objectFit="cover"
                        height="100%"
                        width="100%"
                        src={i.variant.product.thumbnail}
                        alt={`${i.title}`}
                      />
                      </div>
                    </a>
                  </Link>
                </figure>
                <div className={styles.controls}>
                  <div>
                    <div>
                      <Link
                        href={{
                          pathname: `/product/[id]`,
                          query: { id: i.variant.product.id },
                        }}
                        passHref
                      >
                        <a>{i.title}</a>
                      </Link>
                      <p className={styles.size}>Size: {i.variant.title}</p>
                      <p className={styles.size}>
                        Price:{" "}
                        {formatPrices(cart, i.variant)}
                      </p>
                    </div>
                    <div>
                      <div className={styles.mid}>
                        <div className={styles.selector}>
                          <button
                            className={styles.qtybtn}
                            onClick={() =>
                              updateLineItem({
                                lineId: i.id,
                                quantity: i.quantity - 1,
                              })
                            }
                          >
                            {"–"}
                          </button>
                          <p className={styles.ticker}>{i.quantity}</p>
                          <button
                            className={styles.qtybtn}
                            onClick={() =>
                              updateLineItem({
                                lineId: i.id,
                                quantity: i.quantity + 1,
                              })
                            }
                          >
                            {"+"}
                          </button>
                        </div>
                      </div>
                      <p>{}</p>
                    </div>
                  </div>
                  <button
                    className={styles.remove}
                    onClick={() => removeLineItem(i.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })} */}
          {cart.items.map((item,index) => (
            <div className={styles.singleCartProductWrapper} key={item.items[0].variantId + index}>
              <span>{item.items[0].quantity} - {item.title} ({item.items[0].size})</span>
              <div className={styles.priceAndTrashWrapper}>
                <span className={styles.priceWrapper}>{item.formated_price}</span>
                <BiTrash size="20px" className={styles.trash} onClick={(e) => handleItemDelete(index)}/>
              </div>
            </div>
          ))}
      </div>
      <div className={styles.subtotal}>
        <p>Subtotal (incl. taxes)</p>
        <span>
          {getSubTotal()}
        </span>
      </div>
      <div className={styles.bottom}>
        <button
          className={styles.checkoutbtn}
          onClick={() => {
            updateCheckoutStep(1);
            updateCartViewDisplay();
            router.push("/checkout");
          }}
          disabled={cart.items.length < 1 ? true : false}
        >
          Checkout
        </button>
      </div>
      <div className={styles.logoWrapper}>
        <span className={styles.label}>Powered by</span> <Image src={MedusaLogo} height="25px" width="100%" alt="logo" className={styles.logo}/>
      </div>
    </div>
  );
};

export default CartView;
