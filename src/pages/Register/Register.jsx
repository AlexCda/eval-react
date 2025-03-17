import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import InputForm from "../../components/InputForm/InputForm"
import { AuthService } from "../../services/auth"
import classes from '../Login/Login.module.css'

const Register = () => {
    const [formData, setFormData] = useState({nickname: '', email: '', password: ''})
    const navigate = useNavigate()
    const handleChange = (field) => (value) => {
        setFormData({ ...formData, [field]: value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const authService = new AuthService()
        await authService.register(formData.nickname, formData.email, formData.password)
        navigate('/login')
    }
    return (
        <div className={classes['auth-form']}>
            <h1>Inscription</h1>
            <form onSubmit={handleSubmit}>
                <InputForm 
                    label="Pseudo"
                    id="nickname"
                    type="nickname"
                    required
                    value={formData.nickname}
                    onChange={handleChange('nickname')}
                />
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
export default Register