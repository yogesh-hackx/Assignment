import { useEffect, useState } from 'react'
import Link from 'next/link'
import { createServer, Model } from "miragejs"
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { motion } from 'framer-motion'
import { handleLogin } from '../utils/auth'
import styles from '../styles/Login.module.scss'

createServer({
    models: {
        user: Model,
    },
    routes() {
        this.passthrough('/_next/static/development/_devPagesManifest.json');
        this.passthrough('/_next/static/development/_devPagesManifest.json');
        this.get("/api/users", (schema, request) => (schema.emails.all()))
        this.get("/api/users/:email", (schema, request) => {
            let email = request.params.email
            return schema.users.find(email)
        }, { timing: 0 })
    },
    seeds(server) {1
        // * Just for demo purpos
        // * On a real application password hashing and many other mechanisms would be needed
        server.create('user', { id: 'user', password: '123456', isAdmin: false })
        server.create('user', { id: 'admin', password: '123456', isAdmin: true })
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