import { StyleSheet, Text } from 'react-native'
import { Link, router } from 'expo-router'
import Logo from '../../assets/img/scooter.jpg'
import { getToken } from '../../components/Token.jsx'
import { useEffect, useState } from 'react'

// komponenter som fixar rätt style
import ThemedView from '../../components/ThemedView' // basic style
import ThemedLogo from '../../components/ThemedLogo' // logo style
import Spacer from '../../components/Spacer' // space

const backendURL = "192.168.68.103"

export default function User() {
    const [user, setUser] = useState(null)
    // kollar om användaren är inloggad, om inte redirect till inloggning.
    useEffect (() => {
        async function checkToken() {
            const token = await getToken()
            if (!token) {
                router.replace("/login")
            } else {
                
                const res = await fetch(`http://${backendURL}:3000/api/auth/me`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                })

                if (!res.ok) throw new Error('Kunde inte hämta användaren.')
                const data = await res.json()
                setUser(data)
            }
        }
        checkToken()
    }, [])
    // hämta namn och epost om användare
    

    return (
        <ThemedView style={styles.container}>
            <ThemedLogo source={Logo} />

            <Text style={styles.title}>Hoci scooters</Text>
            <Spacer />
            <Text>Användare:</Text> 
            <Text>{user.name}</Text>
            <Spacer />

            <Text>E-post:</Text>
            <Text>{user.email}</Text>
            <Spacer />
            <Text>Saldo</Text>

            <Spacer />
            <Text>Resor</Text>

            <Spacer />


            {/* ta bort sen, user kan vara "förstasida" som inloggad? */}
            <Link style={styles.link} href="/">Hem</Link> 
            
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        margin: 10
    },
    link: {
        fontWeight: 'bold',
    }
})