import { useEffect } from 'react'
import Head from 'next/head';
import { useRouter } from 'next/router';
import styles from '../../styles/Admin.module.scss';

export default function Admin() {
    const router = useRouter()
    useEffect(() => {
        router.push('/admin/daily_sales_report')
    })

    return (
        <>

        </>
    );
}
