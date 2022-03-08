import React, {useContext} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import authContext from "../context/AuthContext"
import { Avatar } from 'react-native-elements'
import {Top} from "../component/Top";

export const ProfileScreen = () => {
    const {setToken} = useContext(authContext)

    return (
        <View style={{flex: 1}}>
            <Top/>
            <View style={styles.container}>
                <View style={styles.avatarBlock}>
                    <Avatar
                        size={100}
                        rounded
                        icon={{ name: 'camera', type: 'font-awesome' }}
                        containerStyle={{ backgroundColor: '#2D6990', alignSelf: 'center' }}
                    />
                </View>

                <TouchableOpacity onPress={async () => {
                    await AsyncStorage.removeItem('token')
                    setToken(null)
                }} style={styles.btnRed}>
                    <Text style={styles.btnText}>Déconnexion</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        width: '100%',
        padding: 20
    },
    avatarBlock: {
        width: '100%',
        display: 'flex',
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
    btnText: {
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
})