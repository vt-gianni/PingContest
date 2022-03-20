import React, {useContext, useEffect, useRef, useState} from "react"
import {View, Text, SafeAreaView, FlatList, StyleSheet, Image, ScrollView, Pressable} from "react-native"
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon"
import RBSheet from "react-native-raw-bottom-sheet"
import {ContestsListFilters} from "./ContestsListFilters";
import {ContestListItem} from "../component/ContestListItem";
import AuthContext from "../context/AuthContext";
import {getContests} from "../service/APIService";

export const ContestsListScreen = () => {
    const refRBSheet = useRef()
    const [current, setCurrent] = useState(false)
    const [coming, setComing] = useState(true)
    const [done, setDone] = useState(false)
    const [contests, setContests] = useState()

    const {token} = useContext(AuthContext)

    useEffect(() => {
        saveContests()
    }, [])

    const saveContests = async () => {
        const request = await getContests(token)
        if (request.status === 200) {
            const response = await request.json()
            setContests(response['hydra:member'])
        }
        else {
            console.lo
        }
    }

    const renderItem = ({item}) => {
        return (
            <ContestListItem item={item}/>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15}}>
                    <View style={{flexDirection: 'row'}}>
                        <Pressable style={current ? styles.activeFilter : styles.filter} onPress={() => {
                            setCurrent(true)
                            setComing(false)
                            setDone(false)
                        }}>
                            <Text style={current ? styles.activeFilterText : styles.filterText}>En cours</Text>
                        </Pressable>

                        <Pressable style={coming ? styles.activeFilter : styles.filter} onPress={() => {
                            setComing(true)
                            setDone(false)
                            setCurrent(false)
                        }}>
                            <Text style={coming ? styles.activeFilterText : styles.filterText}>A venir</Text>
                        </Pressable>

                        <Pressable style={done ? styles.activeFilter : styles.filter} onPress={() => {
                            setDone(true)
                            setComing(false)
                            setCurrent(false)
                        }}>
                            <Text style={done ? styles.activeFilterText : styles.filterText}>Terminés</Text>
                        </Pressable>
                    </View>
                    <Pressable onPress={() => refRBSheet.current.open()}>
                        <MaterialCommunityIcon name="tune" color="#00A1E7" size={26} direction={"ltr"}/>
                    </Pressable>
                </View>
            </View>
            <FlatList
                style={{ marginHorizontal: 20 }}
                showsVerticalScrollIndicator={false}
                data={contests}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
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
                <ContestsListFilters />
            </RBSheet>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        paddingBottom: 10,
        paddingTop: 40,
        marginHorizontal: 20
    },
    filter: {
        borderWidth: 1,
        borderColor: '#00A1E7',
        padding: 8,
        paddingHorizontal: 15,
        borderRadius: 50,
        marginRight: 10
    },
    activeFilter: {
        backgroundColor: '#00A1E7',
        padding: 8,
        paddingHorizontal: 15,
        borderRadius: 50,
        marginRight: 10
    },
    filterText: {
        color: '#00A1E7',
        fontWeight: 'bold'
    },
    activeFilterText: {
        color: '#ffffff',
        fontWeight: 'bold'
    }
})

