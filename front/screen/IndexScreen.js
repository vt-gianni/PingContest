import React, {useContext, useEffect, useState} from "react"
import {LinearGradient} from "expo-linear-gradient"
import {View, Text, StyleSheet, Image, Pressable, Dimensions} from "react-native"
import FadeInOut from 'react-native-fade-in-out'
import {useFonts, Kreon_600SemiBold} from "@expo-google-fonts/kreon"
import {SplashScreen} from "./SplashScreen";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";
import authContext from "../context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const IndexScreen = ({navigation}) => {
    let [fontsLoaded] = useFonts({
        Kreon_600SemiBold
    });

    const [visible, setVisible] = useState(false)
    const [textVisible, setTextVisible] = useState(false)
    const [pressed, setPressed] = useState(false)
    const [firstTime, setFirstTime] = useState(false)

    useEffect(() => {
        checkFirstTime().then(() => {
            saveFirstTime().then()
        })
    }, [])

    useEffect(() => {
        if (fontsLoaded && firstTime) {
            setTimeout(() => {
                toggleVisible()
            }, 500)
            setTimeout(() => {
                toggleTextVisible()
            }, 1000)
        }
        else if (fontsLoaded && !firstTime) {
            navigation.navigate('Main')
        }
    }, [fontsLoaded, firstTime])

    const saveFirstTime = async () => {
        await AsyncStorage.setItem('firstTime', 'true')
    }

    const checkFirstTime = async () => {
        const ft = await AsyncStorage.getItem('firstTime')
        if (ft === null) {
            setFirstTime(true)
        }
    }

    const toggleVisible = () => {
        setVisible(!visible)
    }

    const toggleTextVisible = () => {
        setTextVisible(!textVisible)
    }

    const dimensions = Dimensions.get('window')
    const imageSize = Math.round(dimensions.width * 4 / 5)

    return (
        !fontsLoaded ? <SplashScreen/> :
            <LinearGradient colors={['#ffffff', '#D4E7F3']} start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                            style={{flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <View style={styles.logoBlock}>
                    <FadeInOut scale={true} visible={visible} duration={1500}>
                        <Image source={require('../assets/welcome.png')} style={{height: imageSize, width: imageSize}}/>
                    </FadeInOut>
                </View>
                <View style={styles.bottomBlock}>
                    <View>
                        <FadeInOut scale={true} visible={textVisible} duration={1500}>
                            <View style={styles.row}>
                                <Text style={styles.title}>PING </Text>
                                <Text style={styles.title2}>CONTEST</Text>
                            </View>
                            <Text style={[styles.description, {marginTop: 20}]}>
                                Ping Contest est une application de création et gestion de tournois.
                            </Text>
                            <Text style={styles.description}>
                                Finis les retraits et paiements sur place, inscrivez-vous sur l'application et payez
                                directement par carte bancaire.
                            </Text>
                        </FadeInOut>
                    </View>
                    <View style={{width: '100%'}}>
                        <FadeInOut scale={true} visible={textVisible} duration={1500}>
                            <Pressable style={pressed ? styles.pressablePressed : styles.pressable} onPressIn={() => {
                                setPressed(true)
                            }} onPressOut={() => {
                                setPressed(false)
                            }} onPress={() => {
                                navigation.navigate('Main')
                            }}>
                                <Text style={styles.pressableText}>
                                    Commencer maintenant
                                </Text>
                                <View style={styles.nextBtn}>
                                    <Text>
                                        <MaterialCommunityIcon name="arrow-right" color="#ffffff" size={20}
                                                               direction={'rtl'}/>
                                    </Text>
                                </View>
                            </Pressable>
                        </FadeInOut>
                    </View>
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
        fontSize: 32,
        color: '#E1673D',
        textAlign: 'center',
        fontFamily: 'Kreon_600SemiBold',
    },
    title2: {
        fontSize: 32,
        color: '#2D6990',
        textAlign: 'center',
        fontFamily: 'Kreon_600SemiBold',
    },
    description: {
        fontSize: 18,
        color: 'rgba(0, 0, 0, 0.5)'
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
    pressablePressed: {
        backgroundColor: 'rgba(255,255,255,0.5)',
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
        color: '#2D6990'
    },
    nextBtn: {
        backgroundColor: '#2D6990',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'center'
    }
})