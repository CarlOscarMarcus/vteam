import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export function Authentication({children}) {
    const navigate = useNavigate()
    const token = sessionStorage.getItem("token")

    useEffect(() => {
        if (!token) navigate("/login")
    }, [token, navigate])

    return token ? children : null
}