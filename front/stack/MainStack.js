import HomeScreen from "../screen/HomeScreen"
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs'
import {ContestsListScreen} from "../screen/ContestsListScreen";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";

const Tab = createMaterialBottomTabNavigator()

export const MainStack = () => {
    return (
        <Tab.Navigator labeled={false} barStyle={{ backgroundColor: '#2D6990' }} initialRouteName="Home">
            <Tab.Screen
                name="ContestsList"
                component={ContestsListScreen}
                options={{
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcon name="trophy-variant" color={color} size={26}/>
                    )
                }}
            />
            <Tab.Screen
                name="Home"
                component={ContestsListScreen}
                options={{
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcon name="home" color={color} size={26}/>
                    )
                }}
            />
            <Tab.Screen
                name="Account"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcon name="account" color={color} size={26}/>
                    )
                }}
            />
        </Tab.Navigator>
    )
}