import React, {useContext, useEffect, useState} from "react"
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Image,
    TouchableOpacity,
    Pressable,
    Platform,
} from 'react-native'
import CustomInput from "../component/CustomInput"
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon"
import {LinearGradient} from 'expo-linear-gradient'
import {SecurityService} from "../service/SecurityService"
import AsyncStorage from '@react-native-async-storage/async-storage';
import authContext from "../context/AuthContext";
import jwtDecode from "jwt-decode";
import LottieView from "lottie-react-native";

const LoginScreen = ({navigation}) => {
    const [mailAddress, setMailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [security, setSecurity] = useState(null)
    const [error, setError] = useState(null)
    const [tk, setTk] = useState(null)
    const [loading, setLoading] = useState(false)

    const {setToken, user, setUser} = useContext(authContext)

    useEffect(() => {
        setSecurity(new SecurityService())
    }, [])

    useEffect(() => {
        if (tk) {
            setUser(jwtDecode(tk))
        }
    }, [tk])

    useEffect(() => {
        if (user) {
            setToken(tk)
        }
    }, [user])

    return (
        <LinearGradient colors={['#ffffff', '#D4E7F3']} start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                        style={{flex: 1, width: '100%'}}>
            {loading ? <View style={styles.lottieBlock}><LottieView source={require('../assets/splash.json')} autoPlay={true} loop={true} style={{ width: '70%' }} /></View> :
                <View style={styles.darken}>
                    <View style={styles.container}>
                        <View style={styles.logo}>
                            <Image source={require('../assets/logo.png')} style={styles.logoPicture}/>
                        </View>

                        <View style={styles.form}>
                            {error && <Text style={styles.redText}>{error}</Text>}
                            <View style={styles.inputsContainer}>
                                <CustomInput field={mailAddress} placeholder={"Adresse mail *"}
                                             setField={setMailAddress}
                                             secure={false}/>
                                <CustomInput field={password} placeholder={"Mot de passe *"} setField={setPassword}
                                             secure={true}/>
                            </View>

                            <TouchableOpacity onPress={async () => {
                                setLoading(true)
                                if (
                                    security.canLogin({
                                        mailAddress: mailAddress,
                                        password: password
                                    })) {
                                    const req = await security.login()
                                    if (req.status === 200) {
                                        const data = await req.json()
                                        await AsyncStorage.setItem('token', data.token)
                                        setTk(data.token)
                                    } else {
                                        setLoading(false)
                                        setError('Identifiants incorrects.')
                                    }
                                }
                                else {
                                    setLoading(false)
                                }
                            }} style={styles.btnRed}>
                                <Text style={styles.btnText}>Connexion</Text>
                            </TouchableOpacity>

                            <View style={[styles.row, styles.w100]}>
                                <Text style={styles.noAccount}>Pas encore de compte ?</Text>
                                <Pressable style={styles.registerBtn} onPress={() => {
                                    navigation.navigate('Signin')
                                }}>
                                    <Text style={[styles.registerBtnText, styles.noAccount]}>S'inscrire</Text>
                                </Pressable>
                            </View>
                        </View>

                        <View style={styles.btnContainer}>
                            <TouchableOpacity onPress={() => {
                            }} style={styles.btnBlue}>
                                <Text style={styles.btnTextBlue}><MaterialCommunityIcon name="facebook" color="#00A1E7"
                                                                                        size={22}/> Connexion avec
                                    Facebook</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            }
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
    lottieBlock: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        backgroundColor: '#00A1E7',
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
        borderColor: '#00A1E7',
        borderWidth: 1,
    },
    btnText: {
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    btnTextBlue: {
        color: '#00A1E7',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
    },
    redText: {
        color: '#E1673D'
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
        color: '#00A1E7'
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