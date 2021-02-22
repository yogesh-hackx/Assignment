import { useState, useEffect } from "react"
import axios from "axios"
import { createServer, Model } from "miragejs"
import styles from '../../styles/Products.module.scss'
import Product from './Product'
import Banner from './Banner'
import PRODUCTS from '../../API/products.json'


createServer({
    routes() {
        this.passthrough('/_next/static/development/_devPagesManifest.json');
        this.get("/api/products", () => ({
            products: PRODUCTS,
        }))
    }
})

const Products = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {

        axios.get('/api/products').then(res => setProducts(res.data.products))
    }, [])
    return (
        <div className={styles.productsContainer}>
            <div className={styles.cards}>
                {
                    products.map((product, index) => (
                        <>
                            {index === 3 && <Banner key="banner" />}
                            <Product
                                key={product.id}
                                id={product.id}
                                thumbnailUrl={product.media[0].productImageUrl}
                                title={product.name}
                                price={product.price.formattedValue}
                                url={product.id}
                            />
                        </>
                    ))
                }
            </div>
        </div>
    )
}

export default Products