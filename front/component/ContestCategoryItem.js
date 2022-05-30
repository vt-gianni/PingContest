import {FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import {ContestListItem} from "./ContestListItem";
import {translate} from "../service/DateService";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";
import {getDateFormat, getUserCategoryParticipation, participate} from "../service/APIService";
import FlashMessage, {showMessage} from "react-native-flash-message";

export const ContestCategoryItem = ({category, token}) => {
    const [categoryName, setCategoryName] = useState('')
    const [startDate, setStartDate] = useState(null)
    const [solid, setSolid] = useState(false)

    useEffect(() => {
        changeCategoryName()
        setStartDate(category.startDate.split('T')[0].split('-'))
        getCurrentParticipation()
    }, [])

    const getCurrentParticipation = async () => {
        const response = await getUserCategoryParticipation(token, category.id)

        const data = await response.json()
        if (response.status === 200) {
            setSolid(data.participation)
        }
    }

    const changeCategoryName = () => {
        if (category.open) {
            setCategoryName('Open')
        }
        if (category.disability) {
            setCategoryName('Handicap')
        }
        if (category.onlyWomen) {
            setCategoryName('Femmes')
        }
        if (category.maxAge) {
            setCategoryName('Moins de ' + category.maxAge + ' ans')
        }
        if (category.minPoints) {
            setCategoryName('Plus de ' + category.minPoints)
        }
    }

    const createParticipation = async () => {
        if (!solid) {
            const response = await participate(token, category.id)
            if (response.status === 201) {
                showMessage({
                    type: 'success',
                    message: 'Vous avez bien été inscrit pour cette série.'
                })
                setSolid(true)
            } else {
                const data = await response.json()
                showMessage({
                    type: 'danger',
                    message: data.error
                })
            }
        }
        else {
            showMessage({
                type: 'danger',
                message: 'Vous participez déjà à cette série'
            })
        }
    }

    return (
        <View>
            <View style={styles.item}>
                <View style={styles.row}>
                    <View>
                        <Text style={styles.city}>{categoryName}</Text>
                        {startDate &&
                            <Text style={styles.startDate}>
                                Le {startDate[2]}/{startDate[1]}/{startDate[0]}
                            </Text>
                        }
                    </View>
                </View>
                <Pressable onPress={() => {
                    createParticipation()
                }}>
                    <FontAwesome5Icon name='star' size={18} color='#00A1E7' solid={solid}/>
                </Pressable>
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
        color: '#00A1E7',
        fontSize: 13,
        fontStyle: 'italic'
    },
    nbParticipants: {
        marginTop: 10
    }
})