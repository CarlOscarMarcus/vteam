import { StyleSheet, TextInput } from 'react-native'

const ThemedInput = ({ style, ...props }) => {
    // för att få rätt style till input-fält

    return (
        <TextInput 
        style={[ styles.input, style]}{...props}
        />
    )
}
export default ThemedInput

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        height: 40,
        width: 200,
        margin: 12,
        padding: 10
    }
})