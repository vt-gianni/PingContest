import React, {useEffect, useState} from "react"
import LottieView from "lottie-react-native"
import {LinearGradient} from "expo-linear-gradient"
import {StyleSheet} from "react-native"

export const SplashScreen = () => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        toggleVisible()
    }, [])

    const toggleVisible = () => {
        setVisible(!visible)
    }

    return (
        <LinearGradient colors={['#ffffff', '#CDF6F6']} start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                        style={styles.gradientBlock}>
            <LottieView source={require('../assets/splash.json')} autoPlay={true} loop={true} style={{ width: '70%' }} />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    gradientBlock: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})