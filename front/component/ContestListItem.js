import {Image, StyleSheet, Text, View} from "react-native";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";
import React from "react";

export const ContestListItem = ({item}) => {
    return (
        <View>
            <View style={styles.item}>
                <View style={styles.row}>
                    <View style={styles.pictureBlock}>
                        {item.city === 'Lille' ?
                            <Image source={require('../assets/lmtt.png')} style={styles.picture}/> :
                        <Image source={require('../assets/wattignies.jpg')} style={styles.picture}/>
                        }
                    </View>
                    <View>
                        <Text style={styles.city}>{item.city}</Text>
                        <Text style={styles.startDate}>{item.startDate}</Text>
                        <Text style={styles.nbParticipants}>{item.contestCategories.length} places restantes</Text>
                    </View>
                </View>
                <Text>
                    <MaterialCommunityIcon name="chevron-right" color="#00A1E7" size={30} direction={"ltr"}/>
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        marginBottom: 10,
        padding: 15,
        flexDirection: 'row',
        borderRadius: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.1)'
    },
    row: {
        flexDirection: 'row'
    },
    pictureBlock: {
        marginRight: 20,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: '#333'
    },
    picture: {
        width: 60,
        height: 60,
        borderRadius: 50
    },
    city: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333'
    },
    startDate: {
        fontSize: 13,
        color: '#333'
    },
    nbParticipants: {
        fontSize: 13,
        fontStyle: 'italic'
    }
})