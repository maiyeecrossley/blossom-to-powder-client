import { useState, useContext } from "react"
import { getUserFromToken } from "../../utils/auth"
import { setToken } from "../../utils/auth.js"
import { UserContext } from "../../contexts/UserContext.jsx"
import { login } from "../../services/userService"
import { useNavigate } from "react-router"

import styles from "../Login/Login.module.css"

export default function Login() {

const { setUser } = useContext(UserContext)

const [formData, setFormData] = useState({
    email: "",
    password: ""
})

const [errors, setErrors] = useState("")

const navigate = useNavigate()


const handleSubmit = async (event) => {
    event.preventDefault()

    try {
        const data = await login(formData)
        setToken(data.token)

        setUser(getUserFromToken())

        navigate("/")

    } catch (error) {
        setErrors(error.reponse.data.message) 
    }
}

const handleChange = (event) => {
    setErrors({ ...errors, [e.target.name]: '' })
    setFormData({ ...formData, [event.target.name]: event.target.value })
}

    return (
        <section className={styles.container}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit} >

                <div className={styles.loginForm}>
                    <label htmlFor="email">Email</label>
                    <input 
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Please enter your email"
                    onChange={handleChange}
                    />
                </div>

                <div className={styles.loginForm}>
                    <label htmlFor="password">Password</label>
                    <input 
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter password"
                    onChange={handleChange}
                    />
                </div>

                <button type="submit" className={styles.button}>Login</button>
            </form>
        </section>
    )
}