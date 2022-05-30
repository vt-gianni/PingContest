import React, {useContext, useEffect, useState} from "react"
import {StyleSheet, Text, View, Image, TouchableOpacity, Pressable, Platform} from 'react-native'
import CustomInput from "../component/CustomInput"
import {LinearGradient} from 'expo-linear-gradient'
import DateTimePicker from '@react-native-community/datetimepicker'
import {SecurityService} from "../service/SecurityService"
import AsyncStorage from "@react-native-async-storage/async-storage"
import authContext from "../context/AuthContext"
import jwtDecode from "jwt-decode";
import LottieView from "lottie-react-native";

export const SigninScreen = ({navigation}) => {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [mailAddress, setMailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [date, setDate] = useState(null)
    const [mode, setMode] = useState('date')
    const [show, setShow] = useState(false)
    const [error, setError] = useState(null)
    const [security, setSecurity] = useState(null)
    const [tk, setTk] = useState(null)
    const [loading, setLoading] = useState(false)

    const {token, setToken, user, setUser} = useContext(authContext)

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

    useEffect(() => {
        if (token) {
            navigation.navigate('Profile')
        }
    }, [token])

    const getMaxDate = () => {
        const maxDate = new Date()
        maxDate.setFullYear(maxDate.getFullYear() - 6)
        return maxDate
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date
        setShow(Platform.OS === 'ios')
        setDate(currentDate);
    }

    const showMode = (currentMode) => {
        setShow(true)
        setMode(currentMode)
    }

    const showDatepicker = () => {
        showMode('date')
    }

    const showTimepicker = () => {
        showMode('time')
    }

    return (
        <LinearGradient colors={['#ffffff', '#D4E7F3']} start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                        style={{flex: 1, width: '100%'}}>
            {loading ?
                <View style={styles.lottieBlock}><LottieView source={require('../assets/splash.json')} autoPlay={true}
                                                             loop={true} style={{width: '70%'}}/></View> :
                <View style={styles.darken}>
                    <View style={styles.container}>
                        <View style={styles.logo}>
                            <Image source={require('../assets/logo.png')} style={styles.logoPicture}/>
                        </View>

                        <View style={styles.form}>
                            {error && <Text style={styles.redText}>{error}</Text>}
                            <View style={styles.inputsContainerRow}>
                                <View style={styles.inputsRow}>
                                    <CustomInput field={firstname} placeholder={"Prénom *"}
                                                 setField={setFirstname}
                                                 secure={false}/>
                                </View>
                                <View style={styles.inputsRow}>
                                    <CustomInput field={lastname} placeholder={"Nom *"}
                                                 setField={setLastname}
                                                 secure={false}/>
                                </View>
                            </View>
                            <View style={styles.inputsContainer}>
                                <CustomInput field={mailAddress} placeholder={"Adresse mail *"}
                                             setField={setMailAddress}
                                             secure={false}/>
                                <CustomInput field={password} placeholder={"Mot de passe *"} setField={setPassword}
                                             secure={true}/>
                            </View>

                            <View
                                style={[styles.row, {
                                    alignItems: 'center',
                                    justifyContent: 'space-evenly',
                                    width: '100%'
                                }]}>
                                <Text>Date de naissance *</Text>
                                <Pressable onPress={showDatepicker} style={styles.date}>
                                    {!date ?
                                        <View style={styles.row}>
                                            <Text style={styles.placeholder}>dd</Text>
                                            <Text style={styles.placeholder}> / </Text>
                                            <Text style={styles.placeholder}>mm</Text>
                                            <Text style={styles.placeholder}> / </Text>
                                            <Text style={styles.placeholder}>yyyy</Text>
                                        </View> : <View style={styles.row}>
                                            <Text style={styles.dateFilled}>{date.getDate()}</Text>
                                            <Text style={styles.dateFilled}> / </Text>
                                            <Text
                                                style={styles.dateFilled}>{(date.getUTCMonth() + 1) < 10 ? '0' + (date.getUTCMonth() + 1) : date.getUTCMonth() + 1}</Text>
                                            <Text style={styles.dateFilled}> / </Text>
                                            <Text style={styles.dateFilled}>{date.getFullYear()}</Text>
                                        </View>
                                    }
                                </Pressable>
                            </View>

                            <TouchableOpacity onPress={async () => {
                                setLoading(true)
                                if (security !== null) {
                                    if (
                                        security.canRegister({
                                            firstname: firstname,
                                            lastname: lastname,
                                            mailAddress: mailAddress,
                                            birthdate: date.toISOString().split('T')[0],
                                            password: password
                                        })) {
                                        const req = await security.register()
                                        if (req.status === 201) {
                                            const logReq = await security.login()
                                            if (logReq.status === 200) {
                                                const res = await logReq.json()
                                                await AsyncStorage.setItem('token', res.token)
                                                setTk(res.token)
                                            }
                                        } else {
                                            setLoading(false)
                                            const data = await req.json()
                                            setError(data.error)
                                        }
                                    } else {
                                        setLoading(false)
                                        setError(security.error)
                                    }
                                }
                                else {
                                    setLoading(false)
                                }
                            }} style={styles.btnRed}>
                                <Text style={styles.btnText}>Inscription</Text>
                            </TouchableOpacity>

                            <View style={[styles.row, styles.w100]}>
                                <Text style={styles.noAccount}>Pas encore de compte ?</Text>
                                <Pressable style={styles.registerBtn} onPress={() => {
                                    navigation.navigate('Profile')
                                }}>
                                    <Text style={[styles.registerBtnText, styles.noAccount]}>Se connecter</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                    {show && (
                        <DateTimePicker
                            maximumDate={getMaxDate()}
                            testID="dateTimePicker"
                            value={date ? date : new Date()}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}
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
        flex: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputsContainer: {
        width: '100%'
    },
    inputsContainerRow: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    input: {
        marginHorizontal: 20
    },
    inputsRow: {
        width: '49%'
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
        color: '#00A1E7'
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
    },
    date: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#00A1E7',
        borderRadius: 3
    },
    placeholder: {
        color: '#9b9b9b'
    },
    dateFilled: {
        color: '#000000'
    }
})