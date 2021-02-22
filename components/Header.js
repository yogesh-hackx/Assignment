import { useEffect, useState } from 'react'
import Link from 'next/link'
import styles from '../styles/Header.module.scss'
import { Popover } from 'antd'
import {BiCaretDown} from 'react-icons/bi'
import {handleLogout} from '../utils/auth'

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userData'))
        if (user) {
            setIsLoggedIn(true)
            user.isAdmin && setIsAdmin(true)
        } else {
            setIsLoggedIn(false)
            setIsAdmin(false)
        }

    })

    const handleVisibleChange = (visible) => setShowMenu(visible)
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
                            <Popover
                            content={<a onClick={handleLogout}>Logout</a>}
                                trigger="click"
                                visible={showMenu}
                                onVisibleChange={handleVisibleChange}
                            >
                                <div className={styles.loggedInContainer}>
                                    <div className={styles.userImageContainer}>
                                        <img src="https://i.pravatar.cc/100" style={{ objectFit: 'cover', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} alt="" />
                                    </div>
                                    <div className={styles.userName}>
                                        {isAdmin ? 'Admin' : 'John'}
                                    </div>
                                    <BiCaretDown/>
                                </div>
                            </Popover>
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