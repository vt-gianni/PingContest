import {Image, Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";

export const ContestScreen = ({route, navigation}) => {

    const { contest } = route.params

    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)

    useEffect(() => {
        navigation.setOptions({ title: contest?.city })
        })

    useEffect(() => {
        setStartDate(contest.startDate.split('T')[0].split('-'))
        setEndDate(contest.endDate.split('T')[0].split('-'))
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.coverImageBlock}>
                <Image
                    source={{uri: 'https://images.teamusa.org/-/media/USA_Table_Tennis/Images/News/2020/11-20/WTT2.jpg'}}
                    style={styles.coverImage}
                />
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>
                    Tournois de { contest?.city }
                </Text>
                {startDate && endDate ?
                <View style={styles.row}>
                    <Text style={styles.date}>
                        Du
                    </Text>
                    <Text style={[styles.date, styles.blueText, styles.fwBold]}>
                        { startDate[2] }/{ startDate[1] }/{ startDate[0] }
                    </Text>
                    <Text style={styles.date}>
                        au
                    </Text>
                    <Text style={[styles.date, styles.blueText, styles.fwBold]}>
                        { endDate[2] }/{ endDate[1] }/{ endDate[0] }
                    </Text>
                </View> : <></> }

                <View style={styles.where}>
                    <Text>
                        <FontAwesome5Icon name='map-marker-alt' size={18} color='#00A1E7' solid={false}/> {contest?.address}
                    </Text>
                    <Text>
                        Salle {contest?.hallName}
                    </Text>
                </View>

                <View style={styles.choices}>
                    <Pressable style={styles.lightButton}>
                        <Text style={styles.lightButtonText}>Voir le Club</Text>
                    </Pressable>

                    <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>Voir les Séries</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    coverImageBlock: {
        flex: 2
    },
    coverImage: {
        flex: 1
    },
    content: {
        flex: 5,
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
    },
    choices: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginTop: 50
    },
    button: {
        backgroundColor: '#00A1E7',
        padding: 15,
        borderRadius: 5,
    },
    lightButton: {
        backgroundColor: 'transparent',
        borderColor: '#00A1E7',
        borderWidth: 1,
        padding: 15,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        color: '#ffffff',
        fontWeight: 'bold'
    },
    lightButtonText: {
        fontSize: 18,
        color: '#00A1E7',
        fontWeight: 'bold'
    }
})