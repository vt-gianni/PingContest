import React, {useState} from "react";
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import {TouchableOpacity} from "react-native-web";
import CustomInput from "../component/CustomInput";

const HomeScreen = () => {
    const [mailAddress, setMailAddress] = useState('')
    const [password, setPassword] = useState('')

    return (
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image source={require('../assets/logo.png')} style={styles.logoPicture} />
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
    },
    logoPicture: {
        width: 110,
        height: 110
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
        justifyContent: 'space-evenly'
    },
    btnRed: {
        backgroundColor: '#ff576b',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    btnBlue: {
        backgroundColor: '#00908f',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    btnText: {
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center'
    }
})

export default HomeScreen