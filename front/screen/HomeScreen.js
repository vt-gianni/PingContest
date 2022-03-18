import {SafeAreaView, StyleSheet, Text, View} from "react-native";
import {Top} from "../component/Top";
import React from "react";

export const HomeScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text>Hello world!</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 20,
        paddingVertical: 10
    }
})