import {useState} from "react";
import LoginScreen from "../screen/LoginScreen";
import {ProfileScreen} from "../screen/ProfileScreen";

export const ProfileTab = () => {
    const [logged, setLogged] = useState(false)

    return (
        !logged ? <LoginScreen/> : <ProfileScreen/>
    )
}