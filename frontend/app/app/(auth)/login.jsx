import { StyleSheet, Text, Button } from 'react-native'
import { Link } from 'expo-router'
import Logo from '../../assets/img/scooter.jpg'
import { useState } from 'react'

// komponenter som fixar rätt style
import ThemedView from '../../components/ThemedView' // basic style
import ThemedLogo from '../../components/ThemedLogo' // logo style
import ThemedInput from '../../components/ThemedInput' // input style



const Login = () => {
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <ThemedView style={styles.container}>
            <ThemedLogo source={Logo} />

            <Text style={styles.title}>Hoci scooters</Text>
            

            <Text style={styles.title}>Logga in</Text>

            <ThemedInput
            placeholder="E-post"
            textContentType="Email"
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
            onPress={() => console.log(`Användare ${Email} loggas in.`)}/>

            <Link style={styles.link} href="/signup">Skapa konto</Link>
            {/* Ta bort "HEM" här sen!! */}
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
    }
})