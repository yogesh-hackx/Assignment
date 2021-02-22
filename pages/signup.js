import Link from 'next/link'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {motion } from 'framer-motion'
import styles from '../styles/Signup.module.scss'

const Signup = () => {
    return (
        <>
            <div className={`${styles.loginContainer} ${styles.reverse}`}>
                
                <motion.div className={styles.col2} layoutId="fields">
                    <TextField
                        label="Name"
                        type="text"
                        variant="outlined"
                    />
                    <TextField
                        label="Email / Username"
                        type="email"
                        variant="outlined"
                    />
                    <TextField
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        variant="outlined"
                    />
                    <Button variant="contained" color="primary" disableElevation>
                        Signup
                    </Button>
                </motion.div>
                <motion.div className={styles.col1} layoutId="title">
                    Sign up Now
                </motion.div>
            </div>
        </>
    )
}

export default Signup