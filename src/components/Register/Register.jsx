import { useState, useContext } from "react"
import { useNavigate } from "react-router"
import { register } from "../../services/userService"
import { setToken } from "../../utils/auth"
import { getUserFromToken } from "../../utils/auth"
import { UserContext } from "../../contexts/UserContext"

import styles from "../Register/Register.module.css"

export default function Register() {

    const { setUser } = useContext(UserContext)

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    })
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault()
        console.log("sending data", formData)
        try {
            const data = await register(formData)
            setToken(data.token)

            setUser(getUserFromToken())

            navigate("/")
        } catch (error) {
            console.log("registration error", error.response)
            setErrors(error.response.data.errors)
        }
    }

    const handleChange = async (event) => {
        setErrors({ ...errors, [event.target.name]: " " })
        setFormData({ ...formData, [event.target.name]: event.target.value})
    }

    return (
        <section className={styles.container}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>

                <div className="registerForm">
                    <label htmlFor="username">Username</label>
                    <input 
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Enter a username"
                    required
                    onChange={handleChange}
                    />
                    { errors.username && <p className="error-message">{errors.username}</p> }
                </div>

                <div className="registerForm">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email"
                        name="email" 
                        id="email"
                        placeholder="Enter an email address"
                        required
                        onChange={handleChange}
                    />
                    { errors.email && <p className='error-message'>{errors.email}</p> }
                </div>

                <div className="registerForm">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password"
                        name="password" 
                        id="password"
                        placeholder="Enter a password"
                        required
                        onChange={handleChange}
                    />
                    { errors.password && <p className='error-message'>{errors.password}</p> }
                    </div>

                    <button disabled={formData.password === ""} 
                    type="submit" className="button">Submit</button>                
            </form>
            
        </section>
    )

}