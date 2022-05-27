import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {ProfileTab} from "../tab/ProfileTab";
import {SigninScreen} from "../screen/SigninScreen";
import {ProfileUpdateScreen} from "../screen/ProfileUpdateScreen";

const Stack = createNativeStackNavigator()

export const AccountStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Profile"
                component={ProfileTab}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Signin"
                component={SigninScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="ProfileUpdate"
                component={ProfileUpdateScreen}
                options={{ title: 'Paramètres' }}
            />
        </Stack.Navigator>
    )
}