import styles from '../../styles/Banner.module.scss'

const Banner = () => {
    return (
        <div className={styles.banner}>
            <div className={styles.innerBanner}>
                <h2 className={styles.bannerText}>
                    Discounts Upto 20%
            </h2>
            </div>
        </div>
    )
}

export default Banner