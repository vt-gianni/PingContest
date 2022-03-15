import React, {useRef, useState} from "react"
import {View, Text, SafeAreaView, FlatList, StyleSheet, Image, ScrollView, Pressable} from "react-native"
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon"
import RBSheet from "react-native-raw-bottom-sheet"
import {ContestsListFilters} from "./ContestsListFilters";

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
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d74",
        city: "Lesquin",
        startDate: "13/08/2021",
        endRegistrationDate: "31/07/2021",
        contestCategories: [1, 2, 3, 4, 5]
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d75",
        city: "Valenciennes",
        startDate: "15/08/2021",
        endRegistrationDate: "02/07/2021",
        contestCategories: [1, 2, 3]
    },
];


export const ContestsListScreen = () => {
    const refRBSheet = useRef()
    const [current, setCurrent] = useState(false)
    const [coming, setComing] = useState(true)
    const [done, setDone] = useState(false)

    const renderItem = ({item}) => {
        return (
            <View>
                <View style={styles.item}>
                    <View style={styles.row}>
                        <View style={styles.pictureBlock}>
                            <Image source={require('../assets/lmtt.png')} style={styles.picture}/>
                        </View>
                        <View>
                            <Text style={styles.city}>{item.city}</Text>
                            <Text style={styles.startDate}>{item.startDate}</Text>
                            <Text style={styles.nbParticipants}>{item.contestCategories.length} places restantes</Text>
                        </View>
                    </View>
                    <Text>
                        <MaterialCommunityIcon name="chevron-right" color="#2D6990" size={30} direction={"ltr"}/>
                    </Text>
                </View>
            </View>
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
                        <MaterialCommunityIcon name="tune" color="#2D6990" size={26} direction={"ltr"}/>
                    </Pressable>
                </View>
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={DATA}
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
        backgroundColor: 'white'
    },
    content: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        paddingTop: 40
    },
    item: {
        marginBottom: 10,
        padding: 15,
        marginHorizontal: 20,
        flexDirection: 'row',
        backgroundColor: 'rgba(45, 105, 144, 0.1)',
        borderRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    city: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#2D6990'
    },
    startDate: {
        fontSize: 13,
        color: '#333'
    },
    nbParticipants: {
        fontSize: 13,
        fontStyle: 'italic'
    },
    pictureBlock: {
        marginRight: 20,
        borderWidth: 2,
        borderRadius: 50,
        borderColor: '#2D6990'
    },
    picture: {
        width: 60,
        height: 60,
        borderRadius: 50
    },
    filter: {
        borderWidth: 1,
        borderColor: '#2D6990',
        padding: 8,
        paddingHorizontal: 15,
        borderRadius: 50,
        marginRight: 10
    },
    activeFilter: {
        backgroundColor: '#2D6990',
        padding: 8,
        paddingHorizontal: 15,
        borderRadius: 50,
        marginRight: 10
    },
    filterText: {
        color: '#2D6990',
        fontWeight: 'bold'
    },
    activeFilterText: {
        color: '#ffffff',
        fontWeight: 'bold'
    },
    row: {
        flexDirection: 'row'
    }
})

