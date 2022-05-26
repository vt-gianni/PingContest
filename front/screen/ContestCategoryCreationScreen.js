import {Platform, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native"
import React, {useContext, useEffect, useState} from "react"
import contestCreationContext from "../context/ContestCreationContext";

export const ContestCategoryCreationScreen = () => {
    const {
        address, setAddress,
        city, setCity,
        hallName, setHallName,
        date, setDate,
        endDate, setEndDate,
        endRegistrationDate, setEndRegistrationDate
    } = useContext(contestCreationContext)

    return (
        <View>
            <Text>{address}</Text>
        </View>
    )
}