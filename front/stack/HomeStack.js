import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {HomeScreen} from "../screen/HomeScreen"
import React from 'react'

const Stack = createNativeStackNavigator()

export const HomeStack = () => {
    return (
        <Stack.Navigator  screenOptions={{headerShown: false}}>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
            />
        </Stack.Navigator>
    )
}