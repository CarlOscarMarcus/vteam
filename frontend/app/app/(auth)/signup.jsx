import { StyleSheet, Text, Button, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Link, router } from 'expo-router'
import Logo from '../../assets/img/scooter.jpg'
import { useState } from 'react'


// komponenter som fixar rätt style
import ThemedView from '../../components/ThemedView' // basic style
import ThemedLogo from '../../components/ThemedLogo' // logo style
import ThemedInput from '../../components/ThemedInput' // input style

// min dator, hemma
// const backendURL = "192.168.32.7"

// min dator, hos mamma och pappa
const backendURL = "192.168.1.103"

async function SignupBackend(name, email, password) {
      const result = await fetch(`http://${backendURL}:3000/api/auth/signup`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, email, password}),
    })

    // const data = await result.json()

    if (result.ok) {
        // console.log(`${data} = data`)
        console.log(`${email} har skapat ett nytt konto`)
        
    } else {
        throw new Error(data.error)
    }
}


const SkapaKonto = () => {

    // sparar variabler från formuläret.
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const SignupUser = async () => {
    try {
        await SignupBackend(Name, Email, password)
        // sessionStorage.setItem("token", token);
        // SignUp(token) // behövs detta?
        console.log(`${Email} skapade ett konto.`)
        router.replace("/login")
    } catch (err) {
        console.error(err)
    }
}
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ThemedView style={styles.container}>
            <ThemedLogo source={Logo} />

            <Text style={styles.title}>Hoci scooters</Text>
            
            <Text style={styles.title}>Skapa konto</Text>

            <ThemedInput
            placeholder="Namn"
            onChangeText = {setName}
            />

            <ThemedInput
            placeholder="E-post"
            onChangeText = {setEmail}
            keyboardType="email-address"
            />

            <ThemedInput 
            secureTextEntry
            onChangeText = {setPassword}
            placeholder="Lösenord" 
            textContentType='password'
            />

            <Button
            title="Skapa konto"
            onPress={SignupUser}/>
        
            
            <Link style={styles.link} href="/login">Logga in</Link>

        </ThemedView>
        </TouchableWithoutFeedback>
    )
}


export default SkapaKonto
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        margin: 10
    },
    link: {
        fontWeight: 'bold',
    }
})