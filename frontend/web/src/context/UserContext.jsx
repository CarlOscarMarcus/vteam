import { useContext, createContext, useState } from "react";

const AuthContext = createContext()

export function UserProvider({ children }) {
    const [token, setToken] = useState(sessionStorage.getItem("token"))

    function LogOut() {
        sessionStorage.removeItem("token")
        setToken(null)
    }

    function LogIn(token2) {
        sessionStorage.setItem("token", token2)
        setToken(token2)
    }

    const value = {
        token,
        loggedIn: !!token,
        LogOut,
        LogIn,
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}