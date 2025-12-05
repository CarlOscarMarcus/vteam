import { StyleSheet, Image } from 'react-native'

const ThemedLogo = ({ style, ...props }) => {
    // för att få rätt style till logo

    return (
        <Image 
        style={[ styles.img, style]}{...props}

        />
    )
}
export default ThemedLogo

const styles = StyleSheet.create({
    img: {
        marginVertical: 20,
        width: 130,
        height: 130
    }
})