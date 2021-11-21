import React from 'react'
import { GridSingleProduct } from '../../components/storefront/grid-single-product';
import styles from "../../styles/storefront.module.css";
import { getLowerPrice } from '../../utils/helper-functions';

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
    let products = require('../../data/testing-products.json')
    
    products.forEach(singleProduct => {
        singleProduct.lower_price = getLowerPrice(singleProduct.variants)
    })
  
    return {
      props: {
        products
      }
    };
  };
  

export default Storefront