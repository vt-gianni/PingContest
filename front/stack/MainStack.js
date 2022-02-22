import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {ContestsListScreen} from "../screen/ContestsListScreen";
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon";
import {AccountStack} from "./AccountStack";

const Tab = createBottomTabNavigator()

export const MainStack = () => {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarInactiveBackgroundColor: '#2D6990',
            tabBarActiveBackgroundColor: '#2D6990',
            tabBarActiveTintColor: 'rgba(255, 255, 255, 1)',
            tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.5)'
        }}
        >
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
                component={AccountStack}
                options={{
                    tabBarIcon: ({color}) => (
                        <MaterialCommunityIcon name="account" color={color} size={26}/>
                    )
                }}
            />
        </Tab.Navigator>
    )
}