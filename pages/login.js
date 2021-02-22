import { useEffect, useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { createServer } from "miragejs"
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { motion } from 'framer-motion'
import { handleLogin } from '../utils/auth'
import styles from '../styles/Login.module.scss'
import lodash from 'lodash'
import Admin from './admin';

const CREDENTIALS = {
    admin: { email: 'admin', password: '123456', isAdmin: true },
    user: { email: 'user', password: '123456', isAdmin: false }
}

createServer({
    routes() {
        this.passthrough('/_next/static/development/_devPagesManifest.json');
        this.get("/api/user/admin", () => ({
            user: { id: 'admin', password: '123456', isAdmin: true },
        }))
        this.get("/api/user/user", () => ({
            user: { id: 'user', password: '123456', isAdmin: false },
        }))
    },
})

const FORM_FIELDS = {
    email: '',
    password: '',
}

const Login = () => {

    const [formFields, setFormFields] = useState(FORM_FIELDS)

    const formChangeHandler = (e) => {
        setFormFields({
            ...formFields,
            [e.target.name]: e.target.value,
        });
    }

    const formSubmitHandler = (e) => {
        e.preventDefault();
        console.log(formFields)

        if (lodash.isMatch(CREDENTIALS.admin, formFields)) {
            console.log('Logging in admin')
            handleLogin(CREDENTIALS.admin)
        }
        if (lodash.isMatch(CREDENTIALS.user, formFields)) {
            console.log('Logging in user')
            handleLogin(CREDENTIALS.user)
        }
    }

    return (
        <>
            <div className={styles.loginContainer}>
                <motion.div className={styles.col1} layoutId="title">
                    Welcome back,
                </motion.div>
                <form onSubmit={formSubmitHandler}>
                    <motion.div className={styles.col2} layoutId="fields">
                        <TextField
                            label="Email / Username"
                            type="text"
                            name="email"
                            variant="outlined"
                            value={formFields.email}
                            onChange={formChangeHandler}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            variant="outlined"
                            value={formFields.password}
                            onChange={formChangeHandler}
                        />
                        <Button variant="contained" color="primary" type="submit" disableElevation>
                            Login
                    </Button>
                    </motion.div>
                </form>
            </div>
        </>
    )
}

export default dynamic(() => Promise.resolve(Login), {
    ssr: false
})