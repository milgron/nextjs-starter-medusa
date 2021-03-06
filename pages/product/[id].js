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

  const [isMessageActive, setIsMessageActive] = useState(false)
  const [isDetailsOpen,setIsDetailsOpen] = useState(false)
  const [selectionMade,setSelectionMade] = useState(false)

  const handleDetailsClick = () => {
    return setIsDetailsOpen(!isDetailsOpen)
  }

  useEffect(() => {
    if (product) {
      setOptions(resetOptions(product));
    }
  }, [product]);

  const handleAddToBag = async () => {
    addVariantToCart({options,product});
    if (product) setOptions(resetOptions(product));
    setIsMessageActive(true)
    await setTimeout(() => {
      setIsMessageActive(false)
    }, 3500);
  };

  const handleVariantSelection = (event) => {
    setSelectionMade(true)
    const [variant] = product.variants.filter(each => {
      if(each.title == event.target.value) return each
    })
    const stock = variant.prices[0].amount
    setOptions({
      variantId: variant.prices[0].variant_id,
      quantity: options.quantity,
      size: variant.title,
      stock: stock
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
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>{product.title}</h1>
            <div className={styles.messageContainer}>
              <div className={!isMessageActive ? styles.messageWrapper : `${styles.messageWrapper} ${styles.active}`}>
                <span> added to bag ???????</span>
              </div>
            </div>
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
              }
              defaultValue={'DEFAULT'} 
              >
              <option value="DEFAULT" disabled>{product.options[0].title}</option>
              {product.variants
                .slice(0)
                .reverse()
                .map((v) => {
                  return v.inventory_quantity !== 0
                    ? <option key={v.id}> {v.title} </option>
                    : <option key={v.id} disabled> {v.title} (sold out)</option>
                })}
            </select>
          </div>
          <button className={selectionMade ? styles.addbtn : `${styles.addbtn} ${styles.notAllowed}`} onClick={() => handleAddToBag()}>
            {selectionMade
            ? 'Add to cart'
            : 'Please select an option'
            }
          </button>
          <div className={selectionMade ? styles.productDetailsWrapper : 'hidden'}>
            <div className={!isDetailsOpen ? styles.seeDetailsWrapper : `${styles.seeDetailsWrapper} ${styles.active}`} onClick={() => handleDetailsClick()}>
              <span>Product details</span>
              <span><BiChevronDown size="20px"/></span>
            </div>
            <div className={!isDetailsOpen ? styles.informationWrapper : `${styles.informationWrapper} ${styles.active}`}>
              {options.stock !== 0
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
