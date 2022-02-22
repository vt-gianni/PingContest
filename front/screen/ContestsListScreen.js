import React, {useEffect, useState} from "react"
import {View, Text, SafeAreaView, FlatList, StyleSheet, Image, ScrollView} from "react-native"
import {Top} from "../component/Top";

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
    const renderItem = ({item}) => {
        return (
            <View style={styles.item}>
                <View style={styles.pictureBlock}>
                    <Image source={require('../assets/lmtt.png')} style={styles.picture}/>
                </View>
                <View>
                    <Text style={styles.city}>{item.city}</Text>
                    <Text>Le {item.startDate}</Text>
                    <Text style={styles.nbParticipants}>{item.contestCategories.length} participants</Text>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <Top/>
            <View style={styles.content}>
                <ScrollView horizontal={true} style={{ marginBottom: 15 }}>
                    <View style={styles.activeFilter}>
                        <Text style={styles.activeFilterText}>A venir</Text>
                    </View>

                    <View style={styles.filter}>
                        <Text style={styles.filterText}>Terminés</Text>
                    </View>
                </ScrollView>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    style={{ marginBottom: 100 }}
                />
            </View>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 30
    },
    item: {
        backgroundColor: 'white',
        marginVertical: 15,
        padding: 15,
        borderRadius: 5,
        flexDirection: 'row'
    },
    city: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#2D6990'
    },
    nbParticipants: {
        fontSize: 13,
        marginTop: 15,
        fontStyle: 'italic'
    },
    pictureBlock: {
        marginRight: 10
    },
    picture: {
        width: 80,
        height: 80
    },
    filter: {
        borderWidth: 1,
        borderColor: '#2D6990',
        padding: 8,
        paddingHorizontal: 10,
        borderRadius: 50,
        marginRight: 10
    },
    activeFilter: {
        backgroundColor: '#2D6990',
        padding: 8,
        paddingHorizontal: 10,
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
    }
})

