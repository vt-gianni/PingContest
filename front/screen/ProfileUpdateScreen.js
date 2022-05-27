import React, {useContext, useEffect, useRef, useState} from "react"
import {ActivityIndicator, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native"
import authContext from "../context/AuthContext"
import {Avatar, Divider} from 'react-native-elements'
import RBSheet from "react-native-raw-bottom-sheet"
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon"
import {ContestListItem} from "../component/ContestListItem"
import {UserService} from "../service/UserService"
import {UserParameters} from "../component/UserParameters"
import {apiAvatar, getUserParticipations, updateUserPicture} from "../service/APIService"
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from "expo-image-manipulator"
import FlashMessage, { showMessage, hideMessage } from "react-native-flash-message"

export const ProfileUpdateScreen = () => {
    const {token, user, setUser} = useContext(authContext)

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text>Hello</Text>
            </View>
            <FlashMessage position="top" />
        </SafeAreaView>
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
        justifyContent: 'flex-end',
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
    avatarIndicatorBlock: {
        width: 90,
        height: 90,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20
    },
    username: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold'
    },
    category: {
        fontSize: 16,
        color: 'rgba(0, 0, 0, 0.4)',
        textAlign: 'center'
    },
    playerInfoRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 20,
        paddingVertical: 10
    },
    licenseBlock: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        borderColor: 'rgba(0, 0, 0, 0.3)',
        marginRight: 10
    },
    pointsBlock: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        marginLeft: 10
    },
    fwbold: {
        fontWeight: 'bold'
    },
    title: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 22,
        marginBottom: 10
    },
    noContestText: {
        fontStyle: 'italic',
        marginTop: 30,
        textAlign: 'center'
    },
    bigText: {
        fontSize: 18
    }
})