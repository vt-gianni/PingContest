import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {IndexScreen} from "../component/IndexScreen";
import HomeScreen from "../screen/HomeScreen";
import {StatusBar} from "expo-status-bar";

const Stack = createNativeStackNavigator();

export const BeforeStack = () => {
    const horizontalAnimation = {
        options: {
            animations: {
                push: {
                    content: {
                        translationX: {
                            from: require('react-native').Dimensions.get('window').width,
                            to: 0,
                            duration: 300
                        }
                    }
                }
            }
        },
        headerShown: false
    };

    return (
        <NavigationContainer>
            <StatusBar hidden />
            <Stack.Navigator screenOptions={horizontalAnimation}>
                <Stack.Screen
                    name="Index"
                    component={IndexScreen}
                />
                <Stack.Screen
                    options={{animation: "slide_from_right"}}
                    name="Home"
                    component={HomeScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}