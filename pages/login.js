import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createServer, Model } from "miragejs"
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { motion } from 'framer-motion'
import { handleLogin } from '../utils/auth'
import styles from '../styles/Login.module.scss'
import Admin from './admin';

createServer({
    routes() {
        this.namespace = '/api/users/';
        this.get("/user", (schema, request) => {
            return { user: { id: 'user', password: '123456', isAdmin: false } }
        }, { timing: 0 })
        this.get("/admin", (schema, request) => {
            return { user: { id: 'admin', password: '123456', isAdmin: true } }
        }, { timing: 0 })
    }
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
        try {
            if (formFields.email)
                axios.get(`/api/users/${formFields.email}`).then(res => {
                    console.log(res.data)

                    if (res.data?.user?.password === formFields.password)
                        handleLogin(res.data.user)
                    else
                        console.log("Login Failed!")
                })
        } catch (error) {
            console.log("Login Failed!")
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

export default Login