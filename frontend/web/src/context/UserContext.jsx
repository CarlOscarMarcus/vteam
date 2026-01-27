import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { useContext, createContext, useState, useEffect } from "react";

const AuthContext = createContext()



export function UserProvider({ children }) {
    const API_URL = import.meta.env.VITE_API_URL;
    const [token, setToken] = useState(sessionStorage.getItem("token"))
    const [loadingUser, setLoadingUser] = useState(true)
    const [user, setUser] = useState(null)

    function LogOut() {
        sessionStorage.removeItem("token")
        setToken(null)
    }

    function LogIn(token2) {
        sessionStorage.setItem("token", token2)
        setToken(token2)
        setLoadingUser(true)
    }


    useEffect (() => {
        if (!token) {
            setLoadingUser(false)
            return
        }


        async function getUser () {
            try{
                const res = await fetch(`${API_URL}/api/auth/me`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })

                if (!res.ok) throw new Error('Kunde inte hämta användaren.')
                const data = await res.json()
                console.log(data)
                setUser(data)
                } catch (err) {
                    console.error(err)
                } finally {
                    setLoadingUser(false)
                }
        }
        getUser()
    }, [token])

    const value = {
    token,
    loggedIn: !!token,
    LogOut,
    LogIn,
    user,
    loadingUser,
    isAdmin: user?.email?.includes("@admin.com")
    }


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export function useAuth() {
    return useContext(AuthContext)
}
