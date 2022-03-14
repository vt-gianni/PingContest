import React, {useContext} from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import authContext from "../context/AuthContext"
import { Avatar } from 'react-native-elements'
import {Top} from "../component/Top";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";

export const ProfileScreen = () => {
    const {setToken} = useContext(authContext)

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.topBarTitle}>Mon profil</Text>
                <MaterialCommunityIcon name="menu" color='#333' size={26}/>
            </View>
            <View style={styles.content}>
                <View style={styles.avatarBlock}>
                    <Avatar
                        size={90}
                        rounded
                        icon={{ name: 'camera', type: 'font-awesome', color: '#2D6990' }}
                        containerStyle={{ backgroundColor: '#fff', marginRight: 20 }}
                        source={require('../assets/profile.jpg')}
                    />
                    <View>
                        <Text style={styles.username}>Gianni GIUDICE</Text>
                        <Text style={styles.category}>Catégorie Séniors</Text>
                    </View>
                </View>

                {/*<TouchableOpacity onPress={async () => {
                    await AsyncStorage.removeItem('token')
                    setToken(null)
                }} style={styles.btnRed}>
                    <Text style={styles.btnText}>Déconnexion</Text>
                </TouchableOpacity>*/}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    topBar: {
        marginVertical: 10,
        paddingHorizontal: 20,
        paddingVertical: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    topBarTitle: {
        fontSize: 16
    },
    content: {
        flex: 1,
        flexDirection: "column",
        width: '100%',
        paddingHorizontal: 20,
        paddingBottom: 10
    },
    avatarBlock: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
    },
    username: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 22
    },
    category: {
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.4)',
        textAlign: 'center'
    },
    btnRed: {
        backgroundColor: '#E1673D',
        borderRadius: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 10,
        width: '100%',
        marginTop: 30
    },
    btnText: {
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center'
    },
})