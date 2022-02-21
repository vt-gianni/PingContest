import React, {useState} from "react"
import { StyleSheet, Text, View, TextInput, Image, TouchableOpacity } from 'react-native'
import CustomInput from "../component/CustomInput"
import {useFonts, Kreon_600SemiBold} from "@expo-google-fonts/kreon"

const HomeScreen = () => {
    let [fontsLoaded] = useFonts({
        Kreon_600SemiBold
    });

    const [mailAddress, setMailAddress] = useState('')
    const [password, setPassword] = useState('')

    return (
        !fontsLoaded ? <View/> :
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image source={require('../assets/logo2.png')} style={styles.logoPicture} />
            </View>

            <View style={styles.form}>
                <View style={ styles.inputsContainer }>
                    <CustomInput field={mailAddress} placeholder={"Adresse mail *"} setField={setMailAddress} secure={false} />
                    <CustomInput field={password} placeholder={"Mot de passe *"} setField={setPassword} secure={true} />
                </View>
            </View>

            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={() => {}} style={styles.btnRed}>
                    <Text style={styles.btnText}>Connexion</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {}} style={styles.btnBlue}>
                    <Text style={styles.btnText}>Connexion avec Facebook</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        width: '100%'
    },
    logo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    logoPicture: {
        width: 200,
        height: 200,
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
        justifyContent: 'center'
    },
    btnRed: {
        backgroundColor: '#ff576b',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 10
    },
    btnBlue: {
        backgroundColor: '#00908f',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 10
    },
    btnText: {
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    redText: {
        color: '#ff576b'
    },
    blueText: {
        color: '#00908f'
    },
    row: {
        flexDirection: 'row'
    }
})

export default HomeScreen