import { StyleSheet, Text, TextInput, Button, Image } from 'react-native'
import { Link } from 'expo-router'
import Logo from '../assets/img/scooter.jpg'

import ThemedView from '../components/ThemedView'


const SkapaKonto = () => {
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    return (
        <ThemedView style={styles.container}>
            <Image source={Logo} style={styles.img} />

            <Text style={styles.title}>Hoci scooters</Text>
            

            <Text style={styles.title}>Skapa konto</Text>

            <TextInput
            style={styles.input}
            placeholder="Namn"
            onChangeText = {setName}
            />

            <TextInput
            style={styles.input}
            placeholder="E-post"
            onChangeText = {setEmail}

            />

            <TextInput 
            style={styles.input}
            secureTextEntry
            onChangeText = {setPassword}
            placeholder="Password" 
            textContentType='password'

            />

            <Button
            title="Skapa konto"
            onPress={() => console.log("Konto skapat!")}/>
        
            
            <Link style={styles.link} href="/login">Logga in</Link>
            <Link style={styles.link} href="/">Hem</Link>
        </ThemedView>
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