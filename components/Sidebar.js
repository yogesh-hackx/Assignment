import { useEffect } from 'react'
import Head from 'next/head';
import Link from 'next/link'
import { useRouter } from 'next/router';
import { GrMoney } from 'react-icons/gr'
import { IoMdLogIn, IoMdStats } from 'react-icons/io'
import styles from '../styles/Sidebar.module.scss';

export default function Sidebar() {

    return (
        <div className={styles.sideBarContainer}>
            <div className={styles.buttonContainer}>
                <Link href="/admin/daily_sales_report">
                    <div className={styles.button}>
                        <IoMdStats />
                        <div className={styles.buttonText}>Daily Sales Report</div>
                    </div>
                </Link>
                <Link href="/admin/daily_login_report">
                    <div className={styles.button}>
                        <IoMdLogIn />
                        <div className={styles.buttonText}>Daily Login Report</div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
