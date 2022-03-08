import React, {useEffect, useState} from "react"
import {BeforeStack} from "./stack/BeforeStack"
import AuthContext from "./context/AuthContext"
import AsyncStorage from '@react-native-async-storage/async-storage'

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
        checkForStorageToken().then((token) => {
            token && setToken(token)
        })
    }, [])

    const checkForStorageToken = async () => {
        return await AsyncStorage.getItem('token')
    }

    return (
        <AuthContext.Provider value={authContextValue}>
            <BeforeStack/>
        </AuthContext.Provider>
    )
}

