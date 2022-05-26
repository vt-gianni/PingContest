import React from "react";
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';

const CustomInput = ({placeholder, field, setField, secure, onBlur}) => {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                onChangeText={value => setField(value)}
                defaultValue={field}
                secureTextEntry={secure}
                onBlur={onBlur}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        marginTop: 10,
        flexGrow: 1
    },
    input: {
        backgroundColor: '#ffffff',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#00A1E7',
        borderRadius: 3
    }
})

export default CustomInput