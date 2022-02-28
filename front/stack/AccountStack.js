import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {ProfileTab} from "../tab/ProfileTab";
import {SigninScreen} from "../screen/SigninScreen";

const Stack = createNativeStackNavigator()

export const AccountStack = () => {
    return (
        <Stack.Navigator  screenOptions={{headerShown: false}}>
            <Stack.Screen
                name="Profile"
                component={ProfileTab}
            />
            <Stack.Screen
                name="Signin"
                component={SigninScreen}
            />
        </Stack.Navigator>
    )
}