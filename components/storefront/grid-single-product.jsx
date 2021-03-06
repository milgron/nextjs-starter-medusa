import styles from "../../styles/grid-single-product.module.css";
import Link from "next/link";
import Image from 'next/image'

export const GridSingleProduct = ({data}) => {
    return(
        <Link
            href={{ pathname: `/product/${data.id}`}}
            passHref
        >
            <a>
                <div className={styles.product_card}>
                        <Image
                            className={styles.product_image}
                            src={data.thumbnail}
                            width="185px"
                            height="225px"
                        />
                        {/* <img className={styles.product_image} src={data.thumbnail} /> */}
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
            </a>
        </Link>
    )
}