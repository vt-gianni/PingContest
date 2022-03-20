import {AsyncStorage, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useEffect} from "react";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

export const UserParameters = ({setToken, user, setUser}) => {
    useEffect(() => {
        if (!user) {
            setToken(null)
        }
    }, [user])

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={ () => {}}>
                <Text style={styles.text}>
                    <FontAwesome5Icon name='user-circle' size={18} color='#333' solid={false}/> Modifier mes informations
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ async () => {
                await AsyncStorage.removeItem('token')
                setUser(null)
            }} style={styles.btnRed}>
                <Text style={[styles.btnText, styles.text]}><FontAwesome5Icon name='sign-out-alt' size={18} color='#E1673D' solid={false}/> Déconnexion</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        padding: 15,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginBottom: 30
    },
    btnRed: {
        borderRadius: 5,
        marginBottom: 30,
        width: '100%',
    },
    btnText: {
        color: '#E1673D',
    },
    text: {
        fontSize: 16,
        marginBottom: 20,
    }
})