import { Button } from 'antd'
import Link from 'next/link'
import {IoMdCart} from 'react-icons/io'
import styles from '../../styles/Products.module.scss'

const Product = ({ id, thumbnailUrl, title, price, url }) => {
    return (
        <Link href={'/product/' + url} key={id}>
            <div className={styles.card}>
                <div className={styles.imgContainer}>
                    <img src={`https://www.reliancedigital.in${thumbnailUrl}`} alt="product-image" />
                </div>
                <div className={styles.content}>
                    <div className={styles.row1}>
                        <p className={styles.title}>
                            {title}
                        </p>
                    </div>
                    <div className={styles.row2}>
                        <div className={styles.price}>
                            {price}
                        </div>
                        <Button type="secondary" shape="round" icon={<IoMdCart />} size="small">
                            Buy
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default Product
