import { View } from 'react-native'
import { Colors } from '../style/colors'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'

const ThemedView = ({ style, safe = false, ...props }) => {
    // om man vill göra ljust/mörkt tema kolla upp useColorScheme
    const theme = Colors

    if (!safe) return (
        <View 
        style={[{ backgroundColor: theme.background
        }, style]}{...props}

        />
    )

    const insets = useSafeAreaInsets()

    return (
        <SafeAreaView 
        style={[{ backgroundColor: theme.background,
            paddingTop: insets.top - 20,
            paddingBottom: insets.bottom - 70,
        }, style]}{...props} />
    )
}
export default ThemedView
