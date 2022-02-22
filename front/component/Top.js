import {StyleSheet, View} from "react-native";
import {Image, Text} from "react-native";

export const Top = () => {
    return (
        <View style={styles.top}>
            {/*<Image source={require('../assets/welcome.png')} style={styles.logo}/>*/}
            <View style={styles.row}>
                <Text style={styles.title}>Ping </Text>
                <Text style={styles.title2}>Contest</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    top: {
        height: 70,
        backgroundColor: 'white',
        marginBottom: 15,
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        height: 50,
        width: 50
    },
    row: {
        flexDirection: 'row'
    },
    title: {
        color: '#E1673D',
        fontFamily: 'Kreon_600SemiBold',
        fontSize: 30
    },
    title2: {
        color: '#2D6990',
        fontFamily: 'Kreon_600SemiBold',
        fontSize: 30
    }
})