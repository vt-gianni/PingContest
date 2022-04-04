import React, {useContext, useEffect, useRef, useState} from "react"
import {FlatList, Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native"
import authContext from "../context/AuthContext"
import {Avatar, Divider} from 'react-native-elements'
import RBSheet from "react-native-raw-bottom-sheet"
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon"
import {ContestListItem} from "../component/ContestListItem"
import {UserService} from "../service/UserService"
import {UserParameters} from "../component/UserParameters"

const DATA = [
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        city: "Wattignies",
        startDate: "18/07/2021",
        endRegistrationDate: "12/07/2021",
        contestCategories: [1, 2, 3, 4, 5, 6]
    },
    {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        city: "Tourcoing",
        startDate: "25/07/2021",
        endRegistrationDate: "19/07/2021",
        contestCategories: [1, 2, 3, 4]
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        city: "Haubourdin",
        startDate: "03/08/2021",
        endRegistrationDate: "21/07/2021",
        contestCategories: [1, 2, 3, 4, 5]
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d71",
        city: "La Madeleine",
        startDate: "08/08/2021",
        endRegistrationDate: "26/07/2021",
        contestCategories: [1, 2]
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d73",
        city: "Lille",
        startDate: "11/08/2021",
        endRegistrationDate: "29/07/2021",
        contestCategories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
    }
]

export const ProfileScreen = () => {
    const {token, setToken, user, setUser} = useContext(authContext)
    const refRBSheet = useRef()
    const [userService, setUserService] = useState(null)
    const [ageCategory, setAgeCategory] = useState(null)

    useEffect(() => {
        setUserService(new UserService())
    }, [])

    useEffect(() => {
        if (userService && user) {
            setAgeCategory(
                userService.getCategory(user?.birthdate.date)
            )
        }
    }, [userService, user])

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
                    {user?.avatar ?
                        <Avatar
                            size={90}
                            rounded
                            containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', color: '#fff', marginRight: 20 }}
                            title={''}
                        /> :
                        <Avatar
                            size={90}
                            rounded
                            icon={{ name: 'camera', type: 'font-awesome', color: '#00A1E7' }}
                            containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', color: '#fff', marginRight: 20 }}
                            title={user?.firstname.charAt(0) + user?.lastname.charAt(0)}
                        />
                    }
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

                    {/*<Text style={styles.noContestText}>Vous n'avez aucun tournois à venir..</Text>*/}

                    {/*<FlatList
                        showsVerticalScrollIndicator={false}
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{
                            flexGrow: 1,
                        }}
                    />*/}
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
        fontStyle: 'italic'
    },
    bigText: {
        fontSize: 18
    }
})