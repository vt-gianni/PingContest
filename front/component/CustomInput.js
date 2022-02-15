import React from "react";
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';

const CustomInput = ({placeholder, field, setField, secure}) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                onChangeText={value => setField(value)}
                defaultValue={field}
                secureTextEntry={secure}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        marginTop: 10,
    },
    input: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 15,
        paddingVertical: 10
    }
})

export default CustomInput