import {createNativeStackNavigator} from "@react-navigation/native-stack"
import {ContestScreen} from "../screen/ContestScreen";
import {ContestsListScreen} from "../screen/ContestsListScreen";
import {ContestCategoriesListScreen} from "../screen/ContestCategoriesListScreen";
import {ContestCreationScreen} from "../screen/ContestCreationScreen";
import {ContestCategoryCreationScreen} from "../screen/ContestCategoryCreationScreen";
import {useState} from "react";
import ContestCreationContext from "../context/ContestCreationContext";
import {ContestCreationValidationScreen} from "../screen/ContestCreationValidationScreen";
import {SigninScreen} from "../screen/SigninScreen";
import {ClubScreen} from "../screen/ClubScreen";

const Stack = createNativeStackNavigator()

export const ContestStack = () => {
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [hallName, setHallName] = useState('')

    const [date, setDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [endRegistrationDate, setEndRegistrationDate] = useState(null)

    const [categories, setCategories] = useState([])

    const contestContextValue = {
        address, setAddress,
        city, setCity,
        hallName, setHallName,
        date, setDate,
        endDate, setEndDate,
        endRegistrationDate, setEndRegistrationDate,
        categories, setCategories
    }

    return (
        <ContestCreationContext.Provider value={contestContextValue}>
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
                        title: 'Création de tournoi',
                        headerShadowVisible: false
                    }}
                />
                <Stack.Screen
                    name="ContestCategoryCreation"
                    component={ContestCategoryCreationScreen}
                    options={{
                        title: 'Création de séries',
                        headerShadowVisible: false
                    }}
                />
                <Stack.Screen
                    name="ContestCreationValidation"
                    component={ContestCreationValidationScreen}
                    options={{
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="Signin"
                    component={SigninScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Club"
                    component={ClubScreen}
                />
            </Stack.Navigator>
        </ContestCreationContext.Provider>
    )
}