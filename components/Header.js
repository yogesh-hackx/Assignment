import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Header.module.scss'

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userData'))
        if (user) {
            setIsLoggedIn(true)
            user.isAdmin && setIsAdmin(true)
        }

    })
    return (
        <>
            <nav className={styles.navContainer}>
                <div className={styles.container}>
                    <Link href="/">
                        <div className={styles.logo}>
                            PhoneStore
                    </div>
                    </Link>
                    {
                        isLoggedIn ? (
                            <div className={styles.loggedInContainer}>
                                <div className={styles.userImageContainer}>
                                    <img src="https://i.pravatar.cc/100" style={{objectFit: 'cover', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} alt="" />
                                </div>
                                <div className={styles.userName}>
                                    {isAdmin ? 'Admin' : 'John'}
                                </div>
                            </div>
                        ) : (
                                <div className={styles.rightNav}>
                                    <Link href="/signup">Signup</Link>
                                    <Link href="/login">Login</Link>
                                </div>
                            )
                    }
                </div>
            </nav>
        </>
    )
}

export default Header