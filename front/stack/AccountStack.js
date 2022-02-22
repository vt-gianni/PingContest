import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {ProfileTab} from "../tab/ProfileTab";

const Stack = createNativeStackNavigator()

export const AccountStack = () => {
    return (
        <Stack.Navigator  screenOptions={{headerShown: false}}>
            <Stack.Screen
                name="Profile"
                component={ProfileTab}
            />
        </Stack.Navigator>
    )
}