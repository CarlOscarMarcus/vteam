import { StyleSheet, Text, Button, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Link } from 'expo-router'
import Logo from '../../assets/img/scooter.jpg'
import { useState } from 'react'


// komponenter som fixar rätt style
import ThemedView from '../../components/ThemedView' // basic style
import ThemedLogo from '../../components/ThemedLogo' // logo style
import ThemedInput from '../../components/ThemedInput' // input style



const SkapaKonto = () => {

    // sparar variabler från formuläret.
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
            onPress={() => console.log(`Konto skapat åt ${Name} med e-post ${Email}`)}/>
        
            
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