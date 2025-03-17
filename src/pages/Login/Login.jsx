import { useContext, useState } from "react"
import { useNavigate } from 'react-router-dom'
import InputForm from "../../components/InputForm/InputForm"
import { AuthContext } from "../../context/AuthContext"
import classes from './Login.module.css'

const Login = () => {
    const [formData, setFormData] = useState({email: '', password: ''})
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)

    const handleChange = (field) => (value) => {
        setFormData({ ...formData, [field]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(formData.email, formData.password)
        navigate('/movies')
    }
    return (
        <div className={classes['auth-form']}>
            <h1>Connexion</h1>
            <form onSubmit={handleSubmit}>
                <InputForm 
                    label="Email"
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange('email')}
                />
                <InputForm 
                    label="Mod de passe"
                    id="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange('password')}
                />
                <button type="submit">Se connecter</button>
            </form>
        </div>
    )
}
export default Login