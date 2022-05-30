import React, {useContext, useEffect, useRef, useState} from "react"
import {ActivityIndicator, FlatList, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View} from "react-native"
import authContext from "../context/AuthContext"
import {Avatar, Divider} from 'react-native-elements'
import RBSheet from "react-native-raw-bottom-sheet"
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon"
import {ContestListItem} from "../component/ContestListItem"
import {UserService} from "../service/UserService"
import {UserParameters} from "../component/UserParameters"
import {apiAvatar, getUserParticipations, updateUserParameters, updateUserPicture} from "../service/APIService"
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from "expo-image-manipulator"
import FlashMessage, {showMessage, hideMessage} from "react-native-flash-message"
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import CustomInput from "../component/CustomInput";
import {useNavigation} from "@react-navigation/native";

export const ProfileUpdateScreen = () => {
    const {token, user, setUser} = useContext(authContext)

    const [number, setNumber] = useState(null)
    const [points, setPoints] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    useEffect(() => {
        setNumber(
            user?.licenseNumber
        )

        setPoints(
            user?.officialPoints
        )
    }, [])

    const refreshUser = () => {
        setUser({
            'birthdate': user.birthdate,
            'exp': user.exp,
            'firstname': user.firstname,
            'iat': user.iat,
            'id': user.id,
            'lastname': user.lastname,
            'licenseNumber': number,
            'officialPoints': points,
            'picture': user.picture,
            'roles': user.roles,
            'username': user.username
        })
    }

    const escapeRegExp = (string) => {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
    }

    const replaceAll = (str, find, replace) => {
        return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    }

    const replaceAllWithCharacters = (string) => {
        return replaceAll(
            replaceAll(
                replaceAll(
                    replaceAll(string, '.', ''), ' ', ''
                ), '-', ''
            ), ',', ''
        )
    }

    const updateUser = async () => {
        setLoading(true)
        const response = await updateUserParameters(token, user?.id, number, points)
        if (response.status === 200) {

            const data = await response.json()

            refreshUser(data)
            setLoading(false)
            navigation.goBack()

            showMessage({
                message: "Informations modifiées avec succès.",
                type: "success",
            })
        } else {
            setLoading(false)
            navigation.goBack()

            showMessage({
                message: "Enregistrement impossible.",
                type: "danger",
            })
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlashMessage position="top"/>
            {loading ? <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <ActivityIndicator size={80} color={'#00A1E7'}/>
                </View> :
                <View style={styles.content}>
                    <View style={styles.block}>
                        <View style={styles.row}>
                            <FontAwesome5Icon name='id-card' size={24} color="#00A1E7" solid={false}/>
                            <Text style={styles.blockText}>Numéro de Licence</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder={'9500000'}
                            onChangeText={value => setNumber(value)}
                            defaultValue={number}
                            secureTextEntry={false}
                            keyboardType={'numeric'}
                            onBlur={async () => {
                                if (number) {
                                    await setNumber(replaceAllWithCharacters(number))
                                }
                            }}
                            maxLength={10}
                        />
                    </View>

                    <View style={styles.block}>
                        <View style={styles.row}>
                            <FontAwesome5Icon name='table-tennis' size={24} color="#00A1E7" solid={false}/>
                            <Text style={styles.blockText}>Points officiels</Text>
                        </View>
                        <TextInput
                            style={styles.input}
                            placeholder={'500'}
                            onChangeText={value => setPoints(value)}
                            defaultValue={points?.toString()}
                            secureTextEntry={false}
                            keyboardType={'numeric'}
                            onBlur={async () => {
                                if (points) {
                                    await setPoints(replaceAllWithCharacters(points))
                                }
                            }}
                            maxLength={4}
                        />
                    </View>

                    {error && <View style={styles.errorBlock}><Text style={styles.error}>{error}</Text></View>}

                    <Pressable style={styles.btn} onPress={() => {
                        if (number && points && number.length >= 4 && points.toString().length > 2) {
                            updateUser()
                        }
                        else {
                            setError('Mauvais format du numéro de licence et / ou des points officiels.')
                        }
                    }}>
                        <Text style={styles.btnText}>Enregistrer les modifications</Text>
                    </Pressable>
                </View>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        paddingHorizontal: 15,
        paddingVertical: 30
    },
    block: {
        marginVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    blockText: {
        marginLeft: 10
    },
    row: {
        flexDirection: 'row'
    },
    btn: {
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 25,
        width: '100%',
        backgroundColor: '#00A1E7',
    },
    btnText: {
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16
    },
    input: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 5,
        paddingVertical: 3,
        borderBottomWidth: 1,
        borderColor: '#00A1E7',
        color: '#00A1E7'
    },
    errorBlock: {
        marginVertical: 10
    },
    error: {
        color: '#E1673D'
    }
})