import {FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import {ContestListItem} from "../component/ContestListItem";
import {ContestCategoryItem} from "../component/ContestCategoryItem";

export const ContestCategoriesListScreen = ({route, navigation}) => {

    const {contest} = route.params

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    useEffect(() => {
        navigation.setOptions({title: contest?.city + ' - Séries'})
    })

    useEffect(() => {
        setStartDate(contest.startDate.split('T')[0].split('-'))
        setEndDate(contest.endDate.split('T')[0].split('-'))
    }, [])

    const renderItem = ({item}) => {
        return (
            <Pressable onPress={() => {
                //navigation.navigate('Contest', {contest: item})
            }}>
                <ContestCategoryItem item={item} key={item.id} />
            </Pressable>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>
                    Tournoi de {contest?.city} - Séries
                </Text>
                {startDate && endDate ?
                    <View style={styles.row}>
                        <Text style={styles.date}>
                            Du
                        </Text>
                        <Text style={[styles.date, styles.blueText, styles.fwBold]}>
                            {startDate[2]}/{startDate[1]}/{startDate[0]}
                        </Text>
                        <Text style={styles.date}>
                            au
                        </Text>
                        <Text style={[styles.date, styles.blueText, styles.fwBold]}>
                            {endDate[2]}/{endDate[1]}/{endDate[0]}
                        </Text>
                    </View> : <></>}

                <View style={styles.where}>
                    <Text>
                        <FontAwesome5Icon name='map-marker-alt' size={18} color='#00A1E7'
                                          solid={false}/> {contest?.address}
                    </Text>
                    <Text>
                        Salle {contest?.hallName}
                    </Text>
                </View>

                <FlatList
                    style={{marginHorizontal: 20, marginVertical: 20}}
                    showsVerticalScrollIndicator={false}
                    data={contest?.contestCategories}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
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
        flex: 1,
        padding: 20,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    row: {
        flexDirection: 'row'
    },
    date: {
        fontSize: 13,
        fontStyle: 'italic'
    },
    blueText: {
        color: '#00A1E7',
        marginHorizontal: 5
    },
    fwBold: {
        fontWeight: 'bold'
    },
    where: {
        marginVertical: 15
    }
})