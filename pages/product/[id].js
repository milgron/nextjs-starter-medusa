import React, { useEffect, useState, useContext } from "react";
import Image from "next/image"
import { BiChevronDown } from "react-icons/bi";
import StoreContext from "../../context/store-context";
import { formatPrice, getMockProducts, resetOptions } from "../../utils/helper-functions";
import styles from "../../styles/product.module.css";
import { createClient } from "../../utils/client";

const Product = ({ product }) => {
  const { addVariantToCart, cart } = useContext(StoreContext);
  const [options, setOptions] = useState({
    variantId: "",
    quantity: 0,
    size: "",
  });

  const [isDetailsOpen,setIsDetailsOpen] = useState(false)

  const handleDetailsClick = () => {
    return setIsDetailsOpen(!isDetailsOpen)
  }

  useEffect(() => {
    if (product) {
      setOptions(resetOptions(product));
    }
    getNavHeight()
  }, [product]);

  // const handleQtyChange = (action) => {
  //   if (action === "inc") {
  //     if (
  //       options.quantity <
  //       product.variants.find(({ id }) => id === options.variantId)
  //         .inventory_quantity
  //     )
  //       setOptions({
  //         variantId: options.variantId,
  //         quantity: options.quantity + 1,
  //         size: options.size,
  //       });
  //   }
  //   if (action === "dec") {
  //     if (options.quantity > 1)
  //       setOptions({
  //         variantId: options.variantId,
  //         quantity: options.quantity - 1,
  //         size: options.size,
  //       });
  //   }
  // };

  const getNavHeight = () => {
    // const height = document.querySelector('.nav-bar_container__ksV_l').clientHeight
    // return height
  }

  const handleAddToBag = () => {
    addVariantToCart({
      variantId: options.variantId,
      quantity: options.quantity,
    });
    if (product) setOptions(resetOptions(product));
  };

  const handleVariantSelection = (event) => {
    const [variant] = product.variants.filter(each => {
      if(each.title == event.target.value) return each
    })
    setOptions({
      variantId: variant.prices[0].variant_id,
      quantity: options.quantity,
      size: variant.title,
      stock: variant.inventory_quantity
    })
  }

  return (
    <div className={styles.container}>
      <figure className={styles.image}>
        <div className={styles.placeholder}>
          <Image
            height="250px"
            width="100%"
            priority={true}
            loading="eager"
            src={product.thumbnail}
            alt={`${product.title}`}
          />
        </div>
      </figure>
      <div className={styles.info}>
        <div className={styles.details}>
          <div className={styles.title}>
            <h1>{product.title}</h1>
          </div>
          <div className={styles.priceWrapper}>
            <p className="price"><span className={styles.fromPrice}>from </span>{product.lower_price}</p>
          </div>
          <div className={styles.descriptionWrapper}>
            <p>{product.description}</p>
          </div>
          <div className={styles.selection}>
            <select 
              className={styles.select} 
              onChange={(e) =>
                handleVariantSelection(e)
              }>
              <option disabled>{product.options[0].title}</option>
              {product.variants
                .slice(0)
                .reverse()
                .map((v) => {
                  return (
                    <option key={v.id}> {v.title} </option>
                  );
                })}
            </select>
          </div>
          <button className={styles.addbtn} onClick={() => handleAddToBag()}>
            Add to cart
          </button>
          <div className={styles.productDetailsWrapper}>
            <div className={!isDetailsOpen ? styles.seeDetailsWrapper : `${styles.seeDetailsWrapper} ${styles.active}`} onClick={() => handleDetailsClick()}>
              <span>Product details</span>
              <span><BiChevronDown size="20px"/></span>
            </div>
            <div className={!isDetailsOpen ? styles.informationWrapper : `${styles.informationWrapper} ${styles.active}`}>
              {options.stock > 0
              ? <p>Available stock: {options.stock}</p>
              : <p>Stock sold out :(</p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//create a Medusa client
const client = createClient();

export async function getStaticPaths() {
  // Call an external API endpoint to get products
  // const data = await client.products.list();
  // const products = data.products;

  const products = getMockProducts('testing-products')
  // Get the paths we want to pre-render based on the products
  const paths = products.map((product) => ({
    params: { id: product.id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }) {
  // params contains the product `id`.
  // If the route is like /product/prod_1, then params.id is 1
  // const data = await client.products.retrieve(params.id);
  let data = await getMockProducts('testing-products')

  const [selectedData] = data.filter(eachProduct => {
    if(eachProduct.id == params.id) return eachProduct
  })

  // Pass post data to the page via props
  return { props: { product: selectedData } };
}

export default Product;
