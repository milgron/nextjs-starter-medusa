import styles from "../../styles/grid-single-product.module.css";

export const GridSingleProduct = ({data}) => {
    return(
        <>
            <div className={styles.product_card}>
                <div className={styles.product_image_wrapper}>
                    <img className={styles.product_image} src={data.thumbnail} />
                </div>
                <div className={styles.product_data_wrapper}>
                    <div className={styles.product_title_wrapper}>
                        <p className={styles.product_title}>{data.title}</p>
                    </div>
                    <div className={styles.product_price_wrapper}>
                        <div className={styles.product_price}>
                            <p><span className={styles.price_from}>from</span> {data.lower_price}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}