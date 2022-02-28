import {useState} from "react";
import LoginScreen from "../screen/LoginScreen";
import {ProfileScreen} from "../screen/ProfileScreen";

export const ProfileTab = ({navigation}) => {
    const [logged, setLogged] = useState(false)

    return (
        !logged ? <LoginScreen navigation={navigation}/> : <ProfileScreen/>
    )
}