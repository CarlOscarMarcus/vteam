import { View } from 'react-native'
import { Colors } from '../style/colors'

const ThemedView = ({ style, ...props }) => {
    // om man vill göra ljust/mörkt tema kolla upp useColorScheme
    const theme = Colors

    return (
        <View 
        style={[{ backgroundColor: theme.background
        }, style]}{...props}

        />
    )
}
export default ThemedView
