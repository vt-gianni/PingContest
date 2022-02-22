import React, {useEffect, useState} from "react"
import {StyleSheet, Text, View, TextInput, Image, TouchableOpacity, Pressable, Platform} from 'react-native'
import CustomInput from "../component/CustomInput"
import {useFonts, Kreon_600SemiBold} from "@expo-google-fonts/kreon"
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon"
import {LinearGradient} from 'expo-linear-gradient'
import {IndexScreen} from "./IndexScreen";
import {SplashScreen} from "./SplashScreen";

const LoginScreen = () => {
    let [fontsLoaded] = useFonts({
        Kreon_600SemiBold
    });

    const [mailAddress, setMailAddress] = useState('')
    const [password, setPassword] = useState('')

    return (
        !fontsLoaded ? <SplashScreen/> :
            <LinearGradient colors={['#ffffff', '#D4E7F3']} start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                            style={{flex: 1, width: '100%'}}>
                <View style={styles.darken}>
                    <View style={styles.container}>
                        <View style={styles.logo}>
                            <Image source={require('../assets/logo.png')} style={styles.logoPicture}/>
                        </View>

                        <View style={styles.form}>
                            <View style={styles.inputsContainer}>
                                <CustomInput field={mailAddress} placeholder={"Adresse mail *"}
                                             setField={setMailAddress}
                                             secure={false}/>
                                <CustomInput field={password} placeholder={"Mot de passe *"} setField={setPassword}
                                             secure={true}/>
                            </View>

                            <TouchableOpacity onPress={() => {
                            }} style={styles.btnRed}>
                                <Text style={styles.btnText}>Connexion</Text>
                            </TouchableOpacity>

                            <View style={[styles.row, styles.w100]}>
                                <Text style={styles.noAccount}>Pas encore de compte ?</Text>
                                <Pressable style={styles.registerBtn}>
                                    <Text style={[styles.registerBtnText, styles.noAccount]}>S'inscrire</Text>
                                </Pressable>
                            </View>
                        </View>

                        <View style={styles.btnContainer}>
                            <TouchableOpacity onPress={() => {
                            }} style={styles.btnBlue}>
                                <Text style={styles.btnTextBlue}><MaterialCommunityIcon name="facebook" color="#2D6990"
                                                                                        size={22}/> Connexion avec
                                    Facebook</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        width: '100%',
        padding: 20
    },
    logo: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    logoPicture: {
        width: 250,
        height: 306.75,
        marginHorizontal: 10,
        marginVertical: 10
    },
    form: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputsContainer: {
        width: '100%'
    },
    input: {
        marginHorizontal: 20
    },
    btnContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
    },
    btnRed: {
        backgroundColor: '#E1673D',
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 10,
        width: '100%',
        marginTop: 10
    },
    btnBlue: {
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 10,
        width: '100%',
        borderColor: '#2D6990',
        borderWidth: 1,
    },
    btnText: {
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btnTextBlue: {
        color: '#2D6990',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
    },
    redText: {
        color: '#ff576b'
    },
    blueText: {
        color: '#2D6990'
    },
    row: {
        flexDirection: 'row'
    },
    w100: {
        width: '100%'
    },
    registerBtn: {
        marginStart: 5
    },
    registerBtnText: {
        color: '#2D6990'
    },
    noAccount: {
        fontSize: 16
    },
    darken: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        flex: 1,
    }
})

export default LoginScreen