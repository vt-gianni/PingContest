import React, {useContext, useState} from "react";
import LoginScreen from "./LoginScreen";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import authContext from "../context/AuthContext";

export const ProfileScreen = () => {
    const {setToken} = useContext(authContext)

    return (
        <View>
            <Text>Hello</Text>

            <TouchableOpacity onPress={async () => {
                await AsyncStorage.removeItem('token')
                setToken(null)
            }} style={styles.btnRed}>
                <Text style={styles.btnText}>Déconnexion</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
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