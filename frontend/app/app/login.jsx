import { StyleSheet, Text, Button, Image, TextInput } from 'react-native'
import { Link } from 'expo-router'
import Logo from '../assets/img/scooter.jpg'
import { useState } from 'react'

import ThemedView from '../components/ThemedView'


const Login = () => {
    const [Username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <ThemedView style={styles.container}>
            <Image source={Logo} style={styles.img} />

            <Text style={styles.title}>Hoci scooters</Text>
            

            <Text style={styles.title}>Logga in</Text>
            <TextInput
            style={styles.input}
            placeholder="Username"
            textContentType="username"
            onChangeText = {setUsername}

            />
            <TextInput 
            style={styles.input}
            secureTextEntry
            placeholder="Password" 
            textContentType='password'
            onChangeText = {setPassword}

            />
            <Button
            title="Logga in"
            onPress={() => console.log(`Användare ${Username} loggas in.`)}/>

            <Link style={styles.link} href="/signup">Skapa konto</Link>
            <Link style={styles.link} href="/">Hem</Link>
            
        </ThemedView>
    )
}
export default Login
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
    },
    img: {
        marginVertical: 20,
        width: 130,
        height: 130
    },
    input: {
        borderWidth: 1,
        height: 40,
        width: 200,
        margin: 12,
        padding: 10
    }
})