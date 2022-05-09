import {FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import {ContestListItem} from "./ContestListItem";
import {translate} from "../service/DateService";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";

export const ContestCategoryItem = ({category}) => {
    return (
        <View>
            <View style={styles.item}>
                <View style={styles.row}>
                    <View>
                        <Text style={styles.city}>SERIE</Text>

                        <Text style={styles.startDate}>
                            Bientot
                        </Text>
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
    city: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333'
    },
    startDate: {
        color: '#29abe2',
        fontSize: 13,
        fontStyle: 'italic'
    },
    nbParticipants: {
        marginTop: 10
    }
})