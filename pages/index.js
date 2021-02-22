import {useEffect, useState} from 'react'
import Router from 'next/router'
import Head from 'next/head';
import Products from '../components/Products';
import styles from '../styles/Home.module.css';

export default function Home() {
    useEffect(() => {
        const isAdmin = JSON.parse(localStorage.getItem('userData'))?.isAdmin
        if (isAdmin)
            Router.push('/admin')
    }, [])
    return (
        <>
            <Products />
        </>
    );
}
