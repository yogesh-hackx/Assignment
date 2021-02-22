import App from 'next/app'
import Router from 'next/router';
import { parseCookies } from 'nookies'
import { CookiesProvider } from "react-cookie"
import { AnimateSharedLayout } from "framer-motion"
import Layout from '../components/Layout'
import '../styles/globals.css'
import 'antd/dist/antd.css';


function MyApp({ Component, pageProps }) {
    return (
        <CookiesProvider>
            <Layout>
                <AnimateSharedLayout>
                    <Component {...pageProps} />
                </AnimateSharedLayout>
            </Layout>
        </CookiesProvider>
    )
}

MyApp.getInitialProps = async (ctx) => {
    const { userData } = parseCookies(ctx.ctx)
    let isAdmin = false
    if (userData)
        isAdmin = JSON.parse(userData).isAdmin

    if (isAdmin && ctx.ctx.pathname === '/' && ctx.ctx.req) {
        ctx.ctx.res.writeHead(302, { Location: '/admin' });
        ctx.ctx.res.end();
    } if (!isAdmin && ctx.ctx.pathname === '/admin' && ctx.ctx.req) {
        ctx.ctx.res.writeHead(302, { Location: '/login' });
        ctx.ctx.res.end();
    }
    const appProps = await App.getInitialProps(ctx)

    return { ...appProps }

}

export default MyApp
