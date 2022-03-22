import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {ContestsListScreen} from "../screen/ContestsListScreen"
import MaterialCommunityIcon from "react-native-paper/src/components/MaterialCommunityIcon"
import {AccountStack} from "./AccountStack"
import {HomeStack} from "./HomeStack"
import IconBadge from 'react-native-icon-badge'
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import {ContestStack} from "./ContestStack";

const Tab = createBottomTabNavigator()

export const MainStack = () => {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarActiveTintColor: '#00A1E7',
            tabBarInactiveTintColor: 'rgba(0, 0, 0, 0.5)',
            tabBarStyle: { height: 65, paddingBottom: 0, paddingTop: 0 }
        }}
        >
            <Tab.Screen
                name="ContestsStack"
                component={ContestStack}
                options={{
                    tabBarIcon: ({color}) => (
                        <FontAwesome5Icon name='table-tennis' size={24} color={color} solid={false}/>
                    )
                }}
            />
            <Tab.Screen
                name="HomeStack"
                component={HomeStack}
                options={{
                    tabBarIcon: ({color}) => (
                        <FontAwesome5Icon name='home' size={24} color={color} solid={false}/>
                    )
                }}
            />
            <Tab.Screen

                name="Account"
                component={AccountStack}
                options={{
                    tabBarIcon: ({color}) => (
                        <FontAwesome5Icon name='user-circle' size={24} color={color} solid={false}/>
                    )
                }}
            />
        </Tab.Navigator>
    )
}