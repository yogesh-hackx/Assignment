import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { createServer, Model } from "miragejs"
import axios from 'axios'
import PRODUCTS from '../../API/products.json'
import styles from '../../styles/Product.module.scss'

createServer({
    models: {
        product: Model,
    },
    routes() {
        this.passthrough('/_next/static/development/_devPagesManifest.json');
        this.get("/api/products", (schema, request) => (schema.products.all()))
        this.get("/api/products/:id", (schema, request) => {
            let id = request.params.id
            return schema.products.find(id)
        }, {timing: 0})
    },
    seeds(server) {
        PRODUCTS.map(product => server.create('product', product))
    }
})

const Product = () => {
    const [product, setProduct] = useState()
    const router = useRouter()
    const { id } = router.query

    useEffect(() => {
        if (id) {
            axios.get(`/api/products/${id}`).then(res => setProduct(res.data.product))
        }
    }, [id])
    return (
        <>
            <div className={styles.productPage}>
                <div className={styles.heroContainer}>
                    <div className={styles.col}>
                        <div className={styles.imgContainer}>
                            <img src={`https://www.reliancedigital.in${product?.media[0].productImageUrl}`} layoutId={product?.id} className={styles.prodImg} style={{ mixBlendMode: 'multiply' }} alt="" />
                        </div>
                    </div>
                    <div className={styles.col}>
                        <h1 className={styles.title}>{product?.name}</h1>
                        <div className={styles.priceContainer}>
                            <span className={styles.price}>34,999</span>
                            <button>Add to Cart</button>
                        </div>
                        <h2>Key Features: </h2>
                        <div className={styles.summary} dangerouslySetInnerHTML={{ __html: product?.summary }} />
                    </div>
                </div>
                <div className={styles.description} dangerouslySetInnerHTML={{ __html: product?.description }} />
            </div>
        </>
    )
}

export default Product