import { useEffect, useState } from 'react'
import Header from "./Header";
import Footer from "./Footer"
import Sidebar from './Sidebar'
import styles from '../styles/Layout.module.scss'

const Layout = (props) => {
    const {children} = props
    const [showSidebar, setShowSidebar] = useState(false)
    useEffect(() => {
        const isAdmin = JSON.parse(localStorage.getItem('userData'))?.isAdmin
        if (isAdmin)
            setShowSidebar(true)
        console.log(props)
    }, [children])
    return (
        <>
            <Header />
            {showSidebar && <Sidebar />}
            <main className={styles.mainLayout}>
                {children}
            </main>
            <Footer />
        </>)
}

export default Layout