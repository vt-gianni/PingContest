import {FlatList, Image, Pressable, SafeAreaView, StyleSheet, Text, View} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import {ContestListItem} from "../component/ContestListItem";
import {ContestCategoryItem} from "../component/ContestCategoryItem";
import authContext from "../context/AuthContext";
import FlashMessage from "react-native-flash-message";

export const ClubScreen = ({route, navigation}) => {

    const {club} = route.params

    useEffect(() => {
        navigation.setOptions({title: club?.name})
    })

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.coverImageBlock}>
                <Image
                    source={{uri: 'https://cdn0.tnwcdn.com/wp-content/blogs.dir/1/files/2014/01/table-tennis.jpg'}}
                    style={styles.coverImage}
                />
            </View>
            <View style={styles.content}>
                <Text style={styles.title}>
                    Club de {club?.city} - {club?.name}
                </Text>

                <View style={styles.where}>
                    <Text>
                        <FontAwesome5Icon name='map-marker-alt' size={18} color='#00A1E7'
                                          solid={false}/> {club?.address}
                    </Text>
                    <Text>
                        <FontAwesome5Icon name='id-card' size={14} color='#00A1E7' solid={true}/> {club?.spid}
                    </Text>
                </View>

                <Text style={styles.subtitle}>
                    Contact
                </Text>

                <Text>
                    <FontAwesome5Icon name='user' size={14} color='#00A1E7' solid={true}/> {club?.contactFirstname} {club?.contactLastname}
                </Text>
                {club?.mailAddress && <Text>{club.mailAddress}</Text>}
                {club?.contactPhone &&
                    <Text>
                        <FontAwesome5Icon name='phone' size={14} color='#00A1E7' solid={true}/> {club.contactPhone}
                    </Text>
                }
                {club?.contactMailAddress &&
                    <Text>
                        <FontAwesome5Icon name='at' size={14} color='#00A1E7' solid={true}/> {club?.contactMailAddress}
                    </Text>
                }
                {club?.website &&
                    <Text>
                        <FontAwesome5Icon name='link' size={14} color='#00A1E7' solid={true}/> {club?.website}
                    </Text>
                }
            </View>
            <FlashMessage position="top"/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    coverImageBlock: {
        flex: 1
    },
    coverImage: {
        flex: 1
    },
    content: {
        flex: 2,
        padding: 20,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    subtitle: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10
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
    info: {
        fontSize: 12,
        fontStyle: 'italic',
        marginTop: 20
    }
})