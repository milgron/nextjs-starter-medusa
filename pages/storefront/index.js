import React from 'react'
import { GridSingleProduct } from '../../components/storefront/grid-single-product';
import styles from "../../styles/storefront.module.css";
import { getMockProducts } from '../../utils/helper-functions';

const Storefront = ({products}) => {
    return(
        <div className={styles.container}>
            <div className={styles.product_cards_grid}>
                {products.map(productData => (
                    <GridSingleProduct data={productData} key={productData.id}/>
                ))}
            </div>
        </div>
    )
}

export const getStaticProps = async () => {
    const products = await getMockProducts('testing-products')

    return {
      props: {
        products
      }
    };
  };
  

export default Storefront