import { StyleSheet, Text, Button, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Link } from 'expo-router'
import Logo from '../../assets/img/scooter.jpg'
import { useState } from 'react'
import { saveToken } from '../../components/Token'

// komponenter som fixar rätt style
import ThemedView from '../../components/ThemedView' // basic style
import ThemedLogo from '../../components/ThemedLogo' // logo style
import ThemedInput from '../../components/ThemedInput' // input style


const backendURL = "192.168.68.103"

async function loginData(email, password) {
    const result = await fetch(`http://${backendURL}:3000/api/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({email, password}),
    })

    const data = await result.json()

    if (result.ok) {
        console.log(data)
        console.log(`${email} is logged in`)
        return data.token
    } else {
        throw new Error(data.error)
    }

}

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const loginUser = async () => {
        try {
            const token = await loginData(email, password)
            await saveToken(token)
        } catch (err) {
            console.error(err)
        }
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={styles.container}>
            <ThemedLogo source={Logo} />

            <Text style={styles.title}>Hoci scooters</Text>
            

            <Text style={styles.title}>Logga in</Text>

            <ThemedInput
            placeholder="E-post"
            keyboardType="emailAddress"
            onChangeText = {setEmail}

            />
            <ThemedInput 
            secureTextEntry
            placeholder="Lösenord" 
            textContentType='password'
            onChangeText = {setPassword}

            />
            <Button
            title="Logga in"
            onPress={loginUser}/>

            <Link style={styles.link} href="/signup">Skapa konto</Link>
            {/* Ta bort "HEM" här sen!! */}
            <Link style={styles.link} href="/">Hem</Link>
            
        </ThemedView>
        </TouchableWithoutFeedback>
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
    }
})

        // <Button
        // title="Logga in"
        // onPress={() => console.log(`Användare ${Email} loggas in.`)}/>