import React, {useEffect, useState} from "react"
import {BeforeStack} from "./stack/BeforeStack"
import AuthContext from "./context/AuthContext"
import AsyncStorage from '@react-native-async-storage/async-storage'
import jwtDecode from "jwt-decode";

export default function App() {
    const [token, setToken] = useState(null)
    const [user, setUser] = useState(null)

    const authContextValue = {
        token,
        setToken,
        user,
        setUser
    }

    useEffect(() => {
        checkForStorageToken().then(async (token) => {
            if (token) {
                await setUserData(token)
                setToken(token)
            }
        })
    }, [])

    const setUserData = (token) => {
        setUser(jwtDecode(token))
    }

    const checkForStorageToken = async () => {
        return await AsyncStorage.getItem('token')
    }

    return (
        <AuthContext.Provider value={authContextValue}>
            <BeforeStack/>
        </AuthContext.Provider>
    )
}

