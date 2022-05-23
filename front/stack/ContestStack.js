import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {ContestScreen} from "../screen/ContestScreen";
import {ContestsListScreen} from "../screen/ContestsListScreen";
import {ContestCategoriesListScreen} from "../screen/ContestCategoriesListScreen";
import {ContestCreationScreen} from "../screen/ContestCreationScreen";

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
            <Stack.Screen
                name="ContestCategoriesList"
                component={ContestCategoriesListScreen}
            />
            <Stack.Screen
                name="ContestCreation"
                component={ContestCreationScreen}
                options={{
                    title: 'Création de tournoi'
                }}
            />
        </Stack.Navigator>
    )
}