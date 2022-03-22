import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {HomeScreen} from "../screen/HomeScreen"
import {ContestScreen} from "../screen/ContestScreen";
import {ContestsListScreen} from "../screen/ContestsListScreen";

const Stack = createNativeStackNavigator()

export const ContestStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ContestList"
                component={ContestsListScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Contest"
                component={ContestScreen}
            />
        </Stack.Navigator>
    )
}