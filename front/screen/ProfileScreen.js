import React, {useContext, useRef} from "react"
import {Pressable, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import authContext from "../context/AuthContext"
import { Avatar } from 'react-native-elements'
import RBSheet from "react-native-raw-bottom-sheet"
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon"
import {ContestsListFilters} from "./ContestsListFilters";

export const ProfileScreen = () => {
    const {setToken} = useContext(authContext)
    const refRBSheet = useRef()

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.topBarTitle}>Mon profil</Text>
                <Pressable onPress={() => refRBSheet.current.open()}>
                    <MaterialCommunityIcon name="menu" color='#333' size={26}/>
                </Pressable>
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
                <View style={styles.playerInfoRow}>
                    <View style={styles.licenseBlock}>
                        <Text style={styles.fwbold}>Numéro de Licence</Text>
                        <Text>512231545312</Text>
                    </View>
                    <View style={styles.pointsBlock}>
                        <Text style={styles.fwbold}>Points officiels</Text>
                        <Text>1005</Text>
                    </View>
                </View>

                <View>
                    <Text style={styles.title}>Tournois à venir</Text>

                    <Text style={styles.noContestText}>Vous n'avez aucun tournois à venir..</Text>
                </View>
            </View>
            <RBSheet
                ref={refRBSheet}
                closeOnDragDown={true}
                closeOnPressMask={true}
                customStyles={{
                    wrapper: {
                        backgroundColor: "rgba(0, 0, 0, 0.4)",
                    },
                    container: {
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}

            >
                <Text>Paramètres</Text>
            </RBSheet>
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
    playerInfoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 30
    },
    licenseBlock: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(45, 105, 144, 0.1)',
        padding: 10,
        borderRadius: 5
    },
    pointsBlock: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(45, 105, 144, 0.1)',
        padding: 10,
        borderRadius: 5
    },
    fwbold: {
        fontWeight: 'bold'
    },
    title: {
        marginTop: 20,
        textAlign: 'center',
        fontSize: 22,
        marginBottom: 30
    },
    noContestText: {
        fontStyle: 'italic'
    }
})