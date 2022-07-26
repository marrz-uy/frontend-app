import { useState, useEffect } from "react"
import { Layout } from "../Layout"
import AuthUser from '../Components/AuthUser'
import '../Css/UserProfile.css'
import { Link } from "react-router-dom"

const UserProfile = ({ setPage }) => {
    const [lenguage, setLenguage] = useState('')
    const [logeado, setLogeado] = useState(false)

    const { getToken, getUser } = AuthUser

    if (getToken) {
        setLogeado(true)
    }

    useEffect(() => {
        setPage('user')
    }, [setPage])

    useEffect(() => {
        window.localStorage.setItem('lenguage', 'Spanish')
        setLenguage(localStorage.getItem('lenguage'))
    }, [])

    const handleLenguage = () => {
        if (lenguage == 'Spanish') {
            localStorage.setItem('lenguage', 'English')
        } else {
            localStorage.setItem('lenguage', 'Spanish')
        }
        setLenguage(localStorage.getItem('lenguage'))
    }

    return (
        <Layout>
            <div className="user-profile">
                <div className="user-profile__container">
                    <div className="user-profile__description">
                        <h1>{getUser?.nombre}Ignacio</h1>
                        <div className="user-profile__data">
                            <h2>{getUser?.email}mateunacho6@gmail.com</h2>
                            <a href="#" className="user-profile__logout">Cambiar contraseña</a>
                        </div>
                    </div>
                    <div className="user-profile__links">
                        <div className="user-profile__container-item user-profile__container-item--preferences">
                            <button className="user-profile__item">
                                <Link to='/'>
                                    Preferencias
                                </Link>
                            </button>
                            <img src="https://img.icons8.com/external-creatype-filed-outline-colourcreatype/64/000000/external-preferences-tools-design-creatype-filed-outline-colourcreatype.png" />                    </div>
                        <div className="user-profile__container-item" onClick={handleLenguage}>
                            <button className="user-profile__item">
                                Cambiar idioma
                            </button>
                            {lenguage == 'Spanish' ? <img src="https://img.icons8.com/officel/80/000000/uruguay.png" />
                                : <img src="https://img.icons8.com/plasticine/100/000000/great-britain.png" />}
                        </div>
                    </div>
                    <button className="user-profile__logout">
                        Logout
                    </button>
                </div>
            </div>
        </Layout>
    )
}

export default UserProfile