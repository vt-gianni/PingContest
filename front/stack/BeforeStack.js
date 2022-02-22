import {NavigationContainer} from "@react-navigation/native"
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {IndexScreen} from "../screen/IndexScreen"
import {StatusBar} from "expo-status-bar"
import {MainStack} from "./MainStack"

const Stack = createNativeStackNavigator()

export const BeforeStack = () => {
    return (
        <NavigationContainer >
            <StatusBar hidden />
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen
                    name="Index"
                    component={IndexScreen}
                />
                <Stack.Screen
                    name="Main"
                    component={MainStack}
                    options={{animation: "slide_from_right"}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}