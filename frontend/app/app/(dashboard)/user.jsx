import { StyleSheet, Text } from 'react-native'
import { Link, router } from 'expo-router'
import Logo from '../../assets/img/scooter.jpg'
import { fetchCurrentUser } from './userBackend'
import { useEffect, useState } from 'react'

// komponenter som fixar rätt style
import ThemedView from '../../components/ThemedView' // basic style
import ThemedLogo from '../../components/ThemedLogo' // logo style
import Spacer from '../../components/Spacer' // space

// Cornelias dator
const backendURL = "192.168.32.7"

// min dator
//const backendURL = "192.168.68.107"


export default function User() {
    const [user, setUser] = useState(null)
    // kollar om användaren är inloggad, om inte redirect till inloggning.
        useEffect(() => {
        async function loadUser() {
            try {
            const data = await fetchCurrentUser();
            setUser(data);
            } catch (err) {
            router.replace("/login");
            }
        }

        loadUser();
        }, []);
    // hämta namn och epost om användare
    if (!user) {
    return (
        <ThemedView style={styles.container}>
        <Text>Laddar användare...</Text>
        </ThemedView>
    );
    }

    return (
        <ThemedView style={styles.container}>
            <ThemedLogo source={Logo} />

            <Text style={styles.title}>Hoci scooters</Text>
            <Spacer />
            <Text>🛴 Användare:</Text> 
            <Text>{user.name}</Text>
            <Spacer />

            <Text>🛴 E-post:</Text>
            <Text>{user.email}</Text>
            <Spacer />

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