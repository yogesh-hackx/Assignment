import { useEffect, useState } from 'react'
import Head from 'next/head';
import { useRouter } from 'next/router';
import { createServer } from "miragejs"
import axios from 'axios'
import { Table } from 'antd';
import styles from '../../styles/Admin.module.scss';
import DAILY_SALES from '../../API/dailySales.json'


createServer({
    routes() {
        this.passthrough('/_next/static/development/_devPagesManifest.json');
        this.get("/api/daily_sales", () => ({dailySales: DAILY_SALES}))
    }
})

export default function DailySalesReport() {
    const [dailySales, setDailySales] = useState([])

    const TABLE_COLUMNS = [
        {
            title: 'Sr.No.',
            dataIndex: 'id',
            key: 'id',
          },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
            width: 150,
          },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'id',
            width: 150,
          },
        {
            title: 'Item Code',
            dataIndex: 'itemCode',
            key: 'itemCode',
            width: 150,
          },
        {
            title: 'Sales',
            dataIndex: 'sales',
            key: 'sales',
            width: 150,
          },
    ]

    useEffect(() => {
        axios.get('/api/daily_sales').then((res) => setDailySales(res.data.dailySales))
    }, [])
    

    return (
        <div className={styles.dailySalesContainer}>
            <Table
                dataSource={dailySales}
                columns={TABLE_COLUMNS}
                bordered
             />

        </div>
    );
}
