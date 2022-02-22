import React, {useEffect, useState} from "react"
import {LinearGradient} from "expo-linear-gradient"
import {View, Text, StyleSheet, Image, Pressable, Dimensions} from "react-native"
import FadeInOut from 'react-native-fade-in-out'
import {useFonts, Kreon_600SemiBold} from "@expo-google-fonts/kreon"
import {SplashScreen} from "./SplashScreen";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";

export const IndexScreen = () => {
    let [fontsLoaded] = useFonts({
        Kreon_600SemiBold
    });

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        toggleVisible()
    }, [])

    const toggleVisible = () => {
        setVisible(!visible)
    }

    const dimensions = Dimensions.get('window')
    const imageSize = Math.round(dimensions.width * 4 / 5)

    return (
        !fontsLoaded ? <SplashScreen/> :
            <LinearGradient colors={['#ffffff', '#FFAC90']} start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                            style={{flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <View style={styles.logoBlock}>
                        <Image source={require('../assets/welcome3.png')} style={{ height: imageSize, width: imageSize }}/>
                </View>
                <View style={styles.bottomBlock}>
                    <View>
                        <View style={styles.row}>
                            <Text style={styles.title}>PING </Text>
                            <Text style={styles.title2}>CONTEST</Text>
                        </View>
                        <Text style={styles.description}>
                            Ping Contest est une application de création et gestion de tournois. Fini les retraits et paiements sur place, inscrivez-vous sur l'application et payez directement par carte.
                        </Text>
                    </View>
                    <Pressable style={styles.pressable}>
                        <Text style={styles.pressableText}>
                            Commencer maintenant
                        </Text>
                        <View style={styles.nextBtn}>
                            <Text><MaterialCommunityIcon name="arrow-right" color="#ffffff"
                                                                                    size={20}/></Text>
                        </View>
                    </Pressable>
                </View>
            </LinearGradient>
    )
}

const styles = StyleSheet.create({
    logoPicture: {
        backgroundColor: 'blue'
    },
    logoBlock: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomBlock: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        width: '100%',
        paddingTop: 30,
        paddingBottom: 60
    },
    title: {
        fontSize: 30,
        color: '#E1673D',
        textAlign: 'center',
        fontFamily: 'Kreon_600SemiBold',
    },
    title2: {
        fontSize: 30,
        color: '#ffffff',
        textAlign: 'center',
        fontFamily: 'Kreon_600SemiBold',
    },
    description: {
        marginTop: 20,
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.7)'
    },
    pressable: {
        backgroundColor: 'white',
        width: '100%',
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    pressableText: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    nextBtn: {
        backgroundColor: '#E1673D',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
})