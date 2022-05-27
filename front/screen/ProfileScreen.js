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

export const ProfileScreen = () => {
    const {token, setToken, user, setUser} = useContext(authContext)
    const refRBSheet = useRef()
    const [userService, setUserService] = useState(null)
    const [ageCategory, setAgeCategory] = useState(null)
    const [contests, setContests] = useState([])
    const [loading, setLoading] = useState(true)
    const [image, setImage] = useState(null)
    const [avatarLoading, setAvatarLoading] = useState(false)
    const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions()

    useEffect(() => {
        setUserService(new UserService())
        saveContests().then(() => {
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if (userService && user) {
            if (user.birthdate.date) {
                setAgeCategory(
                    userService.getCategory(user?.birthdate.date)
                )
            }
            else {
                setAgeCategory(
                    userService.getCategory(user?.birthdate)
                )
            }
        }
    }, [userService, user])

    useEffect(() => {
        if (image) {
            setAvatarLoading(true)
            updateUserPicture(token, image['base64']).then((request) => {
                if (request.status) {
                    request.json().then(data => {
                        showMessage({
                            message: "Avatar modifié avec succès.",
                            type: "success",
                        })
                        setUser(data)
                        setAvatarLoading(false)
                    })
                }
                else {
                    showMessage({
                        message: "Echec lors de l'importation de l'image.",
                        type: "danger",
                        icon: "success"
                    })
                    setAvatarLoading(false)
                }
            })
        }
    }, [image])

    const compressAndConvert = async (uri) => {
        return await ImageManipulator.manipulateAsync(
            uri,
            [
                {
                    resize: {
                        width: 800
                    }
                }
            ],
            {
                format: ImageManipulator.SaveFormat.JPEG,
                compress: 1,
                base64: true
            }
        );
    }

    const pickImage = async () => {
        await requestPermission()

        if (status.granted) {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.cancelled) {
                const image64 = await compressAndConvert(result.uri)
                setImage(image64)
            }
        }
    }

    const saveContests = async () => {
        const request = await getUserParticipations(token, 1)
        if (request.status === 200) {
            const response = await request.json()
            setContests(response['hydra:member'])
        }
    }

    const renderItem = ({item}) => {
        return (
            <ContestListItem item={item}/>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <Pressable onPress={() => refRBSheet.current.open()}>
                    <MaterialCommunityIcon name="menu" color='#333' size={26}/>
                </Pressable>
            </View>
            <View style={styles.content}>
                <View style={styles.avatarBlock}>

                    { !avatarLoading ?

                    <Pressable onPress={pickImage}>
                        {user?.picture ?
                            <Avatar
                                size={90}
                                rounded
                                source={{ uri: apiAvatar + '/' + user?.picture }}
                                containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', color: '#fff', marginRight: 20 }}
                            /> :
                            <Avatar
                                size={90}
                                rounded
                                icon={{ name: 'camera', type: 'font-awesome', color: '#00A1E7' }}
                                containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', color: '#fff', marginRight: 20 }}
                                title={user?.firstname.charAt(0) + user?.lastname.charAt(0)}
                            />
                        }
                    </Pressable> : <View style={styles.avatarIndicatorBlock}><ActivityIndicator size={40} color={'#00A1E7'}/></View> }
                    <View>
                        <Text style={styles.username}>{user?.firstname} {user?.lastname}</Text>
                        <Text style={styles.category}>Catégorie {ageCategory ? ageCategory : ''}</Text>
                    </View>
                </View>

                <View style={styles.playerInfoRow}>
                    <View style={styles.licenseBlock}>
                        <Text style={[styles.bigText, styles.fwbold]}>N° Licence</Text>
                        <Text>{user?.licenseNumber ? user.licenseNumber : 'Non renseigné'}</Text>
                    </View>
                    <View style={styles.pointsBlock}>
                        <Text style={[styles.bigText, styles.fwbold]}>Points officiels</Text>
                        <Text>{user?.officialPoints ? user?.officialPoints + ' Pts' : 'Non renseigné'}</Text>
                    </View>
                </View>

                <Divider color={'rgba(0, 0, 0, 0.1)'} width={2}/>

                <View style={{flex: 1}}>

                    {loading ? <ActivityIndicator style={{ marginTop: 30 }} size={50} color={'#00A1E7'}/> :

                        <View>
                            {contests.length > 0 ?
                            <FlatList
                            showsVerticalScrollIndicator={false}
                            data={contests}
                            renderItem={renderItem}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={{
                                flexGrow: 1,
                            }}
                        /> : <Text style={styles.noContestText}>Vous n'avez aucun tournois à venir..</Text> }
                        </View> }
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
                <UserParameters setToken={setToken} user={user} setUser={setUser} />
            </RBSheet>
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